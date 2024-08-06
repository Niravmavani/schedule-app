import Link from "next/link";
import React, { useEffect, useState } from "react";
import SideNav from "../sideNav/SideNav";

const Form = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [starttime, setStartTime] = useState("");
  const [endtime, setEndTime] = useState("");
  const [day, setDay] = useState("");
  const [fillData, setFillData] = useState([]);

  //refresh kri ne data add krvama aave tyare localstorage khali no thay
  useEffect(() => {
    const storedData = localStorage.getItem("data");
    if (storedData) {
      setFillData(JSON.parse(storedData));
    }
  }, []);

  const addData = (e) => {
    e.preventDefault();
    const data = {
      id: new Date().getTime().toString(),
      title: title,
      description: description,
      starttime: starttime,
      endtime: endtime,
      day: day,
    };
    const newFillData = [...fillData, data];
    setFillData(newFillData);
    localStorage.setItem("data", JSON.stringify(newFillData));
  };

  return (
    <div className="flex bg-gray-100 min-h-screen">
      <SideNav />
      <div className="md:ml-[199px] ml-20  p-5  w-full overflow-x-hidden ">
        <div className="bg-gray-200 h-full items-center flex justify-center">
          <div className="grid justify-center">
            <div className="bg-white border mt-5 rounded-md p-10 shadow-lg lg:w-[500px] md:w-[500px] sm:w-[500px] w-[300px] ">
              <form onSubmit={addData}>
                <label htmlFor="title" className="">
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  id="title"
                  placeholder="Enter Title"
                  className="w-full border border-slate-300 rounded-md py-2 px-4 mt-3 focus:outline-green-600 mb-3"
                  required
                  onChange={(e) => setTitle(e.target.value)}
                />
                <label htmlFor="description" className="">
                  Description
                </label>

                <textarea
                  name="description"
                  id="description"
                  rows="3"
                  className="w-full border border-slate-300 rounded-md py-2 px-4 mt-3 focus:outline-green-600 mb-3"
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>

                <label htmlFor="starttime" className="">
                  Start Time
                </label>
                <input
                  type="time"
                  name="starttime"
                  id="starttime"
                  placeholder="Enter Start Time"
                  className="w-full border border-slate-300 rounded-md py-2 px-4 mt-3 focus:outline-green-600 mb-3"
                  onChange={(e) => setStartTime(e.target.value)}
                />
                <label htmlFor="endtime" className="">
                  End Time
                </label>
                <input
                  type="time"
                  name="endtime"
                  id="endtime"
                  placeholder="Enter End Time"
                  className="w-full border border-slate-300 rounded-md py-2 px-4 mt-3 focus:outline-green-600 mb-3"
                  onChange={(e) => setEndTime(e.target.value)}
                />
                <label htmlFor="day" className="pr-4">
                  Day
                </label>
                <select
                  name=""
                  id=""
                  className="w-[140px] border border-slate-300 rounded-md py-2 px-4 mt-3 focus:outline-green-600 mb-3"
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
                {/* <Link href="/list"> */}
                <button
                  type="submit"
                  className="bg-green-500 cursor-pointer w-24 py-2 px-3 rounded-md text-white hover:bg-green-700 flex justify-center items-center"
                  //   disabled={loading}
                >
                  submit
                  {/* {loading ? <Miniloader color={"white"} /> : "verify"} */}
                </button>
                {/* </Link> */}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Form;
