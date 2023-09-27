import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ProductList.css";
import { StarIcon } from "@heroicons/react/24/outline";
const ProductList = () => {
  const [searchTitle, setSearchTitle] = useState("");
  const [products, setProducts] = useState([]);
  const [searchedProducts, setSearchedProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const response = await axios.get(
          "https://dummyjson.com/products?limit=100"
        );
        if (Array.isArray(response.data.products)) {
          setProducts(response.data.products);
        }
      } catch (error) {
        console.error("Error loading products:", error);
      }
    };
    loadProducts();
  }, []);

  const handleSearch = () => {
    if (searchTitle.trim() === "") {
      setSearchedProducts(products);
    } else {
      const lowercaseSearchTitle = searchTitle.toLowerCase();
      const filteredProducts = products.filter((product) =>
        product.title.toLowerCase().includes(lowercaseSearchTitle)
      );
      setSearchedProducts(filteredProducts);
    }
    setIsModalOpen(true);
  };

  const handleInputChange = (e) => {
    setSearchTitle(e.target.value);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSearchTitle("");
    setSearchedProducts([]);
  };

  return (
    <div>
      <button
        onClick={handleSearch}
        className="bg-gray-900 mb-6 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
      >
        Search
      </button>
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <span className="close" onClick={closeModal}>
              &times;
            </span>
            <div className="modal-content">
              <div>
                <input
                  type="text"
                  autoFocus
                  placeholder="Search Product. . ."
                  className="rounded-md border-none mt-4 mx-4 outline-none ring-1 ring-gray"
                  value={searchTitle}
                  onChange={handleInputChange}
                />
                <button
                  onClick={handleSearch}
                  className="bg-gray-900 mb-6 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                >
                  Search
                </button>
              </div>
              <div>
                {searchedProducts.length > 0 ? (
                  <div className="cont">
                    {searchedProducts.map((product) => (
                      <div key={product.id}>
                        <div className="box">
                          <img src={product.thumbnail} alt="" />
                          <h5 className="mt-3 font-bold">{product.title}</h5>
                          <div className="flex justify-between items-center">
                            <p className="font-medium">{product.category}</p>
                            <div>
                              <del className="text-gray-400 font-bold">
                                {" "}
                                ${product.price}
                              </del>
                              <p className="font-bold text-gray-600">
                                $ {Math.ceil(product.price - 8.9).toFixed(2)}
                              </p>
                            </div>
                          </div>
                          <p className="flex">
                            <StarIcon className="w-6 h-6 text-yellow-500" />{" "}
                            {product.rating}{" "}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p>No products found.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductList;
