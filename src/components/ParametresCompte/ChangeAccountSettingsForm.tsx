import { useEffect, useState } from "react";
import styles from "./ParametresCompte.module.css";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import Spin from "../UI/Spin";
import { type } from "@testing-library/user-event/dist/type";
const EMAIL_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
const PHONE_REGEX = /^\+?[0-9]+$/;

export default function ChangeAccountSettingsForm({
  admin,
  setAdmin,
  setErrMsg,
  setChangeSettings,
}) {
  const privateAxios = useAxiosPrivate();

  const [validEmail, setValidEmail] = useState(false);
  const [validPhone, setValidPhone] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [
    showConfirmAccountSettingsChange,
    setShowConfirmAccountSettingsChange,
  ] = useState(false);

  const [formData, setFormData] = useState(admin);

  const handleChange = (e) => {
    setErrMsg("");
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleChangeAccountSettingsFormSubmition = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const checkEmail = EMAIL_REGEX.test(formData.email);
    if (!checkEmail) {
      setErrMsg("email invalide. Veuillez entrer un email valide.");
      setIsLoading(false);
      return;
    }
    const checkPhone = PHONE_REGEX.test(formData.phone);
    if (!checkPhone) {
      setErrMsg(
        "numéro de téléphone invalide. Veuillez entrer un numéro de téléphone valide."
      );
      setIsLoading(false);
      return;
    }

    const adminUpdateData = {
      email: formData.email,
      phone: formData.phone,
    };
    try {
      const response = await privateAxios.put(`admins/${admin._id}`, {
        admin: adminUpdateData,
      });
      const adminData = response.data.admin;
      setAdmin(adminData);
    } catch (err) {
      setIsLoading(false);
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 404) {
        setErrMsg("aucune carousel n'est créée");
      } else {
        setErrMsg(err.response.data.error);
      }
    } finally {
      setIsLoading(false);
      setChangeSettings(0);
    }
  };

  useEffect(() => {
    setValidEmail(EMAIL_REGEX.test(formData.email));
    setValidPhone(PHONE_REGEX.test(formData.phone));
  }, [formData]);

  return (
    <div>
      {isLoading && <Spin />}
      <form onSubmit={handleChangeAccountSettingsFormSubmition}>
        <div className={styles["form-group"]}>
          <label htmlFor="email">E-mail</label>
          <input
            disabled={showConfirmAccountSettingsChange}
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div className={styles["form-group"]}>
          <label htmlFor="phone">Téléphone</label>
          <input
            disabled={showConfirmAccountSettingsChange}
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />
        </div>

        <button
          className={`btn btn-danger w-100 mb-3`}
          disabled={
            (admin.email === formData.email &&
              admin.phone === formData.phone) ||
            isLoading ||
            !validEmail ||
            !validPhone
          }
          type="button"
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
            <button className="btn btn-info">Confirmer la mise à jour</button>
          </div>
        )}
      </form>
    </div>
  );
}
