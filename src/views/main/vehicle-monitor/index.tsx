import React, { useState } from "react";
import { Select } from "antd";
import Map from "./map";

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
    const [selected, setSelected] = useState("realtime-position");

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
                        className={`tab ${selected === item.id ? "active" : ""}`}
                        key={item.id}
                        onClick={() => {
                            setSelected(item.id);
                        }}>
                        {item.label}
                    </li>
                ))}
            </ul>
            <div className="statis-container map-container">
                {selected === "realtime-position" ? (
                    <div className="category">实时位置</div>
                ) : (
                    <Select
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
                )}
                <Map></Map>
            </div>
        </>
    );
}
