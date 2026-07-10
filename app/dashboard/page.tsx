export default function Dashboard() {
          return (
              <main className="min-h-screen bg-gray-100 p-6">
                    <h1 className="text-3xl font-bold text-green-700 mb-6">
                            Mamason Data
                                  </h1>

                                        {/* Wallet */}
                                              <div className="bg-green-600 text-white rounded-xl p-5 mb-6">
                                                      <h2 className="text-lg">Wallet Balance</h2>
                                                              <p className="text-3xl font-bold mt-2">₦0.00</p>
                                                                    </div>

                                                                          {/* Services */}
                                                                                <h2 className="text-xl font-bold mb-4">Our Services</h2>

                                                                                      <div className="grid grid-cols-2 gap-4">
                                                                                              <a href="/buy-data" className="bg-white rounded-xl shadow p-4 text-center">
                                                                                                        📱
                                                                                                                  <p className="mt-2 font-semibold">Buy Data</p>
                                                                                                                          </a>

                                                                                                                                  <a href="/buy-airtime" className="bg-white rounded-xl shadow p-4 text-center">
                                                                                                                                            ☎️
                                                                                                                                                      <p className="mt-2 font-semibold">Buy Airtime</p>
                                                                                                                                                              </a>

                                                                                                                                                                      <a href="/electricity" className="bg-white rounded-xl shadow p-4 text-center">
                                                                                                                                                                                ⚡
                                                                                                                                                                                          <p className="mt-2 font-semibold">Electricity</p>
                                                                                                                                                                                                  </a>

                                                                                                                                                                                                          <a href="/cable-tv" className="bg-white rounded-xl shadow p-4 text-center">
                                                                                                                                                                                                                    📺
                                                                                                                                                                                                                              <p className="mt-2 font-semibold">Cable TV</p>
                                                                                                                                                                                                                                      </a>
                                                                                                                                                                                                                                            </div>

                                                                                                                                                                                                                                                  {/* Recent Transactions */}
                                                                                                                                                                                                                                                        <div className="bg-white rounded-xl shadow p-4 mt-8">
                                                                                                                                                                                                                                                                <h2 className="text-xl font-bold mb-2">Recent Transactions</h2>
                                                                                                                                                                                                                                                                        <p className="text-gray-500">
                                                                                                                                                                                                                                                                                  No transaction yet.
                                                                                                                                                                                                                                                                                          </p>
                                                                                                                                                                                                                                                                                                </div>
                                                                                                                                                                                                                                                                                                    </main>
                                                                                                                                                                                                                                                                                                      );
                                                                                                                                                                                                                                                                                                      }