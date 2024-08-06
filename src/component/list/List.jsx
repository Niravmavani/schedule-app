import React, { useEffect, useState, useContext } from "react";
import { FaRegEdit } from "react-icons/fa";
import { BiShowAlt } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import SideNav from "@/component/sideNav/SideNav";
import { TimeContext } from "../../context/TimeProvider";
import { IoAddCircleOutline } from "react-icons/io5";

const List = () => {
  const {
    times,
    setTimes,
    addData,
    openModel,
    setOpenModel,
    confirmDelete,
    deleteModel,
    setDeleteModel,
    handleDelete,
    timeDetail,
    detailModel,
    setDetailModel,
    detail,
    clearAll,
    toEdit,
    editModel,
    setEditModel,
    editTime,
    editData,
    setEditTime,
  } = useContext(TimeContext);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [starttime, setStartTime] = useState("");
  const [endtime, setEndTime] = useState("");
  const [day, setDay] = useState("Sunday");

  useEffect(() => {
    const storedData = localStorage.getItem("data");
    if (storedData) {
      setTimes(JSON.parse(storedData));
    }
  }, [setTimes]);

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditTime((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="flex bg-gray-100 min-h-screen">
      <SideNav />
      <div className="md:ml-[199px] ml-20  p-5  w-full overflow-x-hidden">
        <div className="flex justify-center mt-4">
          <div className="rounded-md m-5 bg-white shadow-lg sm:p-5 p-3 w-full overflow-x-auto">
            <div className="flex buttongroup justify-between mb-5">
              <div>
                <button
                  className="border rounded-md p-2"
                  type="button"
                  onClick={clearAll}
                >
                  Clear All List
                </button>
              </div>
              <div className="relative max-w-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <IoAddCircleOutline />
                </div>
                <button
                  type="button"
                  onClick={() => setOpenModel(true)}
                  className="border rounded-md p-2 pl-10 w-full outline-green-600"
                >
                  Add
                </button>
              </div>
            </div>
            <table className="w-full rtl:text-right whitespace-nowrap">
              <thead className="bg-gray-200 text-gray-600 uppercase">
                <tr className="border-b border-t text-sm sm:text-sm md:text-md lg:text-md">
                  <th className="py-2 px-3 text-start">Title</th>
                  <th className="py-2 px-3">Description</th>
                  <th className="py-2 px-3">Start Time</th>
                  <th className="py-2 px-3">End Time</th>
                  <th className="py-2 px-3">Day</th>
                  <th className="py-2 px-3 text-end">Action</th>
                </tr>
              </thead>
              <tbody>
                {times.map((elem) => (
                  <tr
                    key={elem.id}
                    className="border-b last:border-0 hover:bg-gray-50 transition"
                  >
                    <td className="py-2 px-1 text-center">{elem.title}</td>
                    <td className="py-2 px-1 text-center">
                      {elem.description}
                    </td>
                    <td className="py-2 px-1 text-center">{elem.starttime}</td>
                    <td className="py-2 px-1 text-center">{elem.endtime}</td>
                    <td className="py-2 px-1 text-center">{elem.day}</td>
                    <td className="py-2 px-1">
                      <div className="flex justify-end gap-4 sm:gap-4 md:gap-7 lg:gap-7">
                        <BiShowAlt
                          className="h-6 w-6 text-purple-500"
                          cursor="pointer"
                          onClick={() => timeDetail(elem)}
                        />
                        <FaRegEdit
                          className="h-5 w-6 text-green-500"
                          onClick={() => toEdit(elem.id)}
                          cursor="pointer"
                        />
                        <MdDelete
                          className="h-5 w-6 text-red-500"
                          onClick={() => confirmDelete(elem.id)}
                          cursor="pointer"
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {openModel && (
        <div className="fixed overflow-y-auto inset-0 z-50 flex items-center justify-center">
          <div className="relative p-4 w-full max-w-md max-h-full">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Add New List
                </h3>
                <button
                  type="button"
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  onClick={() => setOpenModel(false)}
                >
                  <svg
                    className="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>
              <form
                className="p-4 md:p-5"
                onSubmit={(e) =>
                  addData(e, title, description, starttime, endtime, day)
                }
              >
                <div className="grid gap-4 mb-4 grid-cols-2">
                  <div className="col-span-2">
                    <label
                      htmlFor="title"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Title
                    </label>
                    <input
                      type="text"
                      name="title"
                      id="title"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="Enter Title"
                      onChange={(e) => setTitle(e.target.value)}
                      required
                    />
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <label
                      htmlFor="starttime"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Start Time
                    </label>
                    <input
                      type="text"
                      name="starttime"
                      id="starttime"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="00:00"
                      required
                      onChange={(e) => setStartTime(e.target.value)}
                    />
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <label
                      htmlFor="endtime"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      End Time
                    </label>
                    <input
                      type="text"
                      name="endtime"
                      id="endtime"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="00:00"
                      required
                      onChange={(e) => setEndTime(e.target.value)}
                    />
                  </div>
                  <div className="col-span-2">
                    <label
                      htmlFor="day"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Day
                    </label>
                    <select
                      id="day"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      onChange={(e) => setDay(e.target.value)}
                    >
                      <option value="Sunday">Sunday</option>
                      <option value="Monday">Monday</option>
                      <option value="Tuesday">Tuesday</option>
                      <option value="Wednesday">Wednesday</option>
                      <option value="Thursday">Thursday</option>
                      <option value="Friday">Friday</option>
                      <option value="Saturday">Saturday</option>
                    </select>
                  </div>
                  <div className="col-span-2">
                    <label
                      htmlFor="description"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Description
                    </label>
                    <textarea
                      id="description"
                      rows="4"
                      className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Write description here"
                      onChange={(e) => setDescription(e.target.value)}
                    ></textarea>
                  </div>
                </div>
                <button
                  type="submit"
                  className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* editmodel */}
      {editModel && (
        <div className="fixed overflow-y-auto inset-0 z-50 flex items-center justify-center">
          <div className="relative p-4 w-full max-w-md max-h-full">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Update List
                </h3>
                <button
                  type="button"
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  onClick={() => setEditModel(false)}
                >
                  <svg
                    className="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>
              <form
                className="p-4 md:p-5"
                onSubmit={(e) => editData(e, editTime.id)}
              >
                <div className="grid gap-4 mb-4 grid-cols-2">
                  <div className="col-span-2">
                    <label
                      htmlFor="title"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Title
                    </label>
                    <input
                      type="text"
                      name="title"
                      id="title"
                      value={editTime.title}
                      onChange={handleEditChange}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="Enter Title"
                      required
                    />
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <label
                      htmlFor="starttime"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Start Time
                    </label>
                    <input
                      type="text"
                      name="starttime"
                      id="starttime"
                      value={editTime.starttime}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      required
                      onChange={handleEditChange}
                    />
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <label
                      htmlFor="endtime"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      End Time
                    </label>
                    <input
                      type="text"
                      name="endtime"
                      id="endtime"
                      value={editTime.endtime}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      required
                      onChange={handleEditChange}
                    />
                  </div>
                  <div className="col-span-2">
                    <label
                      htmlFor="day"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Day
                    </label>
                    <select
                      id="day"
                      name="day"
                      value={editTime.day}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      onChange={handleEditChange}
                    >
                      <option value="Sunday">Sunday</option>
                      <option value="Monday">Monday</option>
                      <option value="Tuesday">Tuesday</option>
                      <option value="Wednesday">Wednesday</option>
                      <option value="Thursday">Thursday</option>
                      <option value="Friday">Friday</option>
                      <option value="Saturday">Saturday</option>
                    </select>
                  </div>
                  <div className="col-span-2">
                    <label
                      htmlFor="description"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Description
                    </label>
                    <textarea
                      name="description"
                      id="description"
                      rows="4"
                      value={editTime.description}
                      className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Write description here"
                      onChange={handleEditChange}
                    ></textarea>
                  </div>
                </div>
                <button
                  type="submit"
                  className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* delete model */}
      {deleteModel && (
        <div className="md:ml-[199px] ml-[75px] fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div
            data-aos="zoom-in-up"
            className="deletebox bg-white p-6 rounded-lg shadow-lg"
          >
            <h2 className="text-lg font-semibold mb-4">Confirm Delete</h2>
            <p>Are you sure you want to delete?</p>
            <div className="flex justify-end gap-4 mt-4">
              <button
                onClick={() => setDeleteModel(false)}
                className="bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600 transition duration-300"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                type="submit"
                className="bg-red-600 w-24 py-2 px-3 rounded-md text-white hover:bg-red-700 flex justify-center items-center"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
      {/* detailmodel */}
      {detailModel && (
        <div className="md:ml-[199px] ml-[75px] fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 ">
          <div className="deletebox bg-white p-6 rounded-lg shadow-lg">
            <button onClick={() => setDetailModel(false)}>X</button>
            <div>
              <h2 className="text-lg font-semibold mb-4">Detail</h2>
            </div>
            <p>Title: {detail.title}</p>
            <p>Description: {detail.description}</p>
            <p>Start Time: {detail.starttime}</p>
            <p>End Time: {detail.endtime}</p>
            <p>Day: {detail.day}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default List;
