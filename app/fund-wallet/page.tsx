export default function FundWalletPage() {
      return (
          <main className="max-w-md mx-auto p-6">
                <h1 className="text-3xl font-bold mb-6">
                        Fund Wallet
                              </h1>

                                    <div className="space-y-4">
                                            <input
                                                      type="number"
                                                                placeholder="Enter Amount"
                                                                          className="w-full border rounded-lg p-3"
                                                                                  />

                                                                                          <select className="w-full border rounded-lg p-3">
                                                                                                    <option>Bank Transfer</option>
                                                                                                              <option>Card Payment</option>
                                                                                                                      </select>

                                                                                                                              <button className="w-full bg-green-600 text-white rounded-lg p-3 font-bold">
                                                                                                                                        Continue
                                                                                                                                                </button>
                                                                                                                                                      </div>
                                                                                                                                                          </main>
                                                                                                                                                            );
                                                                                                                                                            }