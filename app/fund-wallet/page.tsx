"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function FundWalletPage() {
  const [amount, setAmount] = useState("");
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
          setMessage(data.error || data.message || "Payment verification failed");
          return;
        }

        setMessage(`Payment successful! ₦${Number(data.amount).toLocaleString()} an ƙara cikin wallet.`);

        window.history.replaceState({}, "", "/fund-wallet");
      } catch {
        setMessage("An samu matsala wajen tabbatar da payment.");
      } finally {
        setLoading(false);
      }
    };

    verifyPayment();
  }, []);

  const handlePayment = async () => {
    setMessage("");

    const numericAmount = Number(amount);

    if (!Number.isFinite(numericAmount) || numericAmount < 100) {
      setMessage("Minimum amount shine ₦100.");
      return;
    }

    setLoading(true);

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setMessage("Da fatan za ka fara login.");
        return;
      }

      const response = await fetch("/api/paystack/initialize", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: user.email,
          amount: numericAmount,
          user_id: user.id,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.error || "Payment initialization failed.");
        return;
      }

      window.location.href = data.authorization_url;
    } catch {
      setMessage("An samu matsala. Sake gwadawa.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="max-w-md mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">
        Fund Wallet
      </h1>

      <div className="space-y-4">
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter Amount"
          className="w-full border rounded-lg p-3"
          min="100"
        />

        <button
          onClick={handlePayment}
          disabled={loading}
          className="w-full bg-green-600 text-white rounded-lg p-3 font-bold disabled:opacity-50"
        >
          {loading ? "Processing..." : "Continue to Pay"}
        </button>

        {message && (
          <p className="text-center font-medium">
            {message}
          </p>
        )}
      </div>
    </main>
  );
}
