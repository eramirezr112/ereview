import React, { useState } from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import AuthContext from "../../context/AuthProvider";
import TreeMenu from "../TreeMenu";
import Breadcrumbs from "../Breadcrumbs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Layout = () => {
  const { setAuth } = useContext(AuthContext);
  const [showContent, setShowContent] = useState(false);
  const navigate = useNavigate();
  const { auth } = useAuth();

  const logout = async () => {
    setAuth({});
    navigate("/login");
  };

  const nodes = [];

  return (
    <main className={auth.accessToken ? "MainContent" : "App"}>
      {auth.accessToken ? (
        <>
          <header tabIndex="0">
            <div className="flexGrow">
              <div>EReview</div>
              <button
                onClick={logout}
                style={{ border: "none", background: "none", color: "#fff" }}
              >
                <FontAwesomeIcon icon="fas fa-sign-out-alt" />
              </button>
            </div>
          </header>
          <div className="breadcrumbs-container">
            <Breadcrumbs />
          </div>
          <div className="content">
            <div className="column-left">
              <TreeMenu nodes={nodes} setShowContent={setShowContent} />
            </div>
            <div className="column-right">
              <Outlet />
            </div>
          </div>
        </>
      ) : (
        <Outlet />
      )}
    </main>
  );
};

export default Layout;
