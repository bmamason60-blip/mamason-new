"use client";

import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/lib/supabase";

type Transaction = {
  id?: string;
  user_id: string;
  phone: string;
  amount: number;
  status: string;
  service: string;
  created_at?: string;
};

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    async function getTransactions() {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (!user) {
          setTransactions([]);
          return;
        }

        const { data, error } = await supabase
          .from("transactions")
          .select(
            "id, user_id, phone, amount, status, service, created_at"
          )
          .eq("user_id", user.id)
          .order("created_at", { ascending: false });

        if (error) {
          console.error("Transaction error:", error);
          return;
        }

        setTransactions(data || []);
      } catch (error) {
        console.error("Transaction error:", error);
      } finally {
        setLoading(false);
      }
    }

    getTransactions();
  }, []);

  const filteredTransactions = useMemo(() => {
    return transactions.filter((transaction) => {
      const service = transaction.service?.toLowerCase() || "";
      const status = transaction.status?.toLowerCase() || "";
      const phone = transaction.phone || "";

      const matchesSearch =
        phone.includes(search) ||
        service.includes(search.toLowerCase()) ||
        status.includes(search.toLowerCase());

      const matchesFilter =
        filter === "all" ||
        (filter === "airtime" && service === "airtime") ||
        (filter === "data" && service === "data") ||
        (filter === "successful" && status === "successful") ||
        (filter === "failed" && status !== "successful");

      return matchesSearch && matchesFilter;
    });
  }, [transactions, search, filter]);

  function formatDate(date?: string) {
    if (!date) return "Date unavailable";

    return new Date(date).toLocaleString("en-NG", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  }

  function serviceName(service: string) {
    return service?.toLowerCase() === "airtime"
      ? "Airtime"
      : service?.toLowerCase() === "data"
      ? "Data"
      : service || "Transaction";
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white px-4 py-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-7">
          <p className="text-green-400 text-sm font-semibold mb-1">
            Mamason Data
          </p>

          <h1 className="text-3xl font-bold">
            Transaction History
          </h1>

          <p className="text-slate-400 mt-2">
            View and manage all your airtime and data transactions.
          </p>
        </div>

        {/* Search */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search phone, service or status..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-2xl border border-slate-700 bg-slate-900 px-4 py-4 text-white outline-none focus:border-green-500"
          />
        </div>

        {/* Filters */}
        <div className="flex gap-2 overflow-x-auto pb-3 mb-5">
          {[
            ["all", "All"],
            ["airtime", "Airtime"],
            ["data", "Data"],
            ["successful", "Successful"],
            ["failed", "Failed"],
          ].map(([value, label]) => (
            <button
              key={value}
              onClick={() => setFilter(value)}
              className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-semibold transition ${
                filter === value
                  ? "bg-green-600 text-white"
                  : "bg-slate-800 text-slate-300 hover:bg-slate-700"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Transactions */}
        {loading ? (
          <div className="rounded-2xl bg-slate-900 border border-slate-800 p-8 text-center text-slate-400">
            Loading transactions...
          </div>
        ) : filteredTransactions.length === 0 ? (
          <div className="rounded-2xl bg-slate-900 border border-slate-800 p-10 text-center">
            <div className="text-4xl mb-3">🧾</div>

            <h2 className="text-lg font-bold">
              No transactions found
            </h2>

            <p className="text-slate-400 mt-2 text-sm">
              Your transactions will appear here after you make a purchase.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredTransactions.map((transaction) => {
              const successful =
                transaction.status?.toLowerCase() === "successful";

              return (
                <div
                  key={transaction.id}
                  className="rounded-2xl border border-slate-800 bg-slate-900 p-4 shadow-lg"
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="h-11 w-11 rounded-full bg-slate-800 flex items-center justify-center text-xl">
                        {transaction.service?.toLowerCase() ===
                        "airtime"
                          ? "📱"
                          : "📶"}
                      </div>

                      <div>
                        <h3 className="font-bold">
                          {serviceName(transaction.service)}
                        </h3>

                        <p className="text-sm text-slate-400">
                          {transaction.phone}
                        </p>
                      </div>
                    </div>

                    <div className="text-right">
                      <p className="font-bold text-lg">
                        ₦
                        {Number(
                          transaction.amount
                        ).toLocaleString()}
                      </p>

                      <span
                        className={`inline-block mt-1 rounded-full px-2.5 py-1 text-xs font-semibold ${
                          successful
                            ? "bg-green-500/15 text-green-400"
                            : "bg-red-500/15 text-red-400"
                        }`}
                      >
                        {successful
                          ? "Successful"
                          : transaction.status}
                      </span>
                    </div>
                  </div>

                  <div className="border-t border-slate-800 mt-4 pt-3">
                    <p className="text-xs text-slate-500">
                      {formatDate(transaction.created_at)}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Count */}
        {!loading && transactions.length > 0 && (
          <p className="text-center text-xs text-slate-500 mt-6">
            Showing {filteredTransactions.length} of{" "}
            {transactions.length} transactions
          </p>
        )}
      </div>
    </main>
  );
}
