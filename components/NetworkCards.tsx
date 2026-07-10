export default function NetworkCards() {
      const networks = [
          { name: "MTN", color: "#ffcc00" },
              { name: "Airtel", color: "#ff0000" },
                  { name: "Glo", color: "#00aa44" },
                      { name: "9mobile", color: "#006600" },
                        ];

                          return (
                              <section
                                    style={{
                                            background: "#0f172a",
                                                    padding: "40px 20px",
                                                          }}
                                                              >
                                                                    <h2
                                                                            style={{
                                                                                      textAlign: "center",
                                                                                                color: "white",
                                                                                                          marginBottom: "25px",
                                                                                                                  }}
                                                                                                                        >
                                                                                                                                Available Networks
                                                                                                                                      </h2>

                                                                                                                                            <div
                                                                                                                                                    style={{
                                                                                                                                                              display: "flex",
                                                                                                                                                                        justifyContent: "center",
                                                                                                                                                                                  gap: "20px",
                                                                                                                                                                                            flexWrap: "wrap",
                                                                                                                                                                                                    }}
                                                                                                                                                                                                          >
                                                                                                                                                                                                                  {networks.map((network) => (
                                                                                                                                                                                                                            <div
                                                                                                                                                                                                                                        key={network.name}
                                                                                                                                                                                                                                                    style={{
                                                                                                                                                                                                                                                                  width: "150px",
                                                                                                                                                                                                                                                                                padding: "20px",
                                                                                                                                                                                                                                                                                              background: network.color,
                                                                                                                                                                                                                                                                                                            borderRadius: "12px",
                                                                                                                                                                                                                                                                                                                          textAlign: "center",
                                                                                                                                                                                                                                                                                                                                        color: "white",
                                                                                                                                                                                                                                                                                                                                                      fontWeight: "bold",
                                                                                                                                                                                                                                                                                                                                                                    fontSize: "20px",
                                                                                                                                                                                                                                                                                                                                                                                }}
                                                                                                                                                                                                                                                                                                                                                                                          >
                                                                                                                                                                                                                                                                                                                                                                                                      {network.name}
                                                                                                                                                                                                                                                                                                                                                                                                                </div>
                                                                                                                                                                                                                                                                                                                                                                                                                        ))}
                                                                                                                                                                                                                                                                                                                                                                                                                              </div>
                                                                                                                                                                                                                                                                                                                                                                                                                                  </section>
                                                                                                                                                                                                                                                                                                                                                                                                                                    );
                                                                                                                                                                                                                                                                                                                                                                                                                                    }