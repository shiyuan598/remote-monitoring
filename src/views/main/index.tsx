import React, {useState, useEffect} from "react";
import dayjs from "dayjs";
import Header from "../../components/header";
import Sidebar from "../../components/sidebar";
import RouteList from "./routes";
import { Context } from "../../context";
import "./main.scss";

export default function App() {
    const [updateTime, setUpdateTime] = useState<string>(dayjs().format("YYYY-MM-DD HH:mm:ss"));
    const [vehicleList, setVehicleList] = useState<any>([]);
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
    }, []);
    
    return (
        <Context.Provider value={{updateTime, setUpdateTime, vehicleList}}>
            <div className="container">
                <Header></Header>
                <main>
                    <Sidebar></Sidebar>
                    <div className="content">
                        <RouteList></RouteList>
                    </div>
                </main>
            </div>
        </Context.Provider>
    );
}
