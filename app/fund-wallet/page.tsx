"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function FundWalletPage() {
  const [amount, setAmount] = useState("");
  const [method, setMethod] = useState("card");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const verifyPayment = async () => {
      const params = new URLSearchParams(window.location.search);
      const reference = params.get("reference");

      if (!reference) return;

      setLoading(true);
      setMessage("Ana tabbatar da payment...");

      try {
        const response = await fetch(
          `/api/paystack/verify?reference=${encodeURIComponent(reference)}`
        );

        const data = await response.json();

        if (!response.ok || !data.success) {
          setMessage(
            data.error ||
              data.message ||
              "Payment verification failed"
          );
          return;
        }

        setMessage(
          `Payment successful! ₦${Number(
            data.amount
          ).toLocaleString()} an ƙara cikin wallet.`
        );

        window.history.replaceState(
          {},
          "",
          "/fund-wallet"
        );
      } catch {
        setMessage(
          "An samu matsala wajen tabbatar da payment."
        );
      } finally {
        setLoading(false);
      }
    };

    verifyPayment();
  }, []);

  const handlePayment = async () => {
    setMessage("");

    const numericAmount = Number(amount);

    if (
      !Number.isFinite(numericAmount) ||
      numericAmount < 100
    ) {
      setMessage("Minimum amount shine ₦100.");
      return;
    }

    if (method !== "card") {
      setMessage(
        "Bank Transfer ba a kunna shi tukuna. Zaɓi Card Payment."
      );
      return;
    }

    setLoading(true);

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setMessage("Da fatan ka fara login.");
        return;
      }

      const response = await fetch(
        "/api/paystack/initialize",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: user.email,
            amount: numericAmount,
            user_id: user.id,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setMessage(
          data.error ||
            "Payment initialization failed."
        );
        return;
      }

      if (!data.authorization_url) {
        setMessage(
          "Paystack payment link bai dawo ba."
        );
        return;
      }

      window.location.href =
        data.authorization_url;
    } catch {
      setMessage(
        "An samu matsala. Sake gwadawa."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-950 text-white p-6">
      <div className="max-w-md mx-auto pt-8">
        <h1 className="text-3xl font-bold mb-8">
          Fund Wallet
        </h1>

        <div className="space-y-5">
          <input
            type="number"
            value={amount}
            onChange={(e) =>
              setAmount(e.target.value)
            }
            placeholder="Enter Amount"
            min="100"
            className="w-full border border-slate-600 bg-slate-900 rounded-xl p-4 text-white outline-none"
          />

          <select
            value={method}
            onChange={(e) =>
              setMethod(e.target.value)
            }
            className="w-full border border-slate-600 bg-slate-900 rounded-xl p-4 text-white outline-none"
          >
            <option value="card">
              Card Payment
            </option>

            <option value="transfer">
              Bank Transfer
            </option>
          </select>

          <button
            onClick={handlePayment}
            disabled={loading}
            className="w-full bg-green-600 hover:bg-green-700 text-white rounded-xl p-4 font-bold disabled:opacity-50"
          >
            {loading
              ? "Processing..."
              : "Continue"}
          </button>

          {message && (
            <p className="text-center font-medium mt-4">
              {message}
            </p>
          )}
        </div>
      </div>
    </main>
  );
}
