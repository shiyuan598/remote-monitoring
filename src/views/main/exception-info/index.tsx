import React, { useState } from "react";

export default function App() {
    const [selected, setSelected] = useState("error-code");
    const tabs = [
        {
            id: "error-code",
            label: "故障码统计"
        },
        {
            id: "logout",
            label: "异常退出统计"
        },
        {
            id: "takeover",
            label: "主动接管次数统计"
        }
    ];
    return (
        <>
            <ul className="tabs clearfix">
                <li className="tab active">车型ABC001</li>
                <li className="tab">车型ABC002</li>
                <li className="tab">车型ABC003</li>
                <li className="tab">车型ABC004</li>
            </ul>
            <div className="info disable">车型_车牌号_VIN码_智驾系统零部件_软件版本_离线</div>
            <div className="card-container">
                <div className="card">
                    <div className="text">主动接管次数（总）</div>
                    <span className="main-text">
                        12
                        <span className="sub-text">（次）</span>
                    </span>
                </div>
                <div className="card">
                    <div className="text">功能降级次数（总）</div>
                    <span className="main-text">
                        10
                        <span className="sub-text">（次）</span>
                    </span>
                </div>
                <div className="card">
                    <div className="text">异常退出统计（总）</div>
                    <span className="main-text">
                        12
                        <span className="sub-text">（次）</span>
                    </span>
                </div>
                <div className="card"></div>
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
            <div className="statis-container">
                <span className="category">当前故障码</span>
                <p className="text">短期显示故障码code+时间戳，二阶段映射到文字描述</p>
                <span className="category">历史故障码</span>
                <p className="text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis, iure!</p>
            </div>
        </>
    );
}
