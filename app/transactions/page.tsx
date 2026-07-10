export default function TransactionsPage() {
      return (
          <main className="max-w-3xl mx-auto p-6">
                <h1 className="text-3xl font-bold mb-6">
                        Transaction History
                              </h1>

                                    <div className="bg-white rounded-xl shadow p-4">
                                            <table className="w-full">
                                                      <thead>
                                                                  <tr className="border-b">
                                                                                <th className="text-left py-2">Service</th>
                                                                                              <th className="text-left py-2">Amount</th>
                                                                                                            <th className="text-left py-2">Status</th>
                                                                                                                        </tr>
                                                                                                                                  </thead>

                                                                                                                                            <tbody>
                                                                                                                                                        <tr className="border-b">
                                                                                                                                                                      <td className="py-3">MTN 1GB</td>
                                                                                                                                                                                    <td>₦500</td>
                                                                                                                                                                                                  <td className="text-green-600">Successful</td>
                                                                                                                                                                                                              </tr>

                                                                                                                                                                                                                          <tr className="border-b">
                                                                                                                                                                                                                                        <td className="py-3">Airtime</td>
                                                                                                                                                                                                                                                      <td>₦1000</td>
                                                                                                                                                                                                                                                                    <td className="text-green-600">Successful</td>
                                                                                                                                                                                                                                                                                </tr>
                                                                                                                                                                                                                                                                                          </tbody>
                                                                                                                                                                                                                                                                                                  </table>
                                                                                                                                                                                                                                                                                                        </div>
                                                                                                                                                                                                                                                                                                            </main>
                                                                                                                                                                                                                                                                                                              );
                                                                                                                                                                                                                                                                                                              }