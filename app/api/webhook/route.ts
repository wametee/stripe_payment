import { NextResponse } from "next/server";
import { buffer } from "micro";
import stripe from "../../../lib/stripe";
import supabase from "../client";

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req: Request) {
  const sig = req.headers.get("stripe-signature");
  const buf = await req.arrayBuffer();
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

  let event;

  try {
    event = stripe.webhooks.constructEvent(Buffer.from(buf), sig!, endpointSecret);
  } catch (err: any) {
    return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as any;
    const email = session.metadata?.app_email || session.customer_email;
    const subscriptionId = session.subscription;
    const customerId = session.customer;

    // Optionally, fetch subscription details from Stripe
    const subscription = await stripe.subscriptions.retrieve(subscriptionId);

    // Update Supabase profile or payments table
    await supabase.from("payments").insert([
      {
        plan: subscription.items.data[0].price.nickname,
        status: subscription.status,
        stripe_customer_id: customerId,
        stripe_subscription_id: subscriptionId,
        email,
        current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
      },
    ]);
  }

  return NextResponse.json({ received: true });
}