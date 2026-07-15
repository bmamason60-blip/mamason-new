"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { logoutUser } from "@/lib/auth";

export default function Dashboard2Page() {
  const router = useRouter();

    const [name, setName] = useState("User");
      const [email, setEmail] = useState("");
        const [balance, setBalance] = useState("0.00");

          useEffect(() => {
              async function loadUser() {
                    const {
                            data: { user },
                                  } = await supabase.auth.getUser();

                                        if (!user) {
                                                router.push("/login2");
                                                        return;
                                                              }

                                                                    setEmail(user.email || "");

                                                                          const { data: profile } = await supabase
                                                                                  .from("profiles")
                                                                                          .select("full_name")
                                                                                                  .eq("id", user.id)
                                                                                                          .single();

                                                                                                                if (profile) {
                                                                                                                        setName(profile.full_name);
                                                                                                                              }

                                                                                                                                    const { data: wallet } = await supabase
                                                                                                                                            .from("wallets")
                                                                                                                                                    .select("balance")
                                                                                                                                                            .eq("user_id", user.id)
                                                                                                                                                                    .single();

                                                                                                                                                                          if (wallet) {
                                                                                                                                                                                  setBalance(wallet.balance.toString());
                                                                                                                                                                                        }
                                                                                                                                                                                            }

                                                                                                                                                                                                loadUser();
                                                                                                                                                                                                  }, [router]);

                                                                                                                                                                                                    async function handleLogout() {
                                                                                                                                                                                                        await logoutUser();
                                                                                                                                                                                                            router.push("/login2");
                                                                                                                                                                                                              }

                                                                                                                                                                                                                return (
                                                                                                                                                                                                                    <main style={{ padding: "30px", fontFamily: "Arial" }}>
                                                                                                                                                                                                                          <h1>Welcome, {name}</h1>

                                                                                                                                                                                                                                <p>{email}</p>

                                                                                                                                                                                                                                      <div
                                                                                                                                                                                                                                              style={{
                                                                                                                                                                                                                                                        marginTop: "20px",
                                                                                                                                                                                                                                                                  padding: "20px",
                                                                                                                                                                                                                                                                            borderRadius: "12px",
                                                                                                                                                                                                                                                                                      background: "#16a34a",
                                                                                                                                                                                                                                                                                                color: "white",
                                                                                                                                                                                                                                                                                                        }}
                                                                                                                                                                                                                                                                                                              >
                                                                                                                                                                                                                                                                                                                      <h2>Wallet Balance</h2>
                                                                                                                                                                                                                                                                                                                              <h1>₦{balance}</h1>
                                                                                                                                                                                                                                                                                                                                    </div>

                                                                                                                                                                                                                                                                                                                                          <button
                                                                                                                                                                                                                                                                                                                                                  onClick={handleLogout}
                                                                                                                                                                                                                                                                                                                                                          style={{
                                                                                                                                                                                                                                                                                                                                                                    marginTop: "20px",
                                                                                                                                                                                                                                                                                                                                                                              padding: "10px 20px",
                                                                                                                                                                                                                                                                                                                                                                                        border: "none",
                                                                                                                                                                                                                                                                                                                                                                                                  borderRadius: "8px",
                                                                                                                                                                                                                                                                                                                                                                                                            background: "red",
                                                                                                                                                                                                                                                                                                                                                                                                                      color: "white",
                                                                                                                                                                                                                                                                                                                                                                                                                                cursor: "pointer",
                                                                                                                                                                                                                                                                                                                                                                                                                                        }}
                                                                                                                                                                                                                                                                                                                                                                                                                                              >
                                                                                                                                                                                                                                                                                                                                                                                                                                                      Logout
                                                                                                                                                                                                                                                                                                                                                                                                                                                            </button>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                </main>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                  );
                                                                                                                                                                                                                                                                                                                                                                                                                                                                  }