import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const reference = searchParams.get("reference");

    if (!reference) {
      return NextResponse.json(
        { error: "Payment reference is required" },
        { status: 400 }
      );
    }

    const secretKey = process.env.PAYSTACK_SECRET_KEY;
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!secretKey || !supabaseUrl || !serviceRoleKey) {
      return NextResponse.json(
        { error: "Server configuration is incomplete" },
        { status: 500 }
      );
    }

    const response = await fetch(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${secretKey}`,
        },
      }
    );

    const data = await response.json();

    if (!response.ok || !data.status) {
      return NextResponse.json(
        {
          error: data.message || "Payment verification failed",
        },
        { status: 400 }
      );
    }

    const payment = data.data;

    if (payment.status !== "success") {
      return NextResponse.json({
        success: false,
        message: "Payment was not successful",
      });
    }

    if (payment.currency && payment.currency !== "NGN") {
      return NextResponse.json(
        { error: "Invalid payment currency" },
        { status: 400 }
      );
    }

    const userId = payment.metadata?.user_id;

    if (!userId) {
      return NextResponse.json(
        { error: "User ID is missing from payment metadata" },
        { status: 400 }
      );
    }

    const amount = Number(payment.amount) / 100;

    if (!Number.isFinite(amount) || amount <= 0) {
      return NextResponse.json(
        { error: "Invalid payment amount" },
        { status: 400 }
      );
    }

    const supabaseAdmin = createClient(
      supabaseUrl,
      serviceRoleKey,
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false,
        },
      }
    );

    const { data: fundingResult, error: fundingError } =
      await supabaseAdmin.rpc("add_wallet_funding", {
        p_user_id: userId,
        p_reference: payment.reference,
        p_amount: amount,
      });

    if (fundingError) {
      console.error("Wallet funding error:", fundingError);

      return NextResponse.json(
        { error: "Wallet funding failed" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message:
        fundingResult?.message || "Wallet funded successfully",
      reference: payment.reference,
      amount,
    });
  } catch (error) {
    console.error("Payment verification error:", error);

    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
