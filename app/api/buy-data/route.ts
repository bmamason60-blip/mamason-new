import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
      const { network_id, plan_id, phone } = await req.json();

          const response = await fetch(
                "https://smeplug.ng/api/v1/data/purchase",
                      {
                              method: "POST",
                                      headers: {
                                                "Content-Type": "application/json",
                                                          Authorization: `Bearer ${process.env.SMEPLUG_PRIVATE_KEY}`,
                                                                  },
                                                                          body: JSON.stringify({
                                                                                    network_id,
                                                                                              plan_id,
                                                                                                        phone,
                                                                                                                }),
                                                                                                                      }
                                                                                                                          );

                                                                                                                              const result = await response.json();

                                                                                                                                  return NextResponse.json(result);
                                                                                                                                    } catch (error) {
                                                                                                                                        return NextResponse.json(
                                                                                                                                              {
                                                                                                                                                      success: false,
                                                                                                                                                              message: "Server Error",
                                                                                                                                                                    },
                                                                                                                                                                          {
                                                                                                                                                                                  status: 500,
                                                                                                                                                                                        }
                                                                                                                                                                                            );
                                                                                                                                                                                              }
                                                                                                                                                                                              }