import React, { useRef, useState, useEffect } from "react";
import * as echarts from "echarts";
import { Select } from "antd";
import dayjs from "dayjs";

export default function App() {
    const [tab, setTab] = useState("error");
    const [timeSpan, setTimeSpan] = useState("1");
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
                data: [],
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
                    data: [],
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

    useEffect(() => {
        if (chartObj) {
            let arr: any[] = [];
            switch (timeSpan) {
                case "1":
                    arr = [...new Array(30)];
                    break;
                case "2":
                    arr = [...new Array(180)];
                    break;
                case "3":
                    arr = [...new Array(365)];
                    break;
                default:
                    break;
            }
            chartObj?.setOption({
                xAxis: {
                    data: arr.map((v, i) => dayjs().add(-i, "day").format("YYYY-MM-DD")).reverse()
                },
                series: [{ data: arr.map((v, i) => parseInt(Math.random() * 10 + "")) }]
            });
        }
    }, [tab, chartObj, timeSpan]);
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
                                defaultValue="1"
                                style={{ width: 120, marginBottom: 13 }}
                                onChange={v => {
                                    setTimeSpan(v);
                                }}
                                options={[
                                    {
                                        value: "1",
                                        label: "近一月"
                                    },
                                    {
                                        value: "2",
                                        label: "近半年"
                                    },
                                    {
                                        value: "3",
                                        label: "近一年"
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
