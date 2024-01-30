export default function AccountSettingsCard({ admin }) {
  return (
    <div className="row d-flex align-items-center">
      <div className="card mb-4">
        <div className="card-body">
          <div className="row">
            <div className="col-sm-3">
              <p className="mb-0">Nom</p>
            </div>
            <div className="col-sm-9">
              <p className="text-muted mb-0">{admin.firstName}</p>
            </div>
          </div>
          <hr />
          <div className="row">
            <div className="col-sm-3">
              <p className="mb-0">Prénom</p>
            </div>
            <div className="col-sm-9">
              <p className="text-muted mb-0">{admin.lastName}</p>
            </div>
          </div>
          <hr />
          <div className="row">
            <div className="col-sm-3">
              <p className="mb-0">Email</p>
            </div>
            <div className="col-sm-9">
              <p className="text-muted mb-0">{admin.email}</p>
            </div>
          </div>
          <hr />
          <div className="row">
            <div className="col-sm-3">
              <p className="mb-0">Téléphone</p>
            </div>
            <div className="col-sm-9">
              <p className="text-muted mb-0">{admin.phone}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
