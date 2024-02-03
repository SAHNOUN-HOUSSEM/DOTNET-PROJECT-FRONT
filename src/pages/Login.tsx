import LoginForm from "../components/Login/LoginForm";
import styles from "../components/Login/Login.module.css";
import Footer from "../assets/react.svg";

const Login = () => {
  return (
    <>
      <section
        className={`${styles["background-radial-gradient"]} overflow-hidden`}
      >
        <div className="container px-4 py-5 px-md-5 text-center text-lg-start my-5">
          <div className="row gx-lg-5 align-items-center mb-5">
            <div className="col-lg-6 mb-5 mb-lg-0" style={{ zIndex: 10 }}>
              <h1
                className="my-5 display-5 fw-bold ls-tight"
                style={{ color: "hsl(218, 81%, 95%)" }}
              >
                Groupe Mdhaffar <br />
                <span style={{ color: "hsl(218, 81%, 75%)" }}>
                  Bienvenu Admin
                </span>
              </h1>
              <div>
                {/* Facebook Icons */}
                <div
                  className="mb-4"
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <div style={{ textAlign: "center" }}>
                    <a
                      href=" https://www.facebook.com/STTP.SFAX/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i
                        className="fab fa-facebook"
                        style={{ color: "hsl(218, 100%, 100%)" }}
                      ></i>
                    </a>
                    <p style={{ color: "white", fontWeight: "bold" }}> STTP </p>
                  </div>
                  <div style={{ textAlign: "center" }}>
                    <a
                      href="https://www.facebook.com/sttp.gonflable/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i
                        className="fab fa-facebook"
                        style={{ color: "hsl(218, 100%, 100%)" }}
                      ></i>
                    </a>
                    <p style={{ color: "white", fontWeight: "bold" }}>
                      STTP Gonflables
                    </p>
                  </div>

                  <div style={{ textAlign: "center" }}>
                    <a href="#" target="_blank" rel="noopener noreferrer">
                      <i
                        className="fab fa-facebook"
                        style={{ color: "hsl(218, 100%, 100%)" }}
                      ></i>
                    </a>
                    <p style={{ color: "white", fontWeight: "bold" }}>
                      STTP Location
                    </p>
                  </div>

                  <div style={{ textAlign: "center" }}>
                    <a
                      href="https://www.facebook.com/piscine.tunisia/?locale=fr_FR"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i
                        className="fab fa-facebook"
                        style={{ color: "hsl(218, 100%, 100%)" }}
                      ></i>
                    </a>
                    <p style={{ color: "white", fontWeight: "bold" }}>
                      Water Sky
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6 mb-5 mb-lg-0 position-relative">
              <div
                id={styles["radius-shape-1"]}
                className="position-absolute rounded-circle shadow-5-strong"
              ></div>
              <div
                id={styles["radius-shape-2"]}
                className="position-absolute shadow-5-strong"
              ></div>

              <div className={`${styles["bg-glass"]} card`}>
                <div className="card-body px-4 py-5 px-md-5">
                  <LoginForm />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Login;
