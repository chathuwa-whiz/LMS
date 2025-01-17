// right side bar for student profile image / calendar / tasks
// hidden in mobile view
import React, { useState } from "react";
import { FaPenToSquare, FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { MdOutlineSchedule } from "react-icons/md";
import {
    add,
    eachDayOfInterval,
    endOfMonth,
    format,
    getDay,
    isEqual,
    isSameDay,
    isSameMonth,
    isToday,
    parse,
    parseISO,
    startOfToday,
} from "date-fns";

const meetings = [
    {
        id: 1,
        name: "Leslie Alexander",
        imageUrl:
            "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        startDatetime: "2022-05-11T13:00",
        endDatetime: "2022-05-11T14:30",
    },
    {
        id: 2,
        name: "Michael Foster",
        imageUrl:
            "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        startDatetime: "2022-05-20T09:00",
        endDatetime: "2022-05-20T11:30",
    },
    {
        id: 3,
        name: "Dries Vincent",
        imageUrl:
            "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        startDatetime: "2022-05-20T17:00",
        endDatetime: "2022-05-20T18:30",
    },
    {
        id: 4,
        name: "Leslie Alexander",
        imageUrl:
            "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        startDatetime: "2022-06-09T13:00",
        endDatetime: "2022-06-09T14:30",
    },
    {
        id: 5,
        name: "Michael Foster",
        imageUrl:
            "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        startDatetime: "2022-05-13T14:00",
        endDatetime: "2022-05-13T14:30",
    },
];

function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}

export default function Sidebar() {
    let today = startOfToday();
    let [selectedDay, setSelectedDay] = useState(today);
    let [currentMonth, setCurrentMonth] = useState(format(today, "MMM-yyyy"));
    let firstDayCurrentMonth = parse(currentMonth, "MMM-yyyy", new Date());

    let days = eachDayOfInterval({
        start: firstDayCurrentMonth,
        end: endOfMonth(firstDayCurrentMonth),
    });

    function previousMonth() {
        let firstDayNextMonth = add(firstDayCurrentMonth, { months: -1 });
        setCurrentMonth(format(firstDayNextMonth, "MMM-yyyy"));
    }

    function nextMonth() {
        let firstDayNextMonth = add(firstDayCurrentMonth, { months: 1 });
        setCurrentMonth(format(firstDayNextMonth, "MMM-yyyy"));
    }
    return (
        <section className="lg:w-1/6">
            {/* Desktop view */}
            <div className="hidden lg:flex flex-col">
                {/* profile */}
                <div>
                    <div className="flex justify-between text-gray-700">
                        <span>Profile</span>
                        <div className="flex items-center justify-center w-8 h-8 rounded-md bg-white hover:bg-primary2 cursor-pointer">
                            <FaPenToSquare />
                        </div>
                    </div>

                    <div className="flex flex-col justify-center items-center py-10">
                        <div className="relative w-28 h-28 flex justify-center items-center rounded-full bg-primary2">
                            <div className="absolute w-36 bottom-0">
                                <img src="/images/3d-profile.png" />
                            </div>
                        </div>
                        <span className="text-gray-600 text-sm pt-2">Mahinda Rajapaksha</span>
                    </div>
                </div>

                {/* calendar */}

                <div>
                    <div className="flex items-center">
                        <h2 className="flex-auto text-gray-700">
                            {format(firstDayCurrentMonth, "MMMM yyyy")}
                        </h2>
                        <button
                            type="button"
                            onClick={previousMonth}
                            className="-my-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
                        >
                            <span className="sr-only">Previous month</span>
                            <FaChevronLeft className="w-5 h-5" aria-hidden="true" />
                        </button>
                        <button
                            onClick={nextMonth}
                            type="button"
                            className="-my-1.5 -mr-1.5 ml-2 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
                        >
                            <span className="sr-only">Next month</span>
                            <FaChevronRight className="w-5 h-5" aria-hidden="true" />
                        </button>
                    </div>
                    <div className="grid grid-cols-7 mt-10 text-xs leading-6 text-center text-gray-500">
                        <div>S</div>
                        <div>M</div>
                        <div>T</div>
                        <div>W</div>
                        <div>T</div>
                        <div>F</div>
                        <div>S</div>
                    </div>
                    <div className="grid grid-cols-7 mt-2 text-sm">
                        {days.map((day, dayIdx) => (
                            <div
                                key={day.toString()}
                                className={classNames(
                                    dayIdx === 0 && colStartClasses[getDay(day)],
                                    "py-1.5"
                                )}
                            >
                                <button
                                    type="button"
                                    onClick={() => setSelectedDay(day)}
                                    className={classNames(
                                        isEqual(day, selectedDay) && "text-white",
                                        !isEqual(day, selectedDay) &&
                                        isToday(day) &&
                                        "text-primary3",
                                        !isEqual(day, selectedDay) &&
                                        !isToday(day) &&
                                        isSameMonth(day, firstDayCurrentMonth) &&
                                        "text-gray-900",
                                        !isEqual(day, selectedDay) &&
                                        !isToday(day) &&
                                        !isSameMonth(day, firstDayCurrentMonth) &&
                                        "text-gray-400",
                                        isEqual(day, selectedDay) && isToday(day) && "bg-primary3",
                                        isEqual(day, selectedDay) &&
                                        !isToday(day) &&
                                        "bg-gray-900",
                                        !isEqual(day, selectedDay) && "hover:bg-gray-200",
                                        (isEqual(day, selectedDay) || isToday(day)) &&
                                        "font-semibold",
                                        "mx-auto flex h-8 w-8 items-center justify-center rounded-full"
                                    )}
                                >
                                    <time dateTime={format(day, "yyyy-MM-dd")}>
                                        {format(day, "d")}
                                    </time>
                                </button>

                                <div className="w-1 h-1 mx-auto mt-1">
                                    {meetings.some((meeting) =>
                                        isSameDay(parseISO(meeting.startDatetime), day)
                                    ) && (
                                            <div className="w-1 h-1 rounded-full bg-sky-500"></div>
                                        )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>


                {/* tasks */}
                <div className="flex flex-col gap-y-2">

                    <div className="flex justify-between items-center px-4 h-16 rounded-xl bg-red-500 hover:bg-red-400 cursor-pointer">
                        <MdOutlineSchedule className="text-white w-10 h-10" />
                        <div className="flex  flex-col justify-start text-white">
                            <span>Task 1</span>
                            <span>January 22</span>
                        </div>
                        <FaChevronRight className="text-white w-5 h-5" />
                    </div>

                    <div className="flex justify-between items-center px-4 h-16 rounded-xl bg-green-500 hover:bg-green-400 cursor-pointer">
                        <MdOutlineSchedule className="text-white w-10 h-10" />
                        <div className="flex  flex-col justify-start text-white">
                            <span>Task 1</span>
                            <span>January 22</span>
                        </div>
                        <FaChevronRight className="text-white w-5 h-5" />
                    </div>

                    <div className="flex justify-between items-center px-4 h-16 rounded-xl bg-yellow-500 hover:bg-yellow-400 cursor-pointer">
                        <MdOutlineSchedule className="text-white w-10 h-10" />
                        <div className="flex  flex-col justify-start text-white">
                            <span>Task 1</span>
                            <span>January 22</span>
                        </div>
                        <FaChevronRight className="text-white w-5 h-5" />
                    </div>

                </div>
            </div>
        </section>
    );
}

let colStartClasses = [
    "",
    "col-start-2",
    "col-start-3",
    "col-start-4",
    "col-start-5",
    "col-start-6",
    "col-start-7",
];
