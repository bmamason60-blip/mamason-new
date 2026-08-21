import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
  try {
    const { network_id, phone, user_id, amount } = await req.json();

    console.log("BUY AIRTIME REQUEST:", {
      network_id,
      phone,
      user_id,
      amount,
    });

    // 1. Check required fields
    if (!network_id || !phone || !user_id || !amount) {
      return NextResponse.json(
        {
          success: false,
          message: "Missing required fields",
        },
        { status: 400 }
      );
    }

    const purchaseAmount = Number(amount);

    if (!Number.isFinite(purchaseAmount) || purchaseAmount <= 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid amount",
        },
        { status: 400 }
      );
    }

    // 2. Get user's wallet
    const { data: wallets, error: walletError } = await supabase
      .from("wallets")
      .select("id, user_id, balance")
      .eq("user_id", user_id)
      .limit(1);

    if (walletError) {
      console.error("Wallet error:", walletError);

      return NextResponse.json(
        {
          success: false,
          message: walletError.message,
        },
        { status: 400 }
      );
    }

    if (!wallets || wallets.length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Wallet not found",
        },
        { status: 404 }
      );
    }

    const wallet = wallets[0];
    const currentBalance = Number(wallet.balance || 0);

    console.log("CURRENT WALLET BALANCE:", currentBalance);

    // 3. Check balance
    if (currentBalance < purchaseAmount) {
      return NextResponse.json(
        {
          success: false,
          message: "Insufficient Balance",
          balance: currentBalance,
        },
        { status: 400 }
      );
    }

    // 4. Purchase airtime from SMEPlug
    const response = await fetch(
      "https://smeplug.ng/api/v1/airtime/purchase",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.SMEPLUG_PRIVATE_KEY}`,
        },
        body: JSON.stringify({
          network_id,
          phone,
          amount: purchaseAmount,
        }),
      }
    );

    const result = await response.json();

    console.log("SMEPLUG AIRTIME RESPONSE:", result);

    // 5. SMEPlug failed
    if (!response.ok || result.success === false) {
      await supabase.from("transactions").insert({
        user_id,
        phone,
        amount: purchaseAmount,
        status: "failed",
        service: "airtime",
      });

      return NextResponse.json(
        {
          success: false,
          message: result.message || "Airtime purchase failed",
        },
        { status: 400 }
      );
    }

    // 6. Deduct money from wallet
    const newBalance = currentBalance - purchaseAmount;

    const { error: updateWalletError } = await supabase
      .from("wallets")
      .update({
        balance: newBalance,
      })
      .eq("id", wallet.id);

    if (updateWalletError) {
      console.error("Wallet update error:", updateWalletError);

      return NextResponse.json(
        {
          success: false,
          message: "Airtime purchase succeeded, but wallet update failed.",
        },
        { status: 500 }
      );
    }

    // 7. Save transaction
    const { error: transactionError } = await supabase
      .from("transactions")
      .insert({
        user_id,
        phone,
        amount: purchaseAmount,
        status: "successful",
        service: "airtime",
      });

    if (transactionError) {
      console.error("Transaction error:", transactionError);

      return NextResponse.json(
        {
          success: true,
          message:
            "Airtime purchase successful, but transaction history could not be saved.",
          balance: newBalance,
        },
        { status: 200 }
      );
    }

    // 8. Final success
    return NextResponse.json(
      {
        success: true,
        message: "Airtime purchase successful",
        balance: newBalance,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("AIRTIME PURCHASE ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong",
      },
      { status: 500 }
    );
  }
}
