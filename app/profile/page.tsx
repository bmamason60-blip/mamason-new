export default function ProfilePage() {
      return (
          <main className="max-w-md mx-auto p-6">
                <h1 className="text-3xl font-bold mb-6">
                        My Profile
                              </h1>

                                    <div className="bg-white rounded-xl shadow p-5 space-y-4">
                                            <div>
                                                      <p className="text-gray-500">Full Name</p>
                                                                <h2 className="font-bold text-lg">Bashir Muhammad</h2>
                                                                        </div>

                                                                                <div>
                                                                                          <p className="text-gray-500">Email</p>
                                                                                                    <h2 className="font-bold">example@email.com</h2>
                                                                                                            </div>

                                                                                                                    <div>
                                                                                                                              <p className="text-gray-500">Phone Number</p>
                                                                                                                                        <h2 className="font-bold">08012345678</h2>
                                                                                                                                                </div>

                                                                                                                                                        <button className="w-full bg-red-600 text-white rounded-lg p-3">
                                                                                                                                                                  Logout
                                                                                                                                                                          </button>
                                                                                                                                                                                </div>
                                                                                                                                                                                    </main>
                                                                                                                                                                                      );
                                                                                                                                                                                      }