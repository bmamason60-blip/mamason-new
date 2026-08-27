import Link from "next/link";

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
                                                                                          <Link href="/login2">
                                                                                                    <button
                                                                                                                style={{
                                                                                                                              padding: "10px 18px",
                                                                                                                                            borderRadius: "8px",
                                                                                                                                                          border: "none",
                                                                                                                                                                        cursor: "pointer",
                                                                                                                                                                                    }}
                                                                                                                                                                                              >
                                                                                                                                                                                                          Login
                                                                                                                                                                                                                    </button>
                                                                                                                                                                                                                            </Link>

                                                                                                                                                                                                                                    <Link href="/register2">
                                                                                                                                                                                                                                              <button
                                                                                                                                                                                                                                                          style={{
                                                                                                                                                                                                                                                                        padding: "10px 18px",
                                                                                                                                                                                                                                                                                      borderRadius: "8px",
                                                                                                                                                                                                                                                                                                    border: "none",
                                                                                                                                                                                                                                                                                                                  cursor: "pointer",
                                                                                                                                                                                                                                                                                                                              }}
                                                                                                                                                                                                                                                                                                                                        >
                                                                                                                                                                                                                                                                                                                                                    Register
                                                                                                                                                                                                                                                                                                                                                              </button>
                                                                                                                                                                                                                                                                                                                                                                      </Link>
                                                                                                                                                                                                                                                                                                                                                                            </div>
                                                                                                                                                                                                                                                                                                                                                                                </nav>
                                                                                                                                                                                                                                                                                                                                                                                  );
                                                                                                                                                                                                                                                                                                                                                                                  }