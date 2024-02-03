import { FC, FormEvent, useEffect, useRef, useState } from "react";
import styles from "./Register.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faInfoCircle,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "../../API/axios";

const PWD_REGEX: RegExp =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const EMAIL_REGEX: RegExp = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;

interface IAdminData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: number;
}

interface IRegisterData {
  admin: IAdminData;
  adminCode: number | string | undefined;
}

const RegisterForm: FC = () => {
  const navigate = useNavigate();

  const errRef = useRef<HTMLParagraphElement | null>(null);
  const userRef = useRef<HTMLInputElement | null>(null);

  const [firstName, setFirstName] = useState("");

  const [lastName, setLastName] = useState("");

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);

  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [phone, setPhone] = useState<string | number>("");

  const [adminCode, setAdminCode] = useState<string | number>("");

  const [errMsg, setErrMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleRegisterFormSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const check = PWD_REGEX.test(password);
    if (!check) {
      setErrMsg(
        "8 to 24 characters. Must include uppercase and lowercase letters, a number and a special character."
      );
      setIsLoading(false);
      return;
    }

    const admin: IAdminData = {
      firstName,
      lastName,
      email,
      password,
      //@ts-expect-error description
      phone: parseInt(phone),
    };

    try {
      const registerData: IRegisterData = { admin, adminCode };
      //@ts-expect-error description
      await axios("/register", registerData);
      navigate("/login");
    } catch (err) {
      //@ts-expect-error execpt
      if (err && !err?.response) {
        setErrMsg("No Server Response");
      } else {
        //@ts-expect-error execpt
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

  useEffect(() => {
    setValidPassword(PWD_REGEX.test(password));
    setValidMatch(password === matchPwd);
  }, [password, matchPwd]);

  useEffect(() => {
    setValidEmail(EMAIL_REGEX.test(email));
  }, [email]);

  useEffect(() => {
    setErrMsg("");
  }, [firstName, lastName, password, matchPwd]);

  return (
    <>
      <h1 className="text-center mb-4">Créer un compte</h1>
      <div className="d-flex justify-content-center align-items-center">
        <div
          className={`spinner-border text-primary ${isLoading ? "" : "d-none"}`}
          role="status"
        >
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
      <p
        ref={errRef}
        className={`${errMsg && !isLoading ? styles["errmsg"] : "d-none"}`}
        aria-live="assertive"
      >
        {errMsg}
      </p>

      <form onSubmit={handleRegisterFormSubmit}>
        <div className={styles["form-group"]}>
          <label htmlFor="lastName">Nom</label>
          <input
            className="form-control"
            ref={userRef}
            type="text"
            id="lastName"
            name="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div className={styles["form-group"]}>
          <label htmlFor="firstName">Prénom</label>
          <input
            className="form-control"
            type="text"
            id="firstName"
            name="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div className={styles["form-group"]}>
          <label htmlFor="email">
            E-mail
            <FontAwesomeIcon
              icon={faCheck}
              className={validEmail ? styles["valid"] : "d-none"}
            />
            <FontAwesomeIcon
              icon={faTimes}
              className={validEmail || !email ? "d-none" : styles["invalid"]}
            />
          </label>
          <input
            className="form-control"
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className={styles["form-group"]}>
          <label htmlFor="phone">Téléphone</label>
          <input
            className="form-control"
            type="number"
            id="phone"
            name="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <div className={styles["form-group"]}>
          <label htmlFor="password">
            Mot de Passe
            <FontAwesomeIcon
              icon={faCheck}
              className={validPassword ? styles["valid"] : "d-none"}
            />
            <FontAwesomeIcon
              icon={faTimes}
              className={
                validPassword || !password ? "d-none" : styles["invalid"]
              }
            />
          </label>
          <input
            className="form-control"
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onFocus={() => setPwdFocus(true)}
            onBlur={() => setPwdFocus(false)}
          />
          <p
            id="pwdnote"
            className={
              pwdFocus && !validPassword ? styles["instructions"] : "d-none"
            }
          >
            <FontAwesomeIcon icon={faInfoCircle} />
            8 to 24 characters.
            <br />
            Must include uppercase and lowercase letters, a number and a special
            character.
            <br />
            Allowed special characters:
            <span aria-label="exclamation mark">!</span>
            <span aria-label="at symbol">@</span>
            <span aria-label="hashtag">#</span>
            <span aria-label="dollar sign">$</span>
            <span aria-label="percent">%</span>
          </p>
        </div>
        <div className={styles["form-group"]}>
          <label htmlFor="passwordMatch">
            Verification Mot de Passe
            <FontAwesomeIcon
              icon={faCheck}
              className={validMatch && matchPwd ? styles["valid"] : "d-none"}
            />
            <FontAwesomeIcon
              icon={faTimes}
              className={validMatch || !matchPwd ? "d-none" : styles["invalid"]}
            />
          </label>
          <input
            className="form-control"
            type="password"
            id="passwordMatch"
            value={matchPwd}
            onChange={(e) => setMatchPwd(e.target.value)}
            onFocus={() => setMatchFocus(true)}
            onBlur={() => setMatchFocus(false)}
          />
          <p
            id="confirmnote"
            className={
              matchFocus && !validMatch ? styles["instructions"] : "d-none"
            }
          >
            <FontAwesomeIcon icon={faInfoCircle} />
            Must match the first password input field. className="form-control"
          </p>
        </div>
        <div className={styles["form-group"]}>
          <label htmlFor="adminCode">Admin Code</label>
          <input
            className="form-control"
            type="number"
            id="adminCode"
            name="adminCode"
            value={adminCode}
            onChange={(e) => setAdminCode(e.target.value)}
          />
        </div>
        <div
          className={`${styles["form-group"]} d-flex align-items-center justify-content-center`}
        >
          <button
            className="btn btn-outline-dark btn-block mb-4"
            type="submit"
            disabled={
              !firstName ||
              !lastName ||
              !validEmail ||
              !phone ||
              !validPassword ||
              !validMatch ||
              !adminCode ||
              isLoading
            }
          >
            Créer compte
          </button>
        </div>
      </form>
      <div style={{ textAlign: "center" }}>
        <p>
          Already registered?
          <br />
          <span style={{ display: "inline-block" }}>
            <NavLink to={"/login"} className="text-dark-50 fw-bold">
              Se connecter
            </NavLink>
          </span>
        </p>
      </div>
    </>
  );
};

export default RegisterForm;
