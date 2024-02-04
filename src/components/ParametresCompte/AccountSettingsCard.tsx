import { FC } from "react";
import IUser from "../../interfaces/user.types";

type Props = {
  user: IUser;
};

const AccountSettingsCard: FC<Props> = ({ user }) => {
  return (
    <div className="row d-flex align-items-center">
      <div className="card mb-4">
        <div className="card-body">
          <div className="row">
            <div className="col-sm-3">
              <p className="mb-0">Nom</p>
            </div>
            <div className="col-sm-9">
              <p className="text-muted mb-0">{user.firstName}</p>
            </div>
          </div>
          <hr />
          <div className="row">
            <div className="col-sm-3">
              <p className="mb-0">Prénom</p>
            </div>
            <div className="col-sm-9">
              <p className="text-muted mb-0">{user.lastName}</p>
            </div>
          </div>
          <hr />
          <div className="row">
            <div className="col-sm-3">
              <p className="mb-0">Email</p>
            </div>
            <div className="col-sm-9">
              <p className="text-muted mb-0">{user.email}</p>
            </div>
          </div>
          <hr />
          <div className="row">
            <div className="col-sm-3">
              <p className="mb-0">Téléphone</p>
            </div>
            <div className="col-sm-9">
              <p className="text-muted mb-0">{user.phone}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AccountSettingsCard;
