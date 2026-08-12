import { NextResponse } from "next/server";

export async function GET() {
  try {
      const response = await fetch("https://smeplug.ng/api/v1/data/plans", {
            method: "GET",
                  headers: {
                          Authorization: `Bearer ${process.env.SMEPLUG_PRIVATE_KEY}`,
                                  "Content-Type": "application/json",
                                        },
                                              cache: "no-store",
                                                  });

                                                      const data = await response.json();

                                                          return NextResponse.json(data);
                                                            } catch (error) {
                                                                console.error(error);

                                                                    return NextResponse.json(
                                                                          {
                                                                                  status: false,
                                                                                          msg: "Failed to fetch data plans",
                                                                                                },
                                                                                                      {
                                                                                                              status: 500,
                                                                                                                    }
                                                                                                                        );
                                                                                                                          }
                                                                                                                          }