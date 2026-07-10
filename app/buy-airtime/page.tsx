export default function BuyAirtimePage() {
      return (
          <main className="max-w-md mx-auto p-6">
                <h1 className="text-3xl font-bold mb-6">
                        Buy Airtime
                              </h1>

                                    <div className="space-y-4">
                                            <select className="w-full border rounded-lg p-3">
                                                      <option>MTN</option>
                                                                <option>Airtel</option>
                                                                          <option>Glo</option>
                                                                                    <option>9mobile</option>
                                                                                            </select>

                                                                                                    <input
                                                                                                              type="tel"
                                                                                                                        placeholder="Phone Number"
                                                                                                                                  className="w-full border rounded-lg p-3"
                                                                                                                                          />

                                                                                                                                                  <input
                                                                                                                                                            type="number"
                                                                                                                                                                      placeholder="Amount"
                                                                                                                                                                                className="w-full border rounded-lg p-3"
                                                                                                                                                                                        />

                                                                                                                                                                                                <button className="w-full bg-green-600 text-white rounded-lg p-3">
                                                                                                                                                                                                          Buy Airtime
                                                                                                                                                                                                                  </button>
                                                                                                                                                                                                                        </div>
                                                                                                                                                                                                                            </main>
                                                                                                                                                                                                                              );
                                                                                                                                                                                                                              }