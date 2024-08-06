import React, { useContext, useEffect } from "react";
import SideNav from "@/component/sideNav/SideNav";
import { TimeContext } from "../../context/TimeProvider";

const Celender = () => {
  const { times, setTimes } = useContext(TimeContext);

  useEffect(() => {
    const storedData = localStorage.getItem("data");
    if (storedData) {
      setTimes(JSON.parse(storedData));
    }
  }, [setTimes]);

  const dayArray = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  function minutesDiff(starttime, endtime) {
    var differenceValue =
      new Date(`1970-01-01T${endtime}`).getTime() -
      new Date(`1970-01-01T${starttime}`).getTime();
    return Math.floor(differenceValue / 60000);
  }

  function marginFromStartTime(starttime) {
    const defaultStartTime = new Date("1970-01-01T08:00").getTime();
    const startTime = new Date(`1970-01-01T${starttime}`).getTime();
    const difference = startTime - defaultStartTime;
    return Math.floor(difference / 60000);
  }

  return (
    <div className="flex  min-h-screen ">
      <SideNav />
      <div className="md:ml-[199px] ml-20 p-5 w-full overflow-x-auto">
        <div>
          <div className="flex gap-9">
            <div className="w-[50px] flex flex-col  mt-13">
              <div className="h-[60px]">
                8-9
                <div className="w-[1100px]">
                  <hr />
                </div>
              </div>

              <div className="h-[60px]">
                9-10
                <div className="w-[1100px]">
                  <hr />
                </div>
              </div>

              <div className="h-[60px]">
                10-11
                <div className="w-[1100px]">
                  <hr />
                </div>
              </div>
              <div className="h-[60px]">
                11-12
                <div className="w-[1100px]">
                  <hr />
                </div>
              </div>
              <div className="h-[60px]">
                12-13
                <div className="w-[1100px]">
                  <hr />
                </div>
              </div>
              <div className="h-[60px]">
                13-14
                <div className="w-[1100px]">
                  <hr />
                </div>
              </div>
              <div className="h-[60px]">
                14-15
                <div className="w-[1100px]">
                  <hr />
                </div>
              </div>
              <div className="h-[60px]">
                15-16
                <div className="w-[1100px]">
                  <hr />
                </div>
              </div>
              <div className="h-[60px]">
                16-17
                <div className="w-[1100px]">
                  <hr />
                </div>
              </div>
              <div className="h-[60px]">
                17-18
                <div className="w-[1100px]">
                  <hr />
                </div>
              </div>
              <div className="h-[60px]">
                18-19
                <div className="w-[1100px]">
                  <hr />
                </div>
              </div>
              <div className="h-[60px]">
                19-20
                <div className="w-[1100px]">
                  <hr />
                </div>
              </div>
              <div className="h-[60px]">
                20-21
                <div className="w-[1100px]">
                  <hr />
                </div>
              </div>
              <div className="h-[60px]">
                21-22
                <div className="w-[1100px]">
                  <hr />
                </div>
              </div>
              <div className="h-[60px]">
                22-23
                <div className="w-[1100px]">
                  <hr />
                </div>
              </div>
              <div className="h-[60px]">
                23-24
                <div className="w-[1100px]">
                  <hr />
                </div>
              </div>
              <div className="h-[60px]">
                24
                <div className="w-[1100px]">
                  <hr />
                </div>
              </div>
            </div>
            <div className="flex gap-[90px]">
              {dayArray.map((day) => {
                const dayTimes = times.filter((elem) => elem.day === day);
                return (
                  <div className="flex">
                    <div>
                      <div>{day}</div>
                      <div className="flex justify-center">
                        {dayTimes.map((elem, index) => {
                          return (
                            <>
                              <div
                                key={index}
                                className="bg-blue-700 ml-1 w-4"
                                style={{
                                  height: `${minutesDiff(
                                    elem.starttime,
                                    elem.endtime
                                  )}px`,
                                  marginTop: `${marginFromStartTime(
                                    elem.starttime
                                  )}px`,
                                }}
                              ></div>
                            </>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Celender;
