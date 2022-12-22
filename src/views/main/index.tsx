import React from "react";
import Header from "../../components/header";
import Sidebar from "../../components/sidebar";
import RouteList from "./routes";
import "./main.scss";

export default function App() {
    return (
        <div className="container">
            <Header></Header>
            <main>
                <Sidebar></Sidebar>
                <div className="content">
                    <RouteList></RouteList>
                </div>
            </main>
        </div>
    );
}
