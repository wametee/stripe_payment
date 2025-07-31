import { NextResponse } from "next/server";
import stripe from "../../../lib/stripe";
import supabase from "../client";

export async function POST(req: Request) {
  const { stripe_subscription_id } = await req.json();

  if (!stripe_subscription_id) {
    return NextResponse.json({ error: "Missing subscription ID" }, { status: 400 });
  }

  try {
    await stripe.subscriptions.del(stripe_subscription_id);

    // Update Supabase payments table
    await supabase
      .from("payments")
      .update({ status: "canceled" })
      .eq("stripe_subscription_id", stripe_subscription_id);

    return NextResponse.json({ message: "Subscription canceled" });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}