export default function ElectricityPage() {
      return (
          <main className="max-w-md mx-auto p-6">
                <h1 className="text-3xl font-bold mb-6">
                        Electricity Bill
                              </h1>

                                    <div className="space-y-4">
                                            <select className="w-full border rounded-lg p-3">
                                                      <option>KEDCO</option>
                                                                <option>IKEDC</option>
                                                                          <option>EKEDC</option>
                                                                                    <option>AEDC</option>
                                                                                              <option>IBEDC</option>
                                                                                                      </select>

                                                                                                              <input
                                                                                                                        type="text"
                                                                                                                                  placeholder="Meter Number"
                                                                                                                                            className="w-full border rounded-lg p-3"
                                                                                                                                                    />

                                                                                                                                                            <input
                                                                                                                                                                      type="number"
                                                                                                                                                                                placeholder="Amount"
                                                                                                                                                                                          className="w-full border rounded-lg p-3"
                                                                                                                                                                                                  />

                                                                                                                                                                                                          <button className="w-full bg-green-600 text-white rounded-lg p-3 font-bold">
                                                                                                                                                                                                                    Pay Electricity
                                                                                                                                                                                                                            </button>
                                                                                                                                                                                                                                  </div>
                                                                                                                                                                                                                                      </main>
                                                                                                                                                                                                                                        );
                                                                                                                                                                                                                                        }