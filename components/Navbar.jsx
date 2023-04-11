"use client";
import { useRouter } from "next/router";
import { Fragment, useState } from "react";
import { Dialog, Transition, Popover } from "@headlessui/react";

import {
  AiOutlineSearch,
  AiOutlineMenu,
  AiOutlineClose,
  AiOutlineUser,
} from "react-icons/ai";
import FormModal from "./FormModal";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./../firebase/firebase";
import { signOut } from "firebase/auth";
import Alert from "./Alert";

export default function Navbar() {
  const [user, setUser] = useAuthState(auth);
  const [opening, setOpening] = useState(false);
  const [search, setSearch] = useState(false);
  console.log(search);
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [alert, setAlert] = useState(false);
  const [alertMes, setAlertMes] = useState("");

  const handleCreate = () => {
    if (user) {
      setOpening(!opening);
    } else {
      router.push("/auth/login");
    }
  };
  const logout = async () => {
    await signOut(auth);
    setAlertMes("Logged Out");
    setAlert(!alert);
  };
  return (
    <div className="w-full h-[50px] min-h-[60px]">
      <div className="container flex items-center justify-between h-full m-auto border-b-2 border-black">
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => router.push("/")}
        >
          <h1 className="text-3xl font-bold">CodingBlogs</h1>
          <div className="flex flex-col justify-center text-xs font-bold">
            <span>The Blog</span> <span>of CODINGSTRADE</span>
          </div>
        </div>
        <div className="items-center hidden gap-2 lg:flex">
          <div className="flex items-center gap-2">
            {!user && (
              <button
                onClick={() => router.push("/auth/login")}
                className="py-1 px-3  bg-[#1B252F] text-sm font-bold text-[#F9F5EB] rounded-sm hover:scale-90 duration-300"
              >
                Sign Up
              </button>
            )}
            <button
              onClick={handleCreate}
              className="py-1 px-3 hover:scale-90 duration-300 text-sm font-bold text-[#1B252F]  border-2  border-[#1B252F] rounded-sm"
            >
              Create
            </button>
            {user && (
              <Popover className="relative ">
                <Popover.Button className="flex items-center justify-center text-sm font-semibold leading-6 text-gray-900 outline-none gap-x-1">
                  <span className="text-xl border-2 border-black rounded-full outline-none">
                    <AiOutlineUser />
                  </span>
                </Popover.Button>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-200"
                  enterFrom="opacity-0 translate-y-1"
                  enterTo="opacity-100 translate-y-0"
                  leave="transition ease-in duration-150"
                  leaveFrom="opacity-100 translate-y-0"
                  leaveTo="opacity-0 translate-y-1"
                >
                  <Popover.Panel className="absolute z-10 flex w-screen px-4 mt-5 -translate-x-1/2 left-1/2 max-w-max">
                    <div className="flex-auto w-[100px] max-w-md overflow-hidden text-sm leading-6 bg-white shadow-lg rounded-sm ring-1 ring-gray-900/5">
                      <div className="flex flex-col items-center justify-center gap-2 p-1 font-semibold">
                        <p className="w-full text-center duration-300 cursor-pointer hover:bg-gray-300">
                          Profile
                        </p>
                        <p className="w-full text-center duration-300 cursor-pointer hover:bg-gray-300">
                          Settings
                        </p>
                        <p
                          onClick={logout}
                          className="w-full text-center duration-300 cursor-pointer hover:bg-gray-300"
                        >
                          Logout
                        </p>
                      </div>
                    </div>
                  </Popover.Panel>
                </Transition>
              </Popover>
            )}
          </div>
          <div className="flex items-center gap-1 text-2xl">
            <input
              type="text"
              placeholder="Search"
              className={`${
                search ? "w-52 border-2 p-2" : "w-0"
              }  font-semibold text-sm border-black/50 rounded-md duration-300 ease-in outline-none`}
            />
            <AiOutlineSearch onClick={() => setSearch(!search)} />
          </div>
        </div>
        <div className="text-xl font-bold cursor-pointer lg:hidden">
          <AiOutlineMenu onClick={() => setOpen(true)} />
          <Transition.Root show={open} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={setOpen}>
              <Transition.Child
                as={Fragment}
                enter="ease-in-out duration-500"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in-out duration-500"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" />
              </Transition.Child>

              <div className="fixed inset-0 overflow-hidden">
                <div className="absolute inset-0 overflow-hidden">
                  <div className="fixed inset-y-0 right-0 flex max-w-full pl-10 pointer-events-none">
                    <Transition.Child
                      as={Fragment}
                      enter="transform transition ease-in-out duration-500 sm:duration-700"
                      enterFrom="translate-x-full"
                      enterTo="translate-x-0"
                      leave="transform transition ease-in-out duration-500 sm:duration-700"
                      leaveFrom="translate-x-0"
                      leaveTo="translate-x-full"
                    >
                      <Dialog.Panel className="relative w-screen max-w-md pointer-events-auto">
                        <Transition.Child
                          as={Fragment}
                          enter="ease-in-out duration-500"
                          enterFrom="opacity-0"
                          enterTo="opacity-100"
                          leave="ease-in-out duration-500"
                          leaveFrom="opacity-100"
                          leaveTo="opacity-0"
                        >
                          <div className="absolute top-0 left-0 flex pt-4 pr-2 -ml-8 sm:-ml-10 sm:pr-4">
                            <button
                              type="button"
                              className="text-gray-300 rounded-md hover:bg-red-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                              onClick={() => setOpen(false)}
                            >
                              <AiOutlineClose />
                              <span className="sr-only">Close panel</span>
                            </button>
                          </div>
                        </Transition.Child>
                        <div className="flex flex-col h-full py-6 overflow-y-scroll bg-white shadow-xl">
                          <div className="px-4 sm:px-6">
                            <Dialog.Title className="text-base font-semibold leading-6 text-gray-900">
                              Panel title
                            </Dialog.Title>
                          </div>
                          <div className="relative flex-1 px-4 mt-6 sm:px-6">
                            <div className="flex flex-col min-w-[300px] items-center gap-2">
                              <div className="flex items-center w-full text-2xl">
                                <input
                                  type="text"
                                  placeholder="Search"
                                  onChange={(e) => setSearch(e.target.value)}
                                  className="w-full px-5 py-2 text-sm font-semibold border-2 rounded-1"
                                />
                                <AiOutlineSearch />
                              </div>
                              <div className="flex flex-col w-full gap-2 mt-10">
                                {!user ? (
                                  <button
                                    onClick={() => router.push("/auth/login")}
                                    className="p-1 text-lg font-bold text-red-500 border-2 border-red-500 rounded-sm h-14 "
                                  >
                                    Sign Up
                                  </button>
                                ) : (
                                  <button
                                    onClick={logout}
                                    className="p-1 text-lg font-bold text-red-500 border-2 border-red-500 rounded-sm h-14 "
                                  >
                                    Logout
                                  </button>
                                )}
                                <button
                                  onClick={handleCreate}
                                  className="p-1 text-lg font-bold text-green-500 border-2 border-green-500 rounded-sm h-14"
                                >
                                  Create
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Dialog.Panel>
                    </Transition.Child>
                  </div>
                </div>
              </div>
            </Dialog>
          </Transition.Root>
          <FormModal open={opening} setOpen={setOpening} />
        </div>
      </div>
      {alert && (
        <span className="flex items-center justify-center">
          <Alert allertMes={alertMes} alert={alert} setAlert={setAlert} />
        </span>
      )}
    </div>
  );
}
