import React from "react";

export default function Alert({ alert, setAlert, alertMes }) {
  return (
    <div className="fixed z-50 ">
      <div className="w-full px-4 sm:w-96">
        <div className="flex w-full max-w-sm mx-auto mt-4 overflow-hidden bg-white rounded-lg shadow-md dark:bg-dark-900 dark:shadow-dark-md">
          <div className="flex items-center justify-center w-16 bg-green-500 border rounded-l-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6 text-white"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000
            16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1
            1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clip-rule="evenodd"
              />
            </svg>
          </div>
          <div className="flex justify-between w-full p-2 pl-4 border border-gray-100 dark:border-dark-700">
            <div className="flex flex-col justify-center mr-4">
              <div className="font-semibold">Success!</div>
              <div className="text-sm">{alertMes}</div>
            </div>
            <div>
              <button
                className="p-0.5 rounded-md bg-opacity-10 over:bg-opacity-25
            dark:text-dark-500 dark:bg-black dark:bg-opacity-20 dark:hover:text-dark-400
            dark:hover:bg-opacity-30"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414
                  0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414
                  10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293
                  4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1
                  1 0 010-1.414z"
                    clip-rule="evenodd"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
