import { NextResponse } from "next/server";
import stripe from "../../../lib/stripe";

const PLAN_PRICE_IDS: Record<string, string> = {
  "Professional": "price_1Rr1rhFptxIKIuiwg6b0xlSK",     
  "Professional Plus": "price_1Rr1uCFptxIKIuiw0B29C6rO", 
};

export async function POST(req: Request) {
  const { plan } = await req.json();

  const priceId = PLAN_PRICE_IDS[plan];
  if (!priceId) {
    return NextResponse.json({ error: "Invalid plan" }, { status: 400 });
  }

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "subscription",
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/?success=true`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/?canceled=true`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}