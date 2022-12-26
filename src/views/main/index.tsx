import React, {useState} from "react";
import dayjs from "dayjs";
import Header from "../../components/header";
import Sidebar from "../../components/sidebar";
import RouteList from "./routes";
import { Context } from "../../context";
import "./main.scss";

export default function App() {
    const [updateTime, setUpdateTime] = useState<string>(dayjs().format("YYYY-MM-DD HH:mm:ss"));
    return (
        <Context.Provider value={{updateTime, setUpdateTime}}>
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
