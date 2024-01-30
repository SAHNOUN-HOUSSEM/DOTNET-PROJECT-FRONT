import { useEffect, useRef, useState } from "react";
import styles from "./Login.module.css";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

export default function LoginForm() {
  const privateAxios = useAxiosPrivate();
  const { setAuth } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const errRef = useRef<HTMLParagraphElement>();
  const userRef = useRef<HTMLInputElement>();

  const [email, setEmail] = useState("a@gmail.com");

  const [password, setPassword] = useState("a");

  const [errMsg, setErrMsg] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  //@ts-expect-error  description
  const handleRegisterFormSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const admin = {
      email,
      password,
    };

    try {
      const response = await privateAxios.post("/login", admin, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      const data = response.data;
      setAuth &&
        setAuth({ accessToken: data.accessToken, adminId: data.adminId });
      navigate(from, { replace: true });
    } catch (err) {
      console.log(err);
      //@ts-expect-error  description
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else {
        //@ts-expect-error  description
        setErrMsg(err.response.data.error);
      }
      errRef.current?.focus();
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    userRef.current?.focus();
  }, []);

  return (
    <>
      <h1 className="text-center mb-4">Se connecter</h1>
      <div className="d-flex justify-content-center align-items-center">
        <div
          className={`spinner-border text-primary ${isLoading ? "" : "d-none"}`}
          role="status"
        >
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
      <p
        //@ts-expect-error  description
        ref={errRef}
        className={`${errMsg && !isLoading ? styles["errmsg"] : "d-none"}`}
        aria-live="assertive"
      >
        {errMsg}
      </p>
      <form onSubmit={handleRegisterFormSubmit}>
        <div className={styles["form-group"]}>
          <label htmlFor="email">E-mail</label>
          <input
            className="form-control"
            //@ts-expect-error  description
            ref={userRef}
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className={styles["form-group"]}>
          <label htmlFor="password">Mot de Passe</label>
          <input
            className="form-control"
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div
          className={`${styles["form-group"]} d-flex align-items-center justify-content-center`}
        >
          <button
            type="submit"
            disabled={!email || !password || isLoading}
            className="btn btn-outline-dark btn-block mb-4"
          >
            Se connecter
          </button>
        </div>
      </form>
      <div style={{ textAlign: "center" }}>
        <p>
          Don't have an account?
          <br />
          <span style={{ display: "inline-block" }}>
            <NavLink to={"/register"} className="text-dark-50 fw-bold">
              Créer un compte
            </NavLink>
          </span>
        </p>
      </div>
    </>
  );
}
