"use client";

import { useState } from "react";
import { dataPlans } from "./plans";

export default function BuyDataPage() {
  const [network, setNetwork] = useState("MTN");

    return (
        <div className="max-w-md mx-auto p-6">
              <h1 className="text-3xl font-bold text-center mb-6">
                      Buy Data
                            </h1>

                                  <div className="space-y-4">
                                          <div>
                                                    <label className="block mb-2 font-medium">Network</label>
                                                              <select
                                                                          value={network}
                                                                                      onChange={(e) => setNetwork(e.target.value)}
                                                                                                  className="w-full border rounded-lg p-3"
                                                                                                            >
                                                                                                                        <option>MTN</option>
                                                                                                                                    <option>Airtel</option>
                                                                                                                                                <option>Glo</option>
                                                                                                                                                            <option>9mobile</option>
                                                                                                                                                                      </select>
                                                                                                                                                                              </div>

                                                                                                                                                                                      <div>
                                                                                                                                                                                                <label className="block mb-2 font-medium">Data Plan</label>
                                                                                                                                                                                                          <select className="w-full border rounded-lg p-3">
                                                                                                                                                                                                                      {dataPlans[network as keyof typeof dataPlans].map((plan) => (
                                                                                                                                                                                                                                    <option key={plan.id}>
                                                                                                                                                                                                                                                    {plan.name} - ₦{plan.price}
                                                                                                                                                                                                                                                                  </option>
                                                                                                                                                                                                                                                                              ))}
                                                                                                                                                                                                                                                                                        </select>
                                                                                                                                                                                                                                                                                                </div>

                                                                                                                                                                                                                                                                                                        <div>
                                                                                                                                                                                                                                                                                                                  <label className="block mb-2 font-medium">Phone Number</label>
                                                                                                                                                                                                                                                                                                                            <input
                                                                                                                                                                                                                                                                                                                                        type="tel"
                                                                                                                                                                                                                                                                                                                                                    placeholder="08012345678"
                                                                                                                                                                                                                                                                                                                                                                className="w-full border rounded-lg p-3"
                                                                                                                                                                                                                                                                                                                                                                          />
                                                                                                                                                                                                                                                                                                                                                                                  </div>

                                                                                                                                                                                                                                                                                                                                                                                          <button className="w-full bg-green-600 text-white rounded-lg p-3 font-bold">
                                                                                                                                                                                                                                                                                                                                                                                                    Buy Data
                                                                                                                                                                                                                                                                                                                                                                                                            </button>
                                                                                                                                                                                                                                                                                                                                                                                                                  </div>
                                                                                                                                                                                                                                                                                                                                                                                                                      </div>
                                                                                                                                                                                                                                                                                                                                                                                                                        );
                                                                                                                                                                                                                                                                                                                                                                                                                        }