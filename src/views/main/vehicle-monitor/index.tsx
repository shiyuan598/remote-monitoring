import React, { useState } from "react";
import { Select, DatePicker } from "antd";
import dayjs from "dayjs";
import type { Dayjs } from "dayjs";
import Map from "./map";

const { RangePicker } = DatePicker;

const tabs = [
    {
        id: "realtime-position",
        label: "实时位置"
    },
    {
        id: "history-trajectory",
        label: "历史轨迹"
    },
    {
        id: "realtime-trajectory",
        label: "实时轨迹"
    }
];
export default function App() {
    const [tab, setTab] = useState("realtime-position");
    const onChange = (dates: null | (Dayjs | null)[], dateStrings: string[]) => {
        if (dates) {
            console.log("From: ", dates[0], ", to: ", dates[1]);
            console.log("From: ", dateStrings[0], ", to: ", dateStrings[1]);
        } else {
            console.log("Clear");
        }
    };

    return (
        <>
            <div className="card-container vehicle-status">
                <div className="card status online">
                    <div className="main-text">在线：5</div>
                    <div className="items">
                        <span className="item text">苏A00001</span>
                        <span className="item text">苏AB987G</span>
                        <span className="item text">苏A00001</span>
                        <span className="item text">苏AB987G</span>
                        <span className="item text">苏A00001</span>
                        <span className="item text">苏AB987G</span>
                        <span className="item text">苏A00001</span>
                        <span className="item text">苏AB987G</span>
                        <span className="item text">苏A00001</span>
                        <span className="item text">苏AB987G</span>
                    </div>
                </div>
                <div className="card status offline">
                    <div className="main-text">离线：5</div>
                    <div className="items">
                        <span className="item text">苏A00001</span>
                        <span className="item text">苏AB987G</span>
                        <span className="item text">苏A00001</span>
                        <span className="item text">苏AB987G</span>
                        <span className="item text">苏A00001</span>
                        <span className="item text">苏AB987G</span>
                    </div>
                </div>
            </div>
            <ul className="tabs clearfix">
                {tabs.map(item => (
                    <li
                        className={`tab ${tab === item.id ? "active" : ""}`}
                        key={item.id}
                        onClick={() => {
                            setTab(item.id);
                        }}>
                        {item.label}
                    </li>
                ))}
            </ul>
            <div className="statis-container map-container">
                {tab === "realtime-position" ? (
                    <div className="category">实时位置</div>
                ) : (
                    <>
                        <Select
                            size="small"
                            defaultValue="J7A01"
                            style={{ width: 120, marginBottom: 13 }}
                            onChange={v => {}}
                            options={[
                                {
                                    value: "1",
                                    label: "J7A01"
                                },
                                {
                                    value: "3",
                                    label: "J7A02"
                                },
                                {
                                    value: "6",
                                    label: "J7A03"
                                }
                            ]}
                        />
                        <RangePicker
                            size="small"
                            style={{ marginLeft: "20px" }}
                            presets={[
                                { label: "今天", value: [dayjs(), dayjs()] },
                                { label: "7天", value: [dayjs().add(-6, "d"), dayjs()] },
                                { label: "14天", value: [dayjs().add(-13, "d"), dayjs()] },
                                { label: "30天", value: [dayjs().add(-29, "d"), dayjs()] }
                            ]}
                            onChange={onChange}
                        />
                    </>
                )}
                <Map></Map>
            </div>
        </>
    );
}
