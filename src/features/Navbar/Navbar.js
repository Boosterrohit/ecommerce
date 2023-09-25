import React from "react";
import { Disclosure, Menu } from "@headlessui/react";
import {
  Bars3Icon,
  ShoppingCartIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
const NavMenu = [
  { name: "Home", href: "/home", current: false },
  { name: "Team", href: "#", current: false },
];
const userNavigation = [
  { name: "Profile", href: "#" },
  { name: "Setting", href: "#" },
  { name: "Sign out", href: "#" },
];

const Navbar = ({ children }) => {
  return (
    <div>
      <div className="min-h-full">
        <Disclosure as="nav" className="bg-gray-500">
          {({ open }) => (
            <>
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <Link to="/home">
                        <h1 className="text-2xl text-white">ECOMMERCE...</h1>
                      </Link>
                    </div>
                    <div className="hidden md:block">
                      <div className="ml-10 flex items-baseline space-x-4">
                        {NavMenu.map((item) => (
                          <Link
                            key={item.name}
                            to={item.href}
                            className="text-white"
                          >
                            {item.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="hidden md:block">
                    <div className="ml-4 flex items-center md:ml-6">
                      <Link to="/cart">
                        <button
                          type="button"
                          className="relative rounded-full  p-1 text-white"
                        >
                          <span className="absolute -inset-1.5" />
                          <ShoppingCartIcon
                            className="h-6 w-6"
                            aria-hidden="true"
                          />
                        </button>
                      </Link>
                      <span className="rounded-lg mb-5 -ml-4 z-0 bg-red-500 px-1 text-xs font-bold text-white">
                        5
                      </span>

                      {/* For Profile Dorpdown */}
                      <Menu as="div" className="relative ml-3">
                        <div>
                          <Menu.Button className="relative flex max-w-xs items-center rounded-full">
                            <span className="absolute -inset-1.5" />
                            <img
                              className="h-8 w-8 rounded-full"
                              src="https://htmlweb-eosin.vercel.app/brand.jpeg"
                              alt=""
                            />
                          </Menu.Button>
                        </div>

                        <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                          {userNavigation.map((item) => (
                            <Menu.Item key={item.name}>
                              <Link
                                to="/"
                                className="block text-left px-3 py-2 hover:bg-blue-300"
                              >
                                {item.name}
                              </Link>
                            </Menu.Item>
                          ))}
                        </Menu.Items>
                      </Menu>
                    </div>
                  </div>
                  <div className="-mr-2 flex md:hidden">
                    {/* Mobile menu button */}
                    <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md text-black p-2">
                      <span className="absolute -inset-0.5" />
                      {open ? (
                        <XMarkIcon
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      ) : (
                        <Bars3Icon
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      )}
                    </Disclosure.Button>
                  </div>
                </div>
              </div>

              <Disclosure.Panel className="md:hidden">
                <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
                  {NavMenu.map((item) => (
                    <Link
                      className="block text-white font-bold"
                      key={item.name}
                      to={item.href}
                      aria-current={item.current ? "page" : undefined}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
                <div className=" pb-3 pt-4">
                  <div className="flex items-center px-5">
                    <div className="flex-shrink-0">
                      <img
                        className="h-10 w-10 rounded-full"
                        src="https://htmlweb-eosin.vercel.app/brand.jpeg"
                        alt=""
                      />
                    </div>
                    <div className="ml-3">
                      <div className="text-base font-medium leading-none text-white">
                        <p>Rohit Kumar Sah</p>
                      </div>
                      <div className="text-sm font-medium leading-none text-gray-400">
                        <p>rohit@ramailo.tech</p>
                      </div>
                    </div>
                    <Link
                      to="/cart"
                      className="relative ml-auto flex-shrink-0 rounded-full p-1"
                    >
                      <button
                        type="button"
                        className="relative ml-auto flex-shrink-0 rounded-full p-1"
                      >
                        <span className="absolute -inset-1.5" />
                        <ShoppingCartIcon
                          className="h-6 w-6 text-white"
                          aria-hidden="true"
                        />
                      </button>
                    </Link>
                    <span className="items-center rounded-lg mb-5 -ml-4 z-0 bg-red-700 px-1 text-xs font-medium text-white">
                      5
                    </span>
                  </div>
                  <div className="mt-3 space-y-1 px-2">
                    {userNavigation.map((item) => (
                      <Link
                        key={item.name}
                        to="/"
                        className="block rounded-md px-3 py-2 text-white font-bold"
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
        <div className="block md:hidden mt-4">
          <div className="flex items-center justify-between bg-white mx-16 rounded-md">
            <input type="text" className="border-none rounded-md w-96" />
            {/* <svg
              xmlns="http://www.w3.org/2000/svg"
              className="mx-2 w-6 h-6"
              fill="none"
              stroke="currentColor"
              // stroke-linecap="round"
              // stroke-linejoin="round"
              // stroke-width="2"
              viewBox="0 0 24 24"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg> */}
          </div>
        </div>
        <main>
          <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Navbar;
