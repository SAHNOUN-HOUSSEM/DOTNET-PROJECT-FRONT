import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <main className="h-100">
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
