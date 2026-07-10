export default function CableTVPage() {
      return (
          <main className="max-w-md mx-auto p-6">
                <h1 className="text-3xl font-bold mb-6">
                        Cable TV Subscription
                              </h1>

                                    <div className="space-y-4">
                                            <select className="w-full border rounded-lg p-3">
                                                      <option>DSTV</option>
                                                                <option>GOtv</option>
                                                                          <option>Startimes</option>
                                                                                  </select>

                                                                                          <input
                                                                                                    type="text"
                                                                                                              placeholder="Smart Card / IUC Number"
                                                                                                                        className="w-full border rounded-lg p-3"
                                                                                                                                />

                                                                                                                                        <select className="w-full border rounded-lg p-3">
                                                                                                                                                  <option>DSTV Compact</option>
                                                                                                                                                            <option>DSTV Premium</option>
                                                                                                                                                                      <option>GOtv Max</option>
                                                                                                                                                                                <option>Startimes Basic</option>
                                                                                                                                                                                        </select>

                                                                                                                                                                                                <button className="w-full bg-green-600 text-white rounded-lg p-3 font-bold">
                                                                                                                                                                                                          Subscribe Now
                                                                                                                                                                                                                  </button>
                                                                                                                                                                                                                        </div>
                                                                                                                                                                                                                            </main>
                                                                                                                                                                                                                              );
                                                                                                                                                                                                                              }