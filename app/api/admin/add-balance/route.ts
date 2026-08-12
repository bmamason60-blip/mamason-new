import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    export async function POST(req: NextRequest) {
      try {
          const { user_id, amount } = await req.json();

              if (!user_id || !amount) {
                    return NextResponse.json(
                            { error: "Missing user_id or amount" },
                                    { status: 400 }
                                          );
                                              }

                                                  const { data: wallets, error: walletError } = await supabase
                                                    .from("wallets")
                                                      .select("id,balance")
                                                        .eq("user_id", user_id)
                                                          .limit(1);

                                                          if (walletError) {
                                                            return NextResponse.json(
                                                                { error: walletError.message },
                                                                    { status: 400 }
                                                                      );
                                                                      }

                                                                      if (!wallets || wallets.length === 0) {
                                                                        return NextResponse.json(
                                                                            { error: "Wallet not found" },
                                                                                { status: 404 }
                                                                                  );
                                                                                  }

                                                                                  const wallet = wallets[0];
                                                                              
                                                                                                                  const newBalance = Number(wallet.balance) + Number(amount);

                                                                                                                      const { error: updateError } = await supabase
                                                                                                                            .from("wallets")
                                                                                                                                  .update({ balance: newBalance })
                                                                                                                                        .eq("user_id", user_id);

                                                                                                                                            if (updateError) {
                                                                                                                                                  return NextResponse.json(
                                                                                                                                                          { error: updateError.message },
                                                                                                                                                                  { status: 400 }
                                                                                                                                                                        );
                                                                                                                                                                            }
                                                                                                                                                                                return NextResponse.json({
                                                                                                                                                                                      success: true,
                                                                                                                                                                                            balance: newBalance,
                                                                                                                                                                                                });
                                                                                                                                                                                                  } catch (error) {
                                                                                                                                                                                                      console.error(error);

                                                                                                                                                                                                          return NextResponse.json(
                                                                                                                                                                                                                { error: "Internal Server Error" },
                                                                                                                                                                                                                      { status: 500 }
                                                                                                                                                                                                                          );
                                                                                                                                                                                                                            }
                                                                                                                                                                                                                        }