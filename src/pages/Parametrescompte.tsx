import { useRef, useState } from "react";
import AccountSettings from "../components/ParametresCompte/AccountSettings";
import styles from "../components/ParametresCompte/ParametresCompte.module.css";

export default function Parametrescompte() {
  const errRef = useRef<HTMLParagraphElement | null>(null);

  const [errMsg, setErrMsg] = useState("");

  return (
    <>
      <p
        ref={errRef}
        className={`${errMsg ? styles["errmsg"] : "d-none"}`}
        aria-live="assertive"
      >
        {errMsg}
      </p>
      <AccountSettings setErrMsg={setErrMsg} />;
    </>
  );
}
