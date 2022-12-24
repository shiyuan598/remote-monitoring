import React, { useRef, useState, useEffect } from "react";
import VehicleCollect from "./vehicleCollect";
import VehicleSearch from "./vehicleSearch";
import VehicleList from "./vehicleList";

const tabs = [
    {
        id: "vehicleCollect",
        label: "车辆录入"
    },
    {
        id: "vehicleSearch",
        label: "车辆查询"
    }
];

export default function App() {
    const [tab, setTab] = useState("vehicleSearch");

    return (
        <>
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
            {tab === "vehicleCollect" ? <VehicleCollect /> : <VehicleSearch />}
            <ul className="tabs clearfix">
                <li className="tab active">车辆管理</li>
            </ul>
            <VehicleList />
        </>
    );
}
