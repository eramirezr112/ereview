import { useNavigate, Link } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../../context/AuthProvider";

const Home = () => {
  const { setAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  const logout = async () => {
    // if used in more components, this should be in context
    // axios to /logout endpoint
    setAuth({});
    navigate("/login");
  };

  return (
    <section className="homePage">
      <h1>Home</h1>
      <br />
      <p>You are logged in!</p>
      <br />
      <Link to="/example">Go to the Project Page</Link>
      <br />
    </section>
  );
};

export default Home;
