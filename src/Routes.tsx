import { Routes as Router, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Register from "./pages/Register";
import Login from "./pages/Login";
import PersistLogin from "./components/PersistLogin";
import RequireAuth from "./components/RequireAuth";
import Home from "./pages/Home";
import Missing from "./pages/Missing";
import { FC } from "react";

const Routes: FC = () => {
  return (
    <Router>
      <Route path="/" element={<Layout />}>
        {/* public routes */}

        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        {/* protected routes */}
        <Route element={<PersistLogin />}>
          <Route element={<RequireAuth />}>
            <Route path="/" element={<Home />} />
          </Route>
        </Route>
        {/* not found */}
        <Route path="*" element={<Missing />} />
      </Route>
    </Router>
  );
};

export default Routes;
