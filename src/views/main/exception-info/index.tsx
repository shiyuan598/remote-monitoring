import React, { useRef, useState, useEffect } from "react";
import * as echarts from "echarts";
import { Select } from "antd";

export default function App() {
    const [tab, setTab] = useState("error");
    const [selected, setSelected] = useState("error");
    const tabs = [
        {
            id: "error",
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

    const [chartObj, setChartObj] = useState<echarts.ECharts>();
    const chartContainer = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!chartContainer.current) {
            return;
        }
        const option = {
            color: ["#3370ff", "#ffbf33", "#33b4ff"],
            grid: {
                top: 40,
                right: 30,
                bottom: 40,
                left: 60
            },
            tooltip: {
                trigger: "axis"
            },
            xAxis: {
                type: "category",
                data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
                axisLine: {
                    lineStyle: {
                        color: "#aaa"
                    }
                },
                axisLabel: {
                    hideOverlap: true
                }
            },
            yAxis: {
                type: "value",
                minInterval: 1
            },
            series: [
                {
                    name: "异常退出统计",
                    type: "line",
                    smooth: true,
                    data: [34, 43, 32, 7, 59, 60, 56],
                    showSymbol: false
                }
            ]
        };
        const chart = echarts.init(chartContainer.current);
        setChartObj(chart);
        chart.setOption(option);
        function handleResize() {
            chart.resize();
        }
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, [tab]);
    return (
        <>
            <ul className="tabs clearfix">
                <li className="tab top active">车型ABC001</li>
                <li className="tab top">车型ABC002</li>
                <li className="tab top">车型ABC003</li>
                <li className="tab top">车型ABC004</li>
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
                        className={`tab ${tab === item.id ? "active" : ""}`}
                        key={item.id}
                        onClick={() => {
                            setTab(item.id);
                        }}>
                        {item.label}
                    </li>
                ))}
            </ul>
            <div className="statis-container">
                {tab === "error" ? (
                    <>
                        <span className="category">当前故障码</span>
                        <p className="text">短期显示故障码code+时间戳，二阶段映射到文字描述</p>
                        <span className="category">历史故障码</span>
                        <p className="text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis, iure!</p>
                    </>
                ) : (
                    <>
                        <div>
                            <Select
                                size="small"
                                defaultValue="1"
                                style={{ width: 120, marginBottom: 13 }}
                                onChange={v => {}}
                                options={[
                                    {
                                        value: "1",
                                        label: "近一月"
                                    },
                                    {
                                        value: "3",
                                        label: "近三月"
                                    },
                                    {
                                        value: "6",
                                        label: "近半年"
                                    }
                                ]}
                            />
                        </div>
                        <div className="chart" ref={chartContainer}></div>
                    </>
                )}
            </div>
        </>
    );
}
