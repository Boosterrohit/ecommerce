import React from "react";
import ProductList from "../features/Product-List/components/ProductList";
import Navbar from "../features/Navbar/Navbar";

const Home = () => {
  return (
    <div>
      <Navbar>
        <ProductList></ProductList>
      </Navbar>
    </div>
  );
};

export default Home;
