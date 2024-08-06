import React, { createContext, useState } from "react";

export const TimeContext = createContext();

const TimeProvider = ({ children }) => {
  const [times, setTimes] = useState([]);
  const [openModel, setOpenModel] = useState(false);
  const [deleteModel, setDeleteModel] = useState(false);
  const [deleteRecord, setDeleteRecord] = useState(null);
  const [detailModel, setDetailModel] = useState(false);
  const [detail, setDetail] = useState("");
  const [editModel, setEditModel] = useState(false);
  const [editTime, setEditTime] = useState({
    id: "",
    title: "",
    description: "",
    starttime: "",
    endtime: "",
    day: "",
  });

  //add data
  const addData = (e, title, description, starttime, endtime, day) => {
    e.preventDefault();
    const data = {
      id: new Date().getTime().toString(),
      title,
      description,
      starttime,
      endtime,
      day,
    };
    const newFillData = [...times, data];
    setTimes(newFillData);
    localStorage.setItem("data", JSON.stringify(newFillData));

    setOpenModel(false);
  };

  //delete data
  const confirmDelete = (id) => {
    setDeleteRecord(id);
    setDeleteModel(true);
  };
  const handleDelete = () => {
    const newFillData = times.filter((item) => item.id !== deleteRecord);
    setTimes(newFillData);
    localStorage.setItem("data", JSON.stringify(newFillData));
    setDeleteModel(false);
  };

  //preview of data
  const timeDetail = (elem) => {
    setDetailModel(true);
    setDetail(elem);
  };

  // Remove all data
  const clearAll = () => {
    localStorage.removeItem("data");
    setTimes([]);
  };

  //edit data
  const toEdit = (id) => {
    const itemToEdit = times.find((item) => item.id === id);
    if (itemToEdit) {
      setEditModel(true);
      setEditTime(itemToEdit);
    }
  };

  const editData = (e, id) => {
    e.preventDefault();
    const updatedTimes = times.map((item) =>
      item.id === id
        ? {
            ...item,
            title: editTime.title,
            description: editTime.description,
            starttime: editTime.starttime,
            endtime: editTime.endtime,
            day: editTime.day,
          }
        : item
    );
    setTimes(updatedTimes);
    localStorage.setItem("data", JSON.stringify(updatedTimes));
    setEditModel(false);
  };

  return (
    <TimeContext.Provider
      value={{
        times,
        setTimes,
        addData,
        setOpenModel,
        openModel,
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
        setEditTime,
        editData,
      }}
    >
      {children}
    </TimeContext.Provider>
  );
};

export default TimeProvider;
