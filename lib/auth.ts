console.log("REGISTER FUNCTION STARTED");
import { supabase } from "./supabase";

export async function registerUser(
  email: string,
    password: string
    ) {
      return await supabase.auth.signUp({
          email,
              password,
                });
                }

                export async function loginUser(
                  email: string,
                    password: string
                    ) {
                      return await supabase.auth.signInWithPassword({
                          email,
                              password,
                                });
                                }

                                export async function logoutUser() {
                                  return await supabase.auth.signOut();
                                  }
                                  export async function registerWithProfile(
                                      fullName: string,
                                        email: string,
                                          password: string
                                          ) {
                                            const { data, error } = await supabase.auth.signUp({
                                                email,
                                                    password,
                                                      });
                                                      console.log("SIGNUP DATA:", data);
                                                      console.log("SIGNUP ERROR:", error);

                                                        if (error) return { error };

                                                          if (data.user) {
                                                              const { error: profileError } = await supabase
                                                                .from("profiles")
                                                                  .insert({
                                                                      id: data.user.id,
                                                                          full_name: fullName,
                                                                                });

                                                                                if (profileError) {
                                                                                  console.error("Profile creation error:", profileError);
                                                                                  }

                                                                                  const { error: walletError } = await supabase
                                                                                    .from("wallets")
                                                                                      .insert({
                                                                                          user_id: data.user.id,
                                                                                              balance: 0.00,
                                                                                                });

                                                                                                if (walletError) {
                                                                                                  console.error("Wallet creation error:", walletError);
                                                                                                  }

                                                                                            return { data, error: null };
                                                                                                }
                                                                                              }