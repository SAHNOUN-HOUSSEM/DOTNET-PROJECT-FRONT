import RegisterForm from "../components/Register/RegisterForm";
import styles from "../components/Register/Register.module.css";
import "@fortawesome/fontawesome-free/css/all.css";
export default function Register() {
  return (
    <>
      <section
        className={`${styles["background-radial-gradient"]} overflow-hidden`}
      >
        <div className="container px-4 py-5 px-md-5 text-center text-lg-start my-5">
          <div className="row gx-lg-5 align-items-center mb-5">
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
                  <RegisterForm />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
