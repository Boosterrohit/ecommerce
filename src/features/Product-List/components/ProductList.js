import React, { useState, Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Search from "../../../Pages/Search";
import {
  fetchBrandsAsync,
  fetchCategoriesAsync,
  fetchProductsByFiltersAsync,
  selectAllProducts,
  selectBrands,
  selectCategories,
  selectTotalItems,
} from "../ProductListSlice";
import { Dialog, Disclosure, Menu, Transition } from "@headlessui/react";
import { StarIcon, XMarkIcon } from "@heroicons/react/24/outline";
import {
  ChevronDownIcon,
  FunnelIcon,
  MinusIcon,
  PlusIcon,
} from "@heroicons/react/20/solid";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import { Link } from "react-router-dom";
import { ITMES_PER_PAGE } from "../../../app/constant";
const sortOptions = [
  { name: "Best Rating", sort: "rating", order: "desc", current: false },
  { name: "Price: Low to High", sort: "price", order: "asc", current: false },
  { name: "Price: High to Low", sort: "price", order: "desc", current: false },
];
export default function ProductList() {
  const dispatch = useDispatch();
  const products = useSelector(selectAllProducts);
  const brands = useSelector(selectBrands);
  const categories = useSelector(selectCategories);
  const totalItems = useSelector(selectTotalItems);
  const filters = [
    {
      id: "category",
      name: "Category",
      options: categories,
    },
    {
      id: "brand",
      name: "Brand",
      options: brands,
    },
  ];
  const [filter, setFilter] = useState({});
  const [sort, setSort] = useState({});
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [searchCategory, setSearchCategory] = useState(""); // Add search category state
  const handleFilter = (e, section, option) => {
    const newFilter = { ...filter };
    if (e.target.checked) {
      if (newFilter[section.id]) {
        newFilter[section.id].push(option.value);
      } else {
        newFilter[section.id] = [option.value];
      }
    } else {
      const index = newFilter[section.id].findIndex(
        (el) => el === option.value
      );
      newFilter[section.id].splice(index, 1);
    }

    setFilter(newFilter);
  };

  const handleSort = (e, option) => {
    const sort = { _sort: option.sort, _order: option.order };
    setSort(sort);
  };

  const handlePage = (page) => {
    setPage(page);
  };

  useEffect(() => {
    const pagination = { _page: page, _limit: ITMES_PER_PAGE };
    dispatch(
      fetchProductsByFiltersAsync({
        filter: { ...filter },
        sort,
        pagination,
      })
    );
  }, [dispatch, filter, sort, page]);

  useEffect(() => {
    setPage(1);
  }, [totalItems, sort]);

  useEffect(() => {
    dispatch(fetchBrandsAsync());
    dispatch(fetchCategoriesAsync());
  }, [dispatch]);

  return (
    <div>
      <div>
        <div className="bg-gray-500 rounded-md mt-7">
          <div>
            <MobileFilter
              handleFilter={handleFilter}
              mobileFiltersOpen={mobileFiltersOpen}
              setMobileFiltersOpen={setMobileFiltersOpen}
              filters={filters}
            ></MobileFilter>
            <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between pb-6 pt-24">
                <h1 className="font-bold text-white text-1xl md:text-4xl">
                  ALL PRODUCTS
                </h1>

                <div className="flex items-center">
                  <Menu as="div" className="relative inline-block text-left">
                    <div>
                      <Menu.Button className=" inline-flex justify-center text-sm items-center">
                        <p className="text-lg font-bold text-white">Filter</p>
                        <ChevronDownIcon
                          className="-mr-1 ml-1 h-7 w-7 mt-1 font-bold text-white"
                          aria-hidden="true"
                        />
                      </Menu.Button>
                    </div>

                    <Menu.Items className="absolute right-0 z-10 mt-2 w-40 rounded-md bg-white shadow-2xl">
                      <div className="py-1">
                        {sortOptions.map((option) => (
                          <Menu.Item key={option.name}>
                            <p
                              onClick={(e) => handleSort(e, option)}
                              className="px-4 py-2 hover:bg-blue-300 block"
                            >
                              {option.name}
                            </p>
                          </Menu.Item>
                        ))}
                      </div>
                    </Menu.Items>
                  </Menu>
                  {/* mobile filter option accordding to categories, title, brand  */}
                  <button
                    type="button"
                    className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                    onClick={() => setMobileFiltersOpen(true)}
                  >
                    <span className="sr-only">Filters</span>
                    <FunnelIcon className="h-5 w-5" aria-hidden="true" />
                  </button>
                </div>
              </div>

              <section
                aria-labelledby="products-heading"
                className="pb-24 pt-6"
              >
                <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
                  <DesktopFilter
                    handleFilter={handleFilter}
                    filters={filters}
                  ></DesktopFilter>

                  <div className="lg:col-span-3">
                    <div className="relative">
                      <div className="flex items-center mt-4">
                        <Search />
                      </div>
                    </div>
                    <ProductGrid
                      products={products}
                      searchCategory={searchCategory}
                      setSearchCategory={setSearchCategory}
                    ></ProductGrid>
                  </div>
                </div>
              </section>

              <Pagination
                page={page}
                setPage={setPage}
                handlePage={handlePage}
                totalItems={totalItems}
              ></Pagination>
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}

// ... (rest of the code remains the same)

const MobileFilter = ({
  mobileFiltersOpen,
  setMobileFiltersOpen,
  handleFilter,
  filters,
}) => {
  return (
    <div>
      <Transition.Root show={mobileFiltersOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-40 lg:hidden"
          onClose={setMobileFiltersOpen}
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />

          <div className="fixed inset-0 z-40 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full"
            >
              <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
                <div className="flex items-center justify-between px-4">
                  <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                  <button
                    type="button"
                    className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                    onClick={() => setMobileFiltersOpen(false)}
                  >
                    <span className="sr-only">Close menu</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>

                {/* Filters */}
                <form className="mt-4 border-t border-gray-200">
                  {filters.map((section) => (
                    <Disclosure
                      as="div"
                      key={section.id}
                      className="border-t border-gray-200 px-4 py-6"
                    >
                      {({ open }) => (
                        <>
                          <h3 className="-mx-2 -my-3 flow-root">
                            <Disclosure.Button className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                              <span className="font-medium text-gray-900">
                                {section.name}
                              </span>
                              <span className="ml-6 flex items-center">
                                {open ? (
                                  <MinusIcon
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                  />
                                ) : (
                                  <PlusIcon
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                  />
                                )}
                              </span>
                            </Disclosure.Button>
                          </h3>
                          <Disclosure.Panel className="pt-6">
                            <div className="space-y-6">
                              {section.options.map((option, optionIdx) => (
                                <div
                                  key={option.value}
                                  className="flex items-center"
                                >
                                  <input
                                    id={`filter-mobile-${section.id}-${optionIdx}`}
                                    name={`${section.id}[]`}
                                    defaultValue={option.value}
                                    type="checkbox"
                                    defaultChecked={option.checked}
                                    onChange={(e) =>
                                      handleFilter(e, section, option)
                                    }
                                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                  />
                                  <label
                                    htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                    className="ml-3 min-w-0 flex-1 text-gray-500"
                                  >
                                    {option.label}
                                  </label>
                                </div>
                              ))}
                            </div>
                          </Disclosure.Panel>
                        </>
                      )}
                    </Disclosure>
                  ))}
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
    </div>
  );
};
const DesktopFilter = ({ handleFilter, filters }) => {
  return (
    <div>
      <form className="hidden lg:block">
        {filters.map((section) => (
          <Disclosure
            as="div"
            key={section.id}
            className="border-b border-gray-200 py-6"
          >
            {({ open }) => (
              <>
                <h3 className="-my-3 flow-root">
                  <Disclosure.Button className="flex w-full items-center justify-between bg-white rounded-md  py-3 px-3 text-sm">
                    <span className="font-medium ">{section.name}</span>
                    <span className="ml-6 flex items-center">
                      {open ? (
                        <MinusIcon className="h-5 w-5" aria-hidden="true" />
                      ) : (
                        <PlusIcon className="h-5 w-5" aria-hidden="true" />
                      )}
                    </span>
                  </Disclosure.Button>
                </h3>
                <Disclosure.Panel className="pt-6">
                  <div className="space-y-4">
                    {section.options.map((option, optionIdx) => (
                      <div
                        key={option.value}
                        className="flex items-center hover:bg-blue-300 py-2"
                      >
                        <input
                          id={`filter-${section.id}-${optionIdx}`}
                          name={`${section.id}[]`}
                          defaultValue={option.value}
                          type="checkbox"
                          onChange={(e) => handleFilter(e, section, option)}
                          defaultChecked={option.checked}
                          className="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-600"
                        />
                        <label
                          htmlFor={`filter-${section.id}-${optionIdx}`}
                          className="ml-3 text-sm text-white font-bold"
                        >
                          {option.label}
                        </label>
                      </div>
                    ))}
                  </div>
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
        ))}
      </form>
    </div>
  );
};
const Pagination = ({ page, setPage, handlePage, totalItems }) => {
  const totalPages = Math.ceil(totalItems / ITMES_PER_PAGE);
  return (
    <div className="flex items-center justify-between rounded-md border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
      <div className="flex flex-1 justify-between sm:hidden">
        <div
          onClick={(e) => handlePage(page > 1 ? page - 1 : page)}
          className="relative  items-center rounded-md border border-gray-300 bg-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Previous
        </div>
        <div
          onClick={(e) => handlePage(page < totalPages ? page + 1 : page)}
          className="relative ml-3  items-center rounded-md border border-gray-300 bg-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Next
        </div>
      </div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Showing{" "}
            <span className="font-medium">
              {(page - 1) * ITMES_PER_PAGE + 1}
            </span>{" "}
            to{" "}
            <span className="font-medium">
              {page * ITMES_PER_PAGE > totalItems
                ? totalItems
                : page * ITMES_PER_PAGE > totalItems}
            </span>{" "}
            of <span className="font-medium">{totalItems}</span> results
          </p>
        </div>
        <div>
          <nav
            className="inline-flex  rounded-md shadow-sm"
            aria-label="Pagination"
          >
            <div
              onClick={(e) => handlePage(page > 1 ? page - 1 : page)}
              className="relative items-center rounded-l-md px-2 py-2 ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
            >
              <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
            </div>
            {/* Current: "z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600", Default: "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0" */}
            {Array.from({ length: totalPages }).map((el, index) => (
              <div
                key={index}
                onClick={(e) => handlePage(index + 1)}
                aria-current="page"
                className={`relative cursor-pointer z-10  items-center px-4 py-2 text-sm font-semibold ${
                  index + 1 === page
                    ? "bg-green-500 text-white"
                    : "text-gray-400"
                } text-black ring-1 ring-inset ring-gray-300`}
              >
                {index + 1}
              </div>
            ))}

            <div
              onClick={(e) => handlePage(page < totalPages ? page + 1 : page)}
              className="relative  inline-flex items-center rounded-r-md px-2 py-2 text-black ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
            >
              <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
};
const ProductGrid = ({ products, searchCategory }) => {
  const filteredProducts = searchCategory
    ? products.filter((product) =>
        product.category.toLowerCase().includes(searchCategory.toLowerCase())
      )
    : products;

  return (
    <div>
      <div className="bg-white rounded-lg">
        <div className="mx-auto max-w-2xl px-4 py-0 sm:px-0 sm:py-3 lg:max-w-7xl lg:px-8">
          <div className="mt-0 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
            {filteredProducts.map((product) => (
              <Link key={product.id} to={`/product-detail/${product.id}`}>
                <div className="group relative bg-white rounded-lg p-4 shadow-lg hover:shadow-lg transition-transform transform hover:-translate-y-1">
                  <div className="min-h-60 aspect-h-1 aspect-w-1 w-full overflow-hidden bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-60">
                    <img
                      src={product.thumbnail}
                      alt={product.title}
                      className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                    />
                  </div>
                  <div className="mt-4 flex justify-between">
                    <div>
                      <h3 className="text-sm text-gray-700">
                        <div>
                          <Link to={product.thumbnail}>
                            <span
                              aria-hidden="true"
                              className="absolute inset-0"
                            />
                            {product.title}
                          </Link>
                        </div>
                        <p>{product.category}</p>
                      </h3>
                      <p className="mt-1 text-sm text-gray-500 flex items-center font-bold">
                        <StarIcon className="w-6 h-6 text-yellow-500" />{" "}
                        {product.rating}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        $
                        {Math.round(
                          product.price * (1 - product.discountPercentage / 100)
                        )}
                      </p>
                      <p className="text-sm font-medium text-gray-400 line-through">
                        ${product.price}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
