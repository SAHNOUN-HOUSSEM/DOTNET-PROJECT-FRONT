import { FC, FormEvent, useEffect, useRef, useState } from "react";
import styles from "./ParametresCompte.module.css";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import Spin from "../UI/Spin";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faInfoCircle,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import useAuth from "../../hooks/useAuth";
import { IAuth } from "../../hooks/types";
import { AxiosError } from "axios";

const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

type Props = {
  setErrMsg: (err: string) => void;
  setChangeSettings: (changeSettings: number) => void;
};
const ChangePasswordForm: FC<Props> = ({ setErrMsg, setChangeSettings }) => {
  const { auth } = useAuth();
  const privateAxios = useAxiosPrivate();
  const userRef = useRef<HTMLInputElement | null>(null);

  const [isLoading, setIsLoading] = useState(false);

  const [
    showConfirmAccountSettingsChange,
    setShowConfirmAccountSettingsChange,
  ] = useState(false);

  const [oldPassword, setOldPassword] = useState("");

  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  useEffect(() => {
    userRef.current?.focus();
  }, []);

  useEffect(() => {
    setValidPassword(PWD_REGEX.test(password));
    setValidMatch(password === matchPwd);
  }, [password, matchPwd]);

  const handleChangeAccountSettingsFormSubmition = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const { userId }: IAuth = auth ?? {};
    const updatePasswordData = {
      newPassword: password,
      newPasswordCheck: matchPwd,
      oldPassword: oldPassword,
    };
    try {
      await privateAxios.post(`change-password/${userId}`, updatePasswordData, {
        withCredentials: true,
      });
      setChangeSettings(0);
    } catch (err) {
      setIsLoading(false);
      if (!(err as AxiosError)?.response) {
        setErrMsg("No Server Response");
      } else if ((err as AxiosError).response?.status === 400) {
        setErrMsg("données érroné");
      } else if ((err as AxiosError).response?.status === 401) {
        setErrMsg("non autorisé");
      } else if ((err as AxiosError).response?.status === 404) {
        setErrMsg("inexistant");
      } else {
        //@ts-expect-error  err
        setErrMsg(err.response.data.error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setErrMsg("");
  }, [password, matchPwd, oldPassword, setErrMsg]);

  return (
    <div>
      {isLoading && <Spin />}
      <form onSubmit={handleChangeAccountSettingsFormSubmition}>
        <div className={styles["form-group"]}>
          <label htmlFor="oldPassword">Ancien mot de passe</label>
          <input
            ref={userRef}
            type="password"
            id="oldPassword"
            name="oldPassword"
            value={oldPassword}
            disabled={showConfirmAccountSettingsChange}
            onChange={(e) => setOldPassword(e.target.value)}
          />
        </div>
        <div className={styles["form-group"]}>
          <label htmlFor="newPassword">
            Nouveau mot de passe
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
            type="password"
            id="newPassword"
            name="newPassword"
            value={password}
            disabled={showConfirmAccountSettingsChange}
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
          <label htmlFor="newPasswordCheck">
            Vérification du nouveau mot de passe
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
            type="password"
            id="newPasswordCheck"
            name="newPasswordCheck"
            value={matchPwd}
            disabled={showConfirmAccountSettingsChange}
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
            Must match the first password input field.
          </p>
        </div>
        <button
          className={`btn btn-danger w-100 mb-3`}
          type="button"
          disabled={!oldPassword || !validPassword || !validMatch}
          onClick={() => {
            setShowConfirmAccountSettingsChange(
              (showConfirmAccountSettingsChange) =>
                !showConfirmAccountSettingsChange
            );
          }}
        >
          {showConfirmAccountSettingsChange ? "Annuler" : "Mettre à jour"}
        </button>
        {showConfirmAccountSettingsChange && (
          <div>
            <button className="btn btn-info" disabled={isLoading}>
              Confirmer la mise à jour du mot de passe
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default ChangePasswordForm;
