import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { email, amount, user_id } = await req.json();

    if (!email || !amount || !user_id) {
      return NextResponse.json(
        { error: "Email, amount and user ID are required" },
        { status: 400 }
      );
    }

    const numericAmount = Number(amount);

    if (!Number.isFinite(numericAmount) || numericAmount < 100) {
      return NextResponse.json(
        { error: "Minimum amount is ₦100" },
        { status: 400 }
      );
    }

    const secretKey = process.env.PAYSTACK_SECRET_KEY;

    if (!secretKey) {
      return NextResponse.json(
        { error: "Paystack secret key is missing" },
        { status: 500 }
      );
    }

    const response = await fetch(
      "https://api.paystack.co/transaction/initialize",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${secretKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          amount: Math.round(numericAmount * 100),
          currency: "NGN",

          callback_url:
            "https://mamason-new.vercel.app/fund-wallet",

          metadata: {
            user_id,
          },
        }),
      }
    );

    const data = await response.json();

    if (!response.ok || !data.status) {
      return NextResponse.json(
        {
          error:
            data.message || "Paystack initialization failed",
        },
        { status: 400 }
      );
    }

    return NextResponse.json({
      authorization_url: data.data.authorization_url,
      reference: data.data.reference,
    });
  } catch (error) {
    console.error("Paystack initialization error:", error);

    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
