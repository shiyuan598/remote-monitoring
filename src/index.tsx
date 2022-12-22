import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import ReactDOM from "react-dom/client";
import { ConfigProvider } from "antd";
import App from "./App";
import "./index.scss";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
    <Router>
        <div className="app">
            <ConfigProvider
                theme={{
                    token: {
                        colorPrimary: "#447ed9"
                    }
                }}>
                <App />
            </ConfigProvider>
        </div>
    </Router>
);
