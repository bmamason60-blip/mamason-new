export default function Services() {
      const services = [
          "Buy Data",
              "Buy Airtime",
                  "Electricity",
                      "Cable TV",
                          "Exam Pins",
                              "Wallet",
                                ];

                                  return (
                                      <section
                                            style={{
                                                    background: "#111827",
                                                            padding: "50px 20px",
                                                                  }}
                                                                      >
                                                                            <h2
                                                                                    style={{
                                                                                              color: "white",
                                                                                                        textAlign: "center",
                                                                                                                  marginBottom: "30px",
                                                                                                                          }}
                                                                                                                                >
                                                                                                                                        Our Services
                                                                                                                                              </h2>

                                                                                                                                                    <div
                                                                                                                                                            style={{
                                                                                                                                                                      display: "grid",
                                                                                                                                                                                gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
                                                                                                                                                                                          gap: "20px",
                                                                                                                                                                                                    maxWidth: "900px",
                                                                                                                                                                                                              margin: "0 auto",
                                                                                                                                                                                                                      }}
                                                                                                                                                                                                                            >
                                                                                                                                                                                                                                    {services.map((service) => (
                                                                                                                                                                                                                                              <div
                                                                                                                                                                                                                                                          key={service}
                                                                                                                                                                                                                                                                      style={{
                                                                                                                                                                                                                                                                                    background: "#1f2937",
                                                                                                                                                                                                                                                                                                  color: "white",
                                                                                                                                                                                                                                                                                                                padding: "25px",
                                                                                                                                                                                                                                                                                                                              borderRadius: "12px",
                                                                                                                                                                                                                                                                                                                                            textAlign: "center",
                                                                                                                                                                                                                                                                                                                                                          fontWeight: "bold",
                                                                                                                                                                                                                                                                                                                                                                        cursor: "pointer",
                                                                                                                                                                                                                                                                                                                                                                                    }}
                                                                                                                                                                                                                                                                                                                                                                                              >
                                                                                                                                                                                                                                                                                                                                                                                                          {service}
                                                                                                                                                                                                                                                                                                                                                                                                                    </div>
                                                                                                                                                                                                                                                                                                                                                                                                                            ))}
                                                                                                                                                                                                                                                                                                                                                                                                                                  </div>
                                                                                                                                                                                                                                                                                                                                                                                                                                      </section>
                                                                                                                                                                                                                                                                                                                                                                                                                                        );
                                                                                                                                                                                                                                                                                                                                                                                                                                        }