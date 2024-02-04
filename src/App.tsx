import { Route, Routes } from "react-router-dom";
import Layout from "./pages/Layout";
import Register from "./pages/Register";
import Login from "./pages/Login";
import PersistLogin from "./components/PersistLogin";
import RequireAuth from "./components/RequireAuth";
import Home from "./pages/Home";
import Parametrescompte from "./pages/Parametrescompte";
import Missing from "./pages/Missing";

import "bootstrap/dist/js/bootstrap.bundle.min.js";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* public routes */}
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />

          {/* protected routes */}
          <Route element={<PersistLogin />}>
            <Route element={<RequireAuth />}>
              <Route path="/" element={<Home />} />
              <Route path="/admins" element={<Parametrescompte />} />
            </Route>
          </Route>

          {/* not found */}
          <Route path="*" element={<Missing />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
