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

                                                        if (error) return { error };

                                                          if (data.user) {
                                                              await supabase.from("profiles").insert({
                                                                  id: data.user.id,
                                                                      full_name: fullName,
                                                                          email,
                                                                              wallet_balance: 0,
                                                                                });

                                                                                  await supabase.from("wallets").insert({
                                                                                      user_id: data.user.id,
                                                                                          balance: 0,
                                                                                            });
                                                                                            }

                                                                                            return { data };
                                                          }