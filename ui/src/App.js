import Login from "./pages/Login";
import Home from "./pages/Home";
import Project from "./pages/Project";
import AccordianReview from "./pages/AccordianReview";
import Layout from "./components/Layout";
import Unauthorized from "./components/Unauthorized";
import RequireAuth from "./components/RequireAuth";
import { Routes, Route } from "react-router-dom";

const ROLES = {
  User: 2001,
  Editor: 1984,
  Admin: 5150,
};

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* public routes */}
        <Route path="login" element={<Login />} />
        <Route path="unauthorized" element={<Unauthorized />} />

        {/* we want to protect these routes */}
        <Route element={<RequireAuth allowedRoles={[ROLES.User]} />}>
          <Route path="/" element={<Home />} />
          <Route path="/example" element={<Project />} />
          <Route path="/example/:id" element={<AccordianReview />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
