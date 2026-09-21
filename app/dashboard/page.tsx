"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { logoutUser } from "@/lib/auth";

type Transaction = {
  id?: string;
  phone: string;
  amount: number;
  status: string;
  service: string;
  created_at?: string;
};

export default function Dashboard() {
  const router = useRouter();

  const [name, setName] = useState("User");
  const [balance, setBalance] = useState("0.00");
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDashboard() {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (!user) {
          router.push("/login");
          return;
        }

        const { data: profile } = await supabase
          .from("profiles")
          .select("full_name")
          .eq("id", user.id)
          .single();

        if (profile?.full_name) {
          setName(profile.full_name);
        }

        const { data: wallet } = await supabase
          .from("wallets")
          .select("balance")
          .eq("user_id", user.id)
          .single();

        if (wallet) {
          setBalance(Number(wallet.balance || 0).toFixed(2));
        }

        const { data: recentTransactions } = await supabase
          .from("transactions")
          .select(
            "id, phone, amount, status, service, created_at"
          )
          .eq("user_id", user.id)
          .order("created_at", { ascending: false })
          .limit(5);

        setTransactions(recentTransactions || []);
      } catch (error) {
        console.error("Dashboard error:", error);
      } finally {
        setLoading(false);
      }
    }

    loadDashboard();
  }, [router]);

  async function handleLogout() {
    await logoutUser();
    router.push("/login");
  }

  function serviceIcon(service: string) {
    return service?.toLowerCase() === "airtime" ? "📱" : "📶";
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="max-w-5xl mx-auto px-4 py-6">

        {/* Header */}
        <div className="flex items-center justify-between mb-7">
          <div>
            <p className="text-green-400 text-sm font-semibold">
              MAMASON DATA
            </p>

            <h1 className="text-2xl font-bold mt-1">
              Welcome, {name}
            </h1>

            <p className="text-slate-400 text-sm mt-1">
              Manage your digital services easily.
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="rounded-xl bg-red-500/10 text-red-400 px-4 py-2 text-sm font-semibold"
          >
            Logout
          </button>
        </div>

        {/* Wallet */}
        <div className="rounded-3xl bg-gradient-to-br from-green-600 to-emerald-800 p-6 shadow-xl mb-7">
          <p className="text-green-100 text-sm">
            Available Wallet Balance
          </p>

          <h2 className="text-4xl font-extrabold mt-2">
            {loading ? "Loading..." : `₦${balance}`}
          </h2>

          <p className="text-green-100 text-xs mt-3">
            Your current Mamason Data wallet balance
          </p>
        </div>

        {/* Quick Actions */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">
            Quick Services
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-8">

          <button
            onClick={() => router.push("/fund-wallet")}
            className="rounded-2xl bg-slate-900 border border-slate-800 p-5 text-left hover:border-green-500 transition"
          >
            <div className="h-12 w-12 rounded-xl bg-emerald-500/10 flex items-center justify-center text-2xl mb-3">
              💰
            </div>

            <h3 className="font-bold">
              Fund Wallet
            </h3>

            <p className="text-xs text-slate-400 mt-1">
              Add money to your Mamason wallet
            </p>
          </button>

          <button
            onClick={() => router.push("/buy-data2")}
            className="rounded-2xl bg-slate-900 border border-slate-800 p-5 text-left hover:border-green-500 transition"
          >
            <div className="h-12 w-12 rounded-xl bg-green-500/10 flex items-center justify-center text-2xl mb-3">
              📶
            </div>

            <h3 className="font-bold">
              Buy Data
            </h3>

            <p className="text-xs text-slate-400 mt-1">
              Get affordable data bundles
            </p>
          </button>

          <button
            onClick={() => router.push("/buy-airtime")}
            className="rounded-2xl bg-slate-900 border border-slate-800 p-5 text-left hover:border-green-500 transition"
          >
            <div className="h-12 w-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-2xl mb-3">
              📱
            </div>

            <h3 className="font-bold">
              Buy Airtime
            </h3>

            <p className="text-xs text-slate-400 mt-1">
              Recharge any network instantly
            </p>
          </button>

          <button
            onClick={() => router.push("/electricity")}
            className="rounded-2xl bg-slate-900 border border-slate-800 p-5 text-left hover:border-green-500 transition"
          >
            <div className="h-12 w-12 rounded-xl bg-yellow-500/10 flex items-center justify-center text-2xl mb-3">
              ⚡
            </div>

            <h3 className="font-bold">
              Electricity
            </h3>

            <p className="text-xs text-slate-400 mt-1">
              Pay your electricity bills
            </p>
          </button>

          <button
            onClick={() => router.push("/cable-tv")}
            className="rounded-2xl bg-slate-900 border border-slate-800 p-5 text-left hover:border-green-500 transition"
          >
            <div className="h-12 w-12 rounded-xl bg-purple-500/10 flex items-center justify-center text-2xl mb-3">
              📺
            </div>

            <h3 className="font-bold">
              Cable TV
            </h3>

            <p className="text-xs text-slate-400 mt-1">
              Pay your TV subscription
            </p>
          </button>

        </div>

        {/* Recent Transactions */}
        <div className="rounded-3xl bg-slate-900 border border-slate-800 p-5">

          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-xl font-bold">
                Recent Transactions
              </h2>

              <p className="text-xs text-slate-400 mt-1">
                Your latest activity
              </p>
            </div>

            <button
              onClick={() => router.push("/transactions")}
              className="text-green-400 text-sm font-semibold"
            >
              View All
            </button>
          </div>

          {loading ? (
            <p className="text-slate-400 text-sm">
              Loading transactions...
            </p>
          ) : transactions.length === 0 ? (
            <div className="text-center py-8">
              <div className="text-4xl mb-3">
                🧾
              </div>

              <p className="text-slate-400 text-sm">
                No transactions yet.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {transactions.map((transaction) => {
                const successful =
                  transaction.status?.toLowerCase() ===
                  "successful";

                return (
                  <div
                    key={transaction.id}
                    className="flex items-center justify-between gap-3 border-b border-slate-800 pb-3 last:border-0 last:pb-0"
                  >
                    <div className="flex items-center gap-3">

                      <div className="h-10 w-10 rounded-full bg-slate-800 flex items-center justify-center">
                        {serviceIcon(transaction.service)}
                      </div>

                      <div>
                        <p className="font-semibold capitalize">
                          {transaction.service}
                        </p>

                        <p className="text-xs text-slate-400">
                          {transaction.phone}
                        </p>
                      </div>

                    </div>

                    <div className="text-right">

                      <p className="font-bold">
                        ₦
                        {Number(
                          transaction.amount
                        ).toLocaleString()}
                      </p>

                      <p
                        className={`text-xs font-semibold ${
                          successful
                            ? "text-green-400"
                            : "text-red-400"
                        }`}
                      >
                        {successful
                          ? "Successful"
                          : transaction.status}
                      </p>

                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-slate-600 mt-8">
          © {new Date().getFullYear()} Mamason Data
        </p>

      </div>
    </main>
  );
}
