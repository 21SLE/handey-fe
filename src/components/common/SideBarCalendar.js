import React from "react";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import "./SideBarCalendar.css";
import dayjs from "dayjs";

const SideBarCalendar = () => {
    return <Calendar 
    formatDay ={(locale, date) => dayjs(date).format('D')}>

    </Calendar>
}

export default SideBarCalendar;