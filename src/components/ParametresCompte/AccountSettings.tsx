import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import styles from "./ParametresCompte.module.css";
import Spin from "../UI/Spin";
import AccountSettingsCard from "./AccountSettingsCard";
import ChangeAccountSettingsForm from "./ChangeAccountSettingsForm";
import ChangePasswordForm from "./ChangePasswordForm";
import { AxiosError } from "axios";
import IUser from "../../interfaces/user.types";

export default function AccountSettings({
  setErrMsg,
}: {
  setErrMsg: (err: string) => void;
}) {
  const privateAxios = useAxiosPrivate();

  const { auth } = useAuth();

  const { userId } = auth ?? {};

  const [user, setUser] = useState<IUser>({
    _id: "",
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
        const response = await privateAxios.get(`admins/${userId}`, {
          withCredentials: true,
        });
        const adminData = response.data.admin;
        setUser(adminData);
      } catch (err) {
        if (!(err as AxiosError)?.response) {
          setErrMsg("No Server Response");
        } else if ((err as AxiosError)?.response?.status === 404) {
          setErrMsg("aucune admin avec l'id entré");
        } else {
          //@ts-expect-error ts-migrate(7006) FIXME: Parameter 'err' implicitly has an 'any' type.
          setErrMsg((err as AxiosError)?.response?.data?.error);
        }
      } finally {
        setIsLoading(false);
      }
    };
    fetchAdminData();
  }, [privateAxios, userId, setErrMsg]);
  return (
    <div className="container">
      <div className="row">
        <div className={`w-100 ${styles["account-settings"]}`}>
          {isLoading && <Spin />}
          <h1>Paramétres Compte</h1>
          {changeSettings === 0 ? (
            <AccountSettingsCard user={user} />
          ) : changeSettings === 1 ? (
            <ChangeAccountSettingsForm
              user={user}
              setUser={setUser}
              setErrMsg={setErrMsg}
              setChangeSettings={setChangeSettings}
            />
          ) : (
            <ChangePasswordForm
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
