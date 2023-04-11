"use client";

import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useRouter } from "next/router";

export default function EditButton({ post_id, post, category }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const cancelButtonRef = useRef(null);
  const [id, setId] = useState(post_id);
  const [value, setValue] = useState({
    title: post.title,
    imageUrl: post.imageUrl,
    excerpt: post.excerpt,
    content: post.content,
    author: post.author,
    featured: post.featured,
    category_name: post.category_name,
    post_id: id,
  });

  const postData = async () => {
    const res = await fetch("http://localhost:3000/api/post", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(value),
    });
    const postData = await res.json();
    return postData;
  };
  const deleteData = async () => {
    try {
      const res = await fetch(`http://localhost:3000/api/post/${post_id}`, {
        method: "DELETE",
      });
      const removeData = await res.json();
      router.push("/");
      return removeData;
    } catch (err) {
      console.error(err);
      return [];
    }
  };

  const handleDelete = (e) => {
    e.preventDefault(), deleteData();
    router.push("/");
  };
  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className="absolute px-1 text-sm text-white uppercase bg-[#1B252F] rounded-sm left-1 top-1"
      >
        Edit
      </button>
      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          initialFocus={cancelButtonRef}
          onClose={setOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex items-end justify-center min-h-full p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative overflow-hidden text-left transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:w-full sm:max-w-lg">
                  <div className="px-4 pt-5 pb-4 bg-white sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                      <div className="flex items-center justify-center flex-shrink-0 w-12 h-12 mx-auto bg-red-100 rounded-full sm:mx-0 sm:h-10 sm:w-10"></div>
                      <div className="w-full mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                        <Dialog.Title
                          as="h3"
                          className="text-base font-semibold leading-6 text-gray-900"
                        >
                          Deactivate account
                        </Dialog.Title>
                        <form className="max-w-3/4">
                          <div className="relative w-full mt-3 border">
                            <label className="absolute   top-[-10px] bg-white text-sm font-semibold left-2">
                              Title
                            </label>
                            <input
                              name="title"
                              value={value.title}
                              onChange={(e) =>
                                setValue({ ...value, title: e.target.value })
                              }
                              type="text"
                              className="w-full px-3 py-1 duration-300 outline-none focus:ring-sky-500 focus:ring-2"
                            />
                          </div>
                          <div className="relative w-full mt-3 border">
                            <label className="absolute top-[-10px] bg-white text-sm font-semibold left-2">
                              Image
                            </label>
                            <input
                              name="imageUrl"
                              value={value.imageUrl}
                              onChange={(e) =>
                                setValue({ ...value, imageUrl: e.target.value })
                              }
                              type="text"
                              className="w-full px-3 py-1 duration-300 outline-none focus:ring-sky-500 focus:ring-2"
                            />
                          </div>
                          <div className="relative w-full mt-3 border">
                            <label className="absolute top-[-10px] bg-white text-sm font-semibold left-2">
                              Description
                            </label>
                            <textarea
                              name="excerpt"
                              value={value.excerpt}
                              onChange={(e) =>
                                setValue({ ...value, excerpt: e.target.value })
                              }
                              type="text"
                              className="w-full px-3 py-1 duration-300 outline-none focus:ring-sky-500 focus:ring-2"
                            />
                          </div>
                          <div className="relative w-full mt-3 border">
                            <label className="absolute top-[-10px] bg-white text-sm font-semibold left-2">
                              Content
                            </label>
                            <textarea
                              name="content"
                              value={value.content}
                              onChange={(e) =>
                                setValue({ ...value, content: e.target.value })
                              }
                              type="text"
                              className="w-full px-3 py-1 duration-300 outline-none focus:ring-sky-500 focus:ring-2"
                            />
                          </div>
                          <div className="relative w-full mt-3 border">
                            <label className="absolute top-[-10px] bg-white text-sm font-semibold left-2 ">
                              Author
                            </label>
                            <input
                              name="author"
                              value={value.author}
                              onChange={(e) =>
                                setValue({ ...value, author: e.target.value })
                              }
                              type="text"
                              className="w-full px-3 py-1 duration-300 outline-none focus:ring-sky-500 focus:ring-2"
                            />
                          </div>
                          <div className="flex w-full gap-2 my-2">
                            <label
                              htmlFor=""
                              className="text-sm font-semibold bg-white "
                            >
                              Featured
                            </label>
                            <input
                              name="featured"
                              checked={value.featured}
                              onChange={(e) =>
                                setValue({
                                  ...value,
                                  featured: e.target.checked ? 1 : 0,
                                })
                              }
                              type="checkbox"
                              className="px-3 py-1 outline-none "
                            />
                          </div>
                          <div className="relative p-1 mt-3 border">
                            <label className="absolute top-[-10px] bg-white text-sm font-semibold left-2 ">
                              Category
                            </label>
                            <select
                              onChange={(e) =>
                                setValue({
                                  ...value,
                                  category_name: e.target.value,
                                })
                              }
                              name="category_name"
                              value={value.category_name}
                              className="w-full p-1 font-semibold "
                            >
                              {Array.isArray(category) &&
                                category.map((cat) => (
                                  <option
                                    key={cat.cat_id}
                                    className="focus:ring-sky-500 focus:ring-2"
                                    value={cat.category_name}
                                  >
                                    {cat.category_name}
                                  </option>
                                ))}
                            </select>
                          </div>
                          <div className="flex justify-end gap-2 mt-3">
                            <button
                              type="button"
                              className="inline-flex justify-center w-full px-3 py-2 mt-3 text-sm font-semibold text-white bg-red-500 border-2 rounded-md shadow-sm ring-1 ring-inset sm:mt-0 sm:w-auto hover:border-red-500 hover:bg-transparent drop-shadow hover:text-red-500"
                              onClick={() => setOpen(false)}
                              ref={cancelButtonRef}
                            >
                              Cancel
                            </button>
                            <button
                              type="submit"
                              onClick={postData}
                              className="inline-flex justify-center w-full px-3 py-2 mt-3 text-sm font-semibold text-white border-2 rounded-md shadow-sm bg-sky-500 ring-1 hover:border-sky-500 hover:bg-transparent hover:text-sky-500 ring-inset drop-shadow sm:mt-0 sm:w-auto"
                            >
                              Update
                            </button>
                            <button
                              type="button"
                              onClick={handleDelete}
                              className="inline-flex justify-center w-full px-3 py-2 mt-3 text-sm font-semibold text-white bg-orange-500 border-2 rounded-md shadow-sm ring-1 hover:border-orange-500 hover:bg-transparent hover:text-orange-500 ring-inset drop-shadow sm:mt-0 sm:w-auto"
                            >
                              Delete
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
}
