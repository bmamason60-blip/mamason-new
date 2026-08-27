import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const network_id = Number(body.network_id);
    const plan_id = Number(body.plan_id);
    const phone = String(body.phone || "").replace(/\D/g, "");
    const user_id = String(body.user_id || "").trim();
    const amount = Number(body.amount);

    if (!network_id || !plan_id || !phone || !user_id || !amount) {
      return NextResponse.json(
        {
          status: false,
          success: false,
          message: "Network, plan, phone, user and amount are required.",
        },
        { status: 400 }
      );
    }

    if (![1, 2, 3, 4].includes(network_id)) {
      return NextResponse.json(
        {
          status: false,
          success: false,
          message: "Invalid network ID.",
        },
        { status: 400 }
      );
    }

    if (!Number.isFinite(amount) || amount <= 0) {
      return NextResponse.json(
        {
          status: false,
          success: false,
          message: "Invalid data plan price.",
        },
        { status: 400 }
      );
    }

    if (!/^0\d{10}$/.test(phone)) {
      return NextResponse.json(
        {
          status: false,
          success: false,
          message: "Phone number must contain 11 digits.",
        },
        { status: 400 }
      );
    }

    const { data: wallet, error: walletError } = await supabase
      .from("wallets")
      .select("id, user_id, balance")
      .eq("user_id", user_id)
      .single();

    if (walletError || !wallet) {
      console.error("Wallet error:", walletError);

      return NextResponse.json(
        {
          status: false,
          success: false,
          message: "Wallet not found for this user.",
        },
        { status: 404 }
      );
    }

    const currentBalance = Number(wallet.balance || 0);

    if (currentBalance < amount) {
      return NextResponse.json(
        {
          status: false,
          success: false,
          message: "Insufficient wallet balance.",
          balance: currentBalance,
        },
        { status: 400 }
      );
    }

    const apiKey = process.env.SMEPLUG_PRIVATE_KEY;

    if (!apiKey) {
      return NextResponse.json(
        {
          status: false,
          success: false,
          message: "SMEplug private key is missing.",
        },
        { status: 500 }
      );
    }

    const smeplugResponse = await fetch(
      "https://smeplug.ng/api/v1/data/purchase",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          network_id,
          plan_id,
          phone,
        }),
        cache: "no-store",
      }
    );

    const smeplugResult = await smeplugResponse
      .json()
      .catch(() => ({}));

    console.log("SMEPLUG DATA RESPONSE:", smeplugResult);

    const successful =
      smeplugResponse.ok &&
      (
        smeplugResult?.success === true ||
        smeplugResult?.status === true ||
        smeplugResult?.status === "success" ||
        smeplugResult?.data?.success === true ||
        smeplugResult?.data?.status === true
      );

    if (!successful) {
      return NextResponse.json(
        {
          status: false,
          success: false,
          message:
            smeplugResult?.message ||
            smeplugResult?.msg ||
            smeplugResult?.error ||
            smeplugResult?.data?.message ||
            "Data purchase failed.",
          provider_response: smeplugResult,
        },
        { status: 400 }
      );
    }

    const newBalance = currentBalance - amount;

    const { error: balanceError } = await supabase
      .from("wallets")
      .update({
        balance: newBalance,
      })
      .eq("id", wallet.id)
      .eq("user_id", user_id);

    if (balanceError) {
      console.error("Wallet update error:", balanceError);

      return NextResponse.json(
        {
          status: false,
          success: false,
          message:
            "Data purchase was successful, but wallet balance could not be updated.",
        },
        { status: 500 }
      );
    }

    const { error: transactionError } = await supabase
      .from("transactions")
      .insert({
        user_id,
        phone,
        amount,
        status: "successful",
        service: "data",
      });

    if (transactionError) {
      console.error("Transaction error:", transactionError);
    }

    return NextResponse.json({
      status: true,
      success: true,
      message: "Data purchase successful.",
      balance: newBalance,
      provider_response: smeplugResult,
    });
  } catch (error) {
    console.error("Buy Data Error:", error);

    return NextResponse.json(
      {
        status: false,
        success: false,
        message: "Something went wrong while processing data.",
      },
      { status: 500 }
    );
  }
}
