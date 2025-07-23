import { faBars, faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/Auth.context";
import { useCart } from "../../Context/cartcontext";

export default function Navbar() {
  const { totalItems } = useCart();
  const { token, setToken } = useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  function togglemenu() {
    setIsMenuOpen(!isMenuOpen);
  }

  function handleLogout() {
    localStorage.removeItem("token");
    setToken(null);
    navigate("/login");
    setIsMenuOpen(false);
  }

  return (
    <>
      <nav className="bg-gray-100">
        <div className="container py-3 flex items-center justify-between">
          <h1 className="text-black text-[28px] font-medium">
            <Link to="/">
              <FontAwesomeIcon
                icon={faCartShopping}
                className="text-primary-600 text-3xl"
              />{" "}
              fresh cart
            </Link>
          </h1>

          {!token ? (
            <ul className="lg:flex hidden gap-5 text-gray-600 *:hover:text-black transition-colors duration-200">
              <li>
                <NavLink to={"Register"}>register</NavLink>
              </li>
              <li>
                <NavLink to={"Login"}>Login</NavLink>
              </li>
            </ul>
          ) : (
            <>
              <ul className="lg:flex hidden gap-5 text-gray-600 *:hover:text-black transition-colors duration-200">
                <li>
                  <NavLink to={"/"}>Home</NavLink>
                </li>
                <li>
                  <NavLink to={"Cart"}>cart</NavLink>
                </li>
                <li>
                  <NavLink to={"Wish list"}>wish list</NavLink>
                </li>
                <li>
                  <NavLink to={"Products"}>Products</NavLink>
                </li>
                <li>
                  <NavLink to={"Catrgories"}>catrgories</NavLink>
                </li>
                <li>
                  <NavLink to={"Brands"}>brands</NavLink>
                </li>
              </ul>

              <ul className="lg:flex hidden items-center justify-between gap-7 text-gray-600 *:hover:text-black transition-colors duration-200">
                <li className="relative">
                  <NavLink to={"Cart"}>
                    <span
                      className="
      absolute 
      top-0 
      right-0 
      -translate-y-1/2 
      translate-x-1/2
      bg-green-500
      text-white
      text-xs
      font-bold
      rounded-md
      px-1.5 py-0.5
      flex items-center justify-center
      min-w-[18px] h-[18px]
      z-10
    "
                    >
                      {totalItems}
                    </span>
                    <FontAwesomeIcon
                      icon={faCartShopping}
                      className="text-3xl"
                    />
                  </NavLink>
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="text-gray-600 hover:text-black transition-colors duration-200"
                  >
                    log out
                  </button>
                </li>
              </ul>
            </>
          )}

          <button className="lg:hidden md:ml-3" onClick={togglemenu}>
            <FontAwesomeIcon
              icon={faBars}
              className="text-3xl text-gray-500 border-1 border-gray-400 py-1 px-3 rounded-[7px]"
            />
          </button>
        </div>
      </nav>

      {isMenuOpen && (
        <nav className="lg:hidden">
          <div className="container">
            {!token ? (
              <ul className="flex-col space-y-3 text-gray-600 *:hover:text-black transition-colors duration-200">
                <li className="text-center">
                  <NavLink to={"Register"} onClick={() => setIsMenuOpen(false)}>
                    register
                  </NavLink>
                </li>
                <li className="text-center">
                  <NavLink to={"Login"} onClick={() => setIsMenuOpen(false)}>
                    Login
                  </NavLink>
                </li>
              </ul>
            ) : (
              <ul className="flex-col space-y-3 text-gray-600 *:hover:text-black transition-colors duration-200">
                <li>
                  <NavLink to={"/"} onClick={() => setIsMenuOpen(false)}>
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink to={"Cart"} onClick={() => setIsMenuOpen(false)}>
                    cart
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to={"Wish list"}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    wish list
                  </NavLink>
                </li>
                <li>
                  <NavLink to={"Products"} onClick={() => setIsMenuOpen(false)}>
                    Products
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to={"Catrgories"}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    catrgories
                  </NavLink>
                </li>
                <li>
                  <NavLink to={"Brands"} onClick={() => setIsMenuOpen(false)}>
                    brands
                  </NavLink>
                </li>
                <li className="text-center">
                  <NavLink
                    to={"Cart"}
                    className="relative inline-block "
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <span
                      className="
      absolute
      top-0
      right-0
      -translate-y-1/2
      translate-x-1/2
      bg-green-500
      text-white
      text-xs
      font-bold
      rounded-md
      px-2 py-0.5
      min-w-[18px] h-[18px]
      flex items-center justify-center
      z-10
    "
                    >
                      1
                    </span>
                    <FontAwesomeIcon
                      icon={faCartShopping}
                      className="text-3xl"
                    />
                  </NavLink>
                </li>

                <li className="text-center">
                  <button
                    onClick={handleLogout}
                    className="text-gray-600 hover:text-black transition-colors duration-200"
                  >
                    log out
                  </button>
                </li>
              </ul>
            )}
          </div>
        </nav>
      )}
    </>
  );
}
