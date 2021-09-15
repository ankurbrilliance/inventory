import React, { useState } from "react";
import Calendar from "react-calendar";
import "./Calender.css";

const Calender = () => {
  const [value, onChange] = useState(new Date());
  return <Calendar />;
};

export default Calender;
