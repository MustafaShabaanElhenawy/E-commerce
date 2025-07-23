import { createBrowserRouter, RouterProvider } from "react-router";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Layout from "./components/Layout/Layout";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Brands from "./pages/Brands/Brands";
import Products from "./pages/Products/Products";
import Wishlist from "./pages/Wishlist/Wishlist";
import Cart from "./pages/Cart/Cart";
import Catrgories from "./pages/Catrgories/Catrgories";
import Register from "./pages/Register/Register";
import Payment from "./pages/Payment/Payment";
import Loading from "./pages/Loading/Loading";
import Header from "./components/Header/Header";
import ProductsDetails from "./pages/ProductDetails/ProductDetails";
import AuthProvider from "./Context/Auth.context";
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute";
import { WishlistProvider } from "./Context/wishlistcontext";
import CartProvider from "./Context/cartcontext";
import Reset from "./pages/Reset/Reset";
import Forget from "./pages/Forget/Forget";
import Verify from "./pages/Verify/Verify";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      {
        path: "wish list",
        element: (
          <ProtectedRoute>
            <Wishlist />
          </ProtectedRoute>
        ),
      },
      { path: "products", element: <Products /> },
      { path: "product/:id", element: <ProductsDetails /> },
      { path: "brands", element: <Brands /> },
      { path: "logout", element: <Login /> },
      { path: "catrgories", element: <Catrgories /> },
      {
        path: "cart",
        element: (
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        ),
      },

      { path: "forget", element: <Forget /> },
      { path: "verify", element: <Verify /> },
      { path: "reset", element: <Reset /> },
      {
        path: "payment",
        element: (
          <ProtectedRoute>
            <Payment />
          </ProtectedRoute>
        ),
      },
      { path: "loading", element: <Loading /> },
      { path: "Header", element: <Header /> },
    ],
  },
]);

function App() {
  return (
    <AuthProvider>
      <WishlistProvider>
        <CartProvider>
          <RouterProvider router={router} />
          <ToastContainer
            position="top-right"
            autoClose={3000}
            closeButton={false}
            closeOnClick={true}
          />
        </CartProvider>
      </WishlistProvider>
    </AuthProvider>
  );
}

export default App;
