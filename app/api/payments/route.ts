// import { NextRequest, NextResponse } from "next/server";
// import Stripe from "stripe";
// import {
//     handleCheckoutSessionCompleted,
//     handleSubscriptionDeleted,
// } from "@/lib/payments";

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

// export const POST = async (req: NextRequest) => {
//     const payload = await req.text();
//     const sig = req.headers.get("stripe-signature");
//     let event: Stripe.Event;
//     const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

//     try {
//         event = stripe.webhooks.constructEvent(payload, sig!, endpointSecret);

//         switch (event.type) {
//             case "checkout.session.completed":
//                 console.log("Payment successful");
//                 const sessionId = event.data.object.id as string;
//                 const session = await stripe.checkout.sessions.retrieve(sessionId, {
//                     expand: ["line_items"],
//                 });
//                 await handleCheckoutSessionCompleted({ session, stripe });
//                 break;

//             case "customer.subscription.deleted":
//                 const subscription = event.data.object as Stripe.Subscription;
//                 console.log("Subscription deleted", subscription);
//                 const subscriptionId = event.data.object.id as string;
//                 await handleSubscriptionDeleted({
//                     subscriptionId,
//                     stripe,
//                 });
//                 console.log("Subscription deleted successfully");
//                 break;

//             default:
//                 console.log(`Unhandled event type: ${event.type}`);
//                 break;
//         }
//     } catch (error) {
//         console.error("Webhook error", error);
//         return NextResponse.json({ error: "Webhook error" }, { status: 400 });
//     }

//     return NextResponse.json({ status: "success" });
// };

import { type NextRequest, NextResponse } from "next/server"
import Stripe from "stripe"
import { handleCheckoutSessionCompleted, handleSubscriptionDeleted } from "@/lib/payments"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

export const POST = async (req: NextRequest) => {
  const payload = await req.text()
  const sig = req.headers.get("stripe-signature")
  let event: Stripe.Event
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!

  try {
    event = stripe.webhooks.constructEvent(payload, sig!, endpointSecret)
    console.log(`Received webhook event: ${event.type}`)

    switch (event.type) {
      case "checkout.session.completed":
        console.log("Processing checkout session completed")
        const sessionId = event.data.object.id as string
        const session = await stripe.checkout.sessions.retrieve(sessionId, {
          expand: ["line_items"],
        })

        await handleCheckoutSessionCompleted({ session, stripe })
        console.log("Checkout session processed successfully")
        break

      case "customer.subscription.deleted":
        const subscription = event.data.object as Stripe.Subscription
        console.log("Processing subscription deletion", subscription.id)
        const subscriptionId = event.data.object.id as string

        await handleSubscriptionDeleted({
          subscriptionId,
          stripe,
        })
        console.log("Subscription deleted successfully")
        break

      case "customer.subscription.updated":
        console.log("Subscription updated", event.data.object.id)
        // Handle subscription updates if needed
        break

      case "invoice.payment_succeeded":
        console.log("Payment succeeded", event.data.object.id)
        // Handle successful payments if needed
        break

      default:
        console.log(`Unhandled event type: ${event.type}`)
        break
    }

    return NextResponse.json({
      received: true,
      eventType: event.type,
    })
  } catch (error) {
    console.error("Webhook error:", error)
    return NextResponse.json({ error: "Webhook handler failed" }, { status: 400 })
  }
}
