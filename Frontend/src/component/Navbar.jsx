import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const navigate = useNavigate();

  const logoutUser = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <img
            src="/images/logo.jpg"
            alt="Shop Logo"
            className="w-12 h-12 rounded-full border-2 border-blue-500 object-cover"
          />
          <span className="text-2xl font-bold text-blue-600">MyShop</span>
        </Link>

        <ul className="flex items-center gap-8 font-medium text-gray-700">
          <li>
            <Link to="/shop">Shop</Link>
          </li>

          <li>
            <Link to="/cart">Cart ({cartItems?.length || 0})</Link>
          </li>

          {user ? (
            <>
              <li>
                <Link to="/profile">Hi, {user.name}</Link>
              </li>

              {user.role === "admin" && (
                <li>
                  <Link to="/admin">Admin</Link>
                </li>
              )}

              <li>
                <button
                  onClick={logoutUser}
                  className="bg-red-600 text-white px-4 py-2 rounded-lg"
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <li>
              <Link
                to="/login"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg"
              >
                Login
              </Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}
