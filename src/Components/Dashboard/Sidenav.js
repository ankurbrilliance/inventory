import React from "react";
import { Link, useHistory, useRouteMatch } from "react-router-dom";
import "./dashboard.css";
const Sidenav = ({ match }) => {
  const { path } = useRouteMatch();
  console.log(path);
  const history = useHistory();
  const handleLogout = () => {
    /* eslint-disable */
    const toLogout = confirm("Are you sure to logout ?");

    if (toLogout) {
      localStorage.clear();
      history.push("/login");
      window.location.reload(false);
    }
  };
  return (
    <>
      <div className="sidenav">
        <img
          className="profile_img"
          src={
            "https://www.pngall.com/wp-content/uploads/5/Profile-Male-PNG.png"
          }
          alt="profile"
        />

        <Link className="nav_link d-block" to={`${match}`}>
          <i class="fas fa-home"></i>
        </Link>
        <Link className="nav_link" to={`${match}/listOrder`}>
          <i class="fab fa-opencart"></i>
        </Link>
        <Link className="nav_link" to={`${match}/addUser`}>
          <i class="fas fa-user-plus"></i>
        </Link>
        <Link className="nav_link" to={`${match}/stocks`}>
          <i class="fas fa-cubes"></i>
        </Link>
        <Link className="nav_link" to={`${match}/purchase`}>
          <i class="fas fa-cart-arrow-down"></i>
        </Link>
        <Link className="nav_link" to={`${match}/billing`}>
          <i class="fas fa-file-invoice"></i>
        </Link>
        <Link className="nav_link">
          <button
            onClick={handleLogout}
            style={{
              backgroundColor: "transparent",
              border: "none",
              color: "white",
            }}
          >
            <i class="fas fa-sign-out-alt"></i>
          </button>
        </Link>
      </div>
    </>
  );
};

export default Sidenav;
