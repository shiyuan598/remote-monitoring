import React, { useRef, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import * as echarts from "echarts";
import { Select } from "antd";
import dayjs from "dayjs";
import upImg from "../../../assets/up.png";

export default function App() {
    const history = useHistory();
    console.info("收到路由参数：", history.location.state);

    const [timeSpan, setTimeSpan] = useState("1");
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
            legend: {
                orient: "vertical",
                top: 0,
                right: 100,
                data: ["平均油耗", "人工驾驶平均油耗", "自动驾驶平均油耗"],
                textStyle: {
                    color: "#aaa",
                    fontWeight: 600
                },
                lineStyle: {
                    width: 14
                },
                itemStyle: {
                    opacity: 0
                }
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
                minInterval: 1,
                min: 10
            },
            series: [
                {
                    name: "平均油耗",
                    type: "line",
                    smooth: true,
                    data: [],
                    showSymbol: false
                },
                {
                    name: "人工驾驶平均油耗",
                    type: "line",
                    smooth: true,
                    data: [],
                    showSymbol: false
                },
                {
                    name: "自动驾驶平均油耗",
                    data: [],
                    type: "line",
                    smooth: true,
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
    }, []);

    useEffect(() => {
        if (chartObj) {
            let arr: any[] = [];
            switch (timeSpan) {
                case "1":
                    arr = [...new Array(30)];
                    break;
                case "2":
                    arr = [...new Array(90)];
                    break;
                case "3":
                    arr = [...new Array(180)];
                    break;
                default:
                    break;
            }
            let data = arr.map((v, i) => parseInt(Math.random() * 10 + 25 + ""));
            const series = [
                { data },
                { data: data.map(v => parseInt(v + Math.random() * 10 + "")) },
                { data: data.map(v => parseInt(v - Math.random() * 10 + "")) }
            ];
            chartObj?.setOption({
                xAxis: {
                    data: arr.map((v, i) => dayjs().add(-i, "day").format("YYYY-MM-DD")).reverse()
                },
                series: series
            });
        }
    }, [chartObj, timeSpan]);

    return (
        <>
            <ul className="tabs clearfix">
                <li className="tab top active">车型ABC001</li>
                <li className="tab top">车型ABC002</li>
                <li className="tab top">车型ABC003</li>
                <li className="tab top">车型ABC004</li>
            </ul>
            <div className="info active">车型_车牌号_VIN码_智驾系统零部件_软件版本_离线</div>
            <div className="card-container">
                <div className="card">
                    <div className="text">当前车速</div>
                    <span className="main-text">16km/h</span>
                    <div className="text">
                        加速度<img src={upImg} alt="" />5m/s<sup>2</sup>
                    </div>
                </div>
                <div className="card">
                    <div className="text">当前控制模式</div>
                    <span className="main-text">Auto Pilot</span>
                </div>
                <div className="card">
                    <div className="text">行驶里程统计（总）</div>
                    <span className="main-text">112km</span>
                </div>
                <div className="card">
                    <div className="text">自动驾驶里程（总）</div>
                    <span className="main-text">
                        24.6km
                        <span className="sub-text">（22%）</span>
                    </span>
                </div>
            </div>
            <ul className="tabs clearfix">
                <li className="tab active">油耗统计</li>
            </ul>
            <div className="statis-container">
                <div className="category">油耗统计</div>
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
                                label: "近三月"
                            },
                            {
                                value: "3",
                                label: "近半年"
                            }
                        ]}
                    />
                </div>
                <div className="chart" ref={chartContainer}></div>
            </div>
        </>
    );
}
