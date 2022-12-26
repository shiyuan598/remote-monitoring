import React, { useState, useContext, useEffect } from "react";
import { Select, DatePicker } from "antd";
import dayjs from "dayjs";
import type { Dayjs } from "dayjs";
import Map from "./map";
import { Context } from "../../../context";
import map from "./map";

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
    const { setUpdateTime } = useContext(Context) as {
        setUpdateTime: Function;
    };
    const [vehicleList, setVehicleList] = useState<any>([]);
    const [vehicleOnline, setVehicleOnline] = useState<any>([]);
    const [vehicleOffline, setVehicleOffline] = useState<any>([]);
    const [tab, setTab] = useState("realtime-position");
    const onChange = (dates: null | (Dayjs | null)[], dateStrings: string[]) => {
        if (dates) {
            console.log("From: ", dates[0], ", to: ", dates[1]);
            console.log("From: ", dateStrings[0], ", to: ", dateStrings[1]);
        } else {
            console.log("Clear");
        }
        setUpdateTime(dateStrings[0]);
    };
    useEffect(() => {
        const data = [
            {
                id: 1,
                number: "苏A00001",
                state: 1,
                position: [120.596, 31.4569]
            },
            {
                id: 2,
                number: "苏A00002",
                state: 1,
                position: [120.629, 31.4421]
            },
            {
                id: 3,
                number: "苏A00003",
                state: 1,
                position: [120.683, 31.4125]
            },
            {
                id: 4,
                number: "苏A00004",
                state: 0
            },
            {
                id: 5,
                number: "苏A00005",
                state: 1,
                position: [120.591, 31.3907]
            },
            {
                id: 6,
                number: "苏A00006",
                state: 0,
                position: [120.641, 31.3907]
            },
            {
                id: 7,
                number: "苏A00007",
                state: 0
            },
            {
                id: 8,
                number: "苏A00008",
                state: 0
            },
            {
                id: 9,
                number: "苏A00009",
                state: 0
            },
            {
                id: 10,
                number: "苏A00010",
                state: 0
            },
            {
                id: 11,
                number: "苏A00011",
                state: 0
            },
            {
                id: 12,
                number: "苏A00012",
                state: 0
            }
        ];
        setVehicleList(data);
        setVehicleOnline(data.filter(item => item.state === 1));
        setVehicleOffline(data.filter(item => item.state === 0));
    }, []);

    return (
        <>
            <div className="card-container vehicle-status">
                <div className="card status online">
                    <div className="main-text">在线：{vehicleOnline.length}</div>
                    <div className="items">
                        {vehicleOnline.map((item: { id: number; number: string }) => (
                            <span className="item text" key={item.id}>
                                {item.number}
                            </span>
                        ))}
                    </div>
                </div>
                <div className="card status offline">
                    <div className="main-text">离线：{vehicleOffline.length}</div>
                    <div className="items">
                        {vehicleOffline.map((item: { id: number; number: string }) => (
                            <span className="item text" key={item.id}>
                                {item.number}
                            </span>
                        ))}
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
                            defaultValue={(tab === "history-trajectory" ? vehicleList : vehicleOnline)[0].id}
                            style={{ width: 120, marginBottom: 13 }}
                            onChange={v => {}}
                            options={(tab === "history-trajectory" ? vehicleList : vehicleOnline).map(
                                (item: { id: number; number: string }) => ({ value: item.id, label: item.number })
                            )}
                        />
                        <RangePicker
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
                <Map tab={tab} vehicleList={vehicleList.filter((item: {position: any[]}) => item.position)}></Map>
            </div>
        </>
    );
}
