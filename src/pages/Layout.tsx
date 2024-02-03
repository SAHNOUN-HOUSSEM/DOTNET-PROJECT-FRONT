import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <h1>Layout</h1>
      <main className="h-100">
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
