import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import styles from "./ParametresCompte.module.css";
import Spin from "../UI/Spin";
import AccountSettingsCard from "./AccountSettingsCard";
import ChangeAccountSettingsForm from "./ChangeAccountSettingsForm";
import ChangePasswordForm from "./ChangePasswordForm";

export default function AccountSettings({ setErrMsg }) {
  const privateAxios = useAxiosPrivate();

  const { auth } = useAuth();

  const { adminId } = auth;

  const [admin, setAdmin] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const [changeSettings, setChangeSettings] = useState(0);

  useEffect(() => {
    const fetchAdminData = async () => {
      setIsLoading(true);
      try {
        const response = await privateAxios.get(`admins/${adminId}`, {
          withCredentials: true,
        });
        const adminData = response.data.admin;
        setAdmin(adminData);
      } catch (err) {
        if (!err?.response) {
          setErrMsg("No Server Response");
        } else if (err.response?.status === 404) {
          setErrMsg("aucune admin avec l'id entré");
        } else {
          setErrMsg(err.response.data.error);
        }
      } finally {
        setIsLoading(false);
      }
    };
    fetchAdminData();
  }, [privateAxios, adminId, setErrMsg]);
  return (
    <div className="container">
      <div className="row">
        <div className={`w-100 ${styles["account-settings"]}`}>
          {isLoading && <Spin />}
          <h1>Paramétres Compte</h1>
          {changeSettings === 0 ? (
            <AccountSettingsCard admin={admin} />
          ) : changeSettings === 1 ? (
            <ChangeAccountSettingsForm
              admin={admin}
              setAdmin={setAdmin}
              setErrMsg={setErrMsg}
              setChangeSettings={setChangeSettings}
            />
          ) : (
            <ChangePasswordForm
              admin={admin}
              setAdmin={setAdmin}
              setErrMsg={setErrMsg}
              setChangeSettings={setChangeSettings}
            />
          )}
        </div>
      </div>
      {changeSettings === 0 ? (
        <>
          <div className="row mt-4">
            <button
              className={`${styles["change-parametre-btn"]} w-100`}
              onClick={() => {
                setChangeSettings(1);
                setErrMsg("");
              }}
              disabled={isLoading}
            >
              Changer les paramètres du compte
            </button>
          </div>
          <div className="row mt-4">
            <button
              className={`${styles["change-password-btn"]} w-100`}
              onClick={() => {
                setChangeSettings(2);
                setErrMsg("");
              }}
              disabled={isLoading}
            >
              Changer le mot de passe
            </button>
          </div>
        </>
      ) : (
        <div className="row mt-4">
          <button
            className={`${styles["change-password-btn"]} w-100`}
            onClick={() => {
              setChangeSettings(0);
              setErrMsg("");
            }}
          >
            Retour
          </button>
        </div>
      )}
    </div>
  );
}
