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
    const phone = String(body.phone || "").replace(/\D/g, "");
    const amount = Number(body.amount);
    const user_id = String(body.user_id || "").trim();

    if (!network_id || !phone || !amount || !user_id) {
      return NextResponse.json(
        {
          success: false,
          message: "Network, phone, amount and user are required.",
        },
        { status: 400 }
      );
    }

    if (![1, 2, 3, 4].includes(network_id)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid network ID.",
        },
        { status: 400 }
      );
    }

    if (!/^0\d{10}$/.test(phone)) {
      return NextResponse.json(
        {
          success: false,
          message: "Phone number must contain 11 digits.",
        },
        { status: 400 }
      );
    }

    if (!Number.isFinite(amount) || amount < 20) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid airtime amount.",
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
      return NextResponse.json(
        {
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
          success: false,
          message: "SMEplug private key is missing.",
        },
        { status: 500 }
      );
    }

    const response = await fetch(
      "https://smeplug.ng/api/v1/airtime/purchase",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          network_id,
          phone,
          amount,
        }),
        cache: "no-store",
      }
    );

    const result = await response.json().catch(() => ({}));

    console.log("SMEPLUG AIRTIME RESPONSE:", result);

    const successful =
      response.ok &&
      (
        result?.success === true ||
        result?.status === true ||
        result?.status === "success" ||
        result?.data?.success === true ||
        result?.data?.status === true
      );

    if (!successful) {
      return NextResponse.json(
        {
          success: false,
          message:
            result?.message ||
            result?.msg ||
            result?.error ||
            result?.data?.message ||
            "Airtime purchase failed.",
          provider_response: result,
        },
        { status: 400 }
      );
    }

    const newBalance = currentBalance - amount;

    const { error: balanceError } = await supabase
      .from("wallets")
      .update({ balance: newBalance })
      .eq("id", wallet.id)
      .eq("user_id", user_id);

    if (balanceError) {
      console.error("WALLET UPDATE ERROR:", balanceError);

      return NextResponse.json(
        {
          success: false,
          message:
            "Airtime was successful, but wallet balance could not be updated.",
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
        service: "airtime",
      });

    if (transactionError) {
      console.error("TRANSACTION SAVE ERROR:", transactionError);
    }

    return NextResponse.json({
      success: true,
      message: "Airtime purchase successful.",
      balance: newBalance,
      provider_response: result,
    });
  } catch (error) {
    console.error("AIRTIME ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong while processing airtime.",
      },
      { status: 500 }
    );
  }
}
