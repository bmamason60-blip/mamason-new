"use client";

import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";

type Plan = {
  id: number | string;
  name: string;
  price: number | string;
};

export default function BuyDataPage() {
  const [network, setNetwork] = useState("1");
  const [phone, setPhone] = useState("");
  const [plans, setPlans] = useState<Plan[]>([]);
  const [plan, setPlan] = useState("");
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState("");
  const [balance, setBalance] = useState(0);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    fetchPlans();
  }, [network]);

  async function getUser() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setUserId("");
      return;
    }

    setUserId(user.id);

    const { data: wallet } = await supabase
      .from("wallets")
      .select("balance")
      .eq("user_id", user.id)
      .single();

    if (wallet) {
      setBalance(Number(wallet.balance || 0));
    }
  }

  async function fetchPlans() {
    try {
      setPlans([]);
      setPlan("");

      const res = await fetch("/api/data-plans");
      const data = await res.json();

      if (data.status && data.data?.[network]) {
        setPlans(data.data[network]);
      }
    } catch (err) {
      console.error("Plans error:", err);
      setPlans([]);
    }
  }

  async function handleBuy() {
    setMessage("");
    setError("");

    if (!userId) {
      setError("Please login again.");
      return;
    }

    if (!plan) {
      setError("Please select a data plan.");
      return;
    }

    const cleanPhone = phone.replace(/\s/g, "");

    if (!/^0[789][01]\d{8}$/.test(cleanPhone)) {
      setError("Please enter a valid Nigerian phone number.");
      return;
    }

    const selectedPlan = plans.find(
      (item) => String(item.id) === String(plan)
    );

    if (!selectedPlan) {
      setError("Selected data plan not found.");
      return;
    }

    const amount = Number(selectedPlan.price);

    if (!Number.isFinite(amount) || amount <= 0) {
      setError("Invalid data plan price.");
      return;
    }

    if (balance < amount) {
      setError("Insufficient wallet balance.");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("/api/buy-data", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          network_id: Number(network),
          plan_id: Number(plan),
          phone: cleanPhone,
          user_id: userId,
          amount,
        }),
      });

      const result = await res.json();

      if (result.success === true || result.status === true) {
        setMessage("Data purchase successful!");
        setPhone("");
        setPlan("");
        await getUser();
      } else {
        setError(result.message || "Data purchase failed.");
      }
    } catch (err) {
      console.error("Purchase error:", err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  const selectedPlan = plans.find(
    (item) => String(item.id) === String(plan)
  );

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-8 text-white">
      <div className="mx-auto w-full max-w-lg">
        <div className="mb-6">
          <p className="text-sm font-medium text-cyan-400">MAMASON DATA</p>
          <h1 className="mt-1 text-3xl font-bold">Buy Data</h1>
          <p className="mt-2 text-sm text-slate-400">
            Choose a network and data plan, then enter the recipient number.
          </p>
        </div>

        <div className="mb-6 rounded-2xl border border-cyan-500/20 bg-gradient-to-br from-cyan-500/15 to-blue-500/10 p-5 shadow-lg shadow-cyan-950/20">
          <p className="text-sm text-slate-400">Wallet Balance</p>
          <p className="mt-1 text-3xl font-bold">
            ₦{balance.toLocaleString("en-NG")}
          </p>
        </div>

        <div className="space-y-5 rounded-2xl border border-slate-800 bg-slate-900 p-5 shadow-xl">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">
              Network
            </label>

            <select
              value={network}
              onChange={(e) => setNetwork(e.target.value)}
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-cyan-400"
            >
              <option value="1">MTN</option>
              <option value="2">Glo</option>
              <option value="3">Airtel</option>
              <option value="4">9mobile</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">
              Data Plan
            </label>

            <select
              value={plan}
              onChange={(e) => setPlan(e.target.value)}
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-cyan-400"
            >
              <option value="">Select a data plan</option>

              {plans.map((item) => (
                <option key={item.id} value={String(item.id)}>
                  {item.name} - ₦
                  {Number(item.price).toLocaleString("en-NG")}
                </option>
              ))}
            </select>
          </div>

          {selectedPlan && (
            <div className="rounded-xl border border-cyan-500/20 bg-cyan-500/10 p-4">
              <p className="text-xs uppercase tracking-wide text-cyan-300">
                Selected Plan
              </p>

              <div className="mt-1 flex items-center justify-between gap-3">
                <span className="font-semibold">{selectedPlan.name}</span>

                <span className="text-lg font-bold text-cyan-300">
                  ₦{Number(selectedPlan.price).toLocaleString("en-NG")}
                </span>
              </div>
            </div>
          )}

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">
              Phone Number
            </label>

            <input
              type="tel"
              inputMode="numeric"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="08012345678"
              maxLength={11}
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none placeholder:text-slate-600 focus:border-cyan-400"
            />
          </div>

          {error && (
            <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
              {error}
            </div>
          )}

          {message && (
            <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-300">
              {message}
            </div>
          )}

          <button
            type="button"
            onClick={handleBuy}
            disabled={loading || plans.length === 0}
            className="w-full rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-4 py-3.5 font-semibold text-white shadow-lg shadow-cyan-950/30 transition hover:from-cyan-400 hover:to-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Processing..." : "Buy Data"}
          </button>
        </div>
      </div>
    </main>
  );
}
