export default function Navbar() {
      return (
          <nav
                style={{
                        display: "flex",
                                justifyContent: "space-between",
                                        alignItems: "center",
                                                padding: "20px 40px",
                                                        background: "#16a34a",
                                                                color: "white",
                                                                      }}
                                                                          >
                                                                                <h2>Mamason Data</h2>

                                                                                      <div style={{ display: "flex", gap: "15px" }}>
                                                                                              <button>Login</button>
                                                                                                      <button>Register</button>
                                                                                                            </div>
                                                                                                                </nav>
                                                                                                                  );
                                                                                                                  }