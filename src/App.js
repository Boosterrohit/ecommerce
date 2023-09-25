import React from "react";
import "./App.css";
import LoginPage from "./Pages/LoginPage";
import Home from "./Pages/Home";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import CartPage from "./Pages/CartPage";
import CheckOut from "./Pages/CheckOut";
import ProductDetailPage from "./Pages/ProductDetailPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,
  },
  {
    path: "/home",
    element: <Home />,
  },

  {
    path: "/cart",
    element: <CartPage />,
  },
  {
    path: "/checkout",
    element: <CheckOut />,
  },
  {
    path: "/product-detail/:id",
    element: <ProductDetailPage />,
  },
]);
function App() {
  return (
    <div className="App">
      {/* <Home /> */}
      {/* <LoginPage /> */}
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
