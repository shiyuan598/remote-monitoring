import React, { useRef, useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import * as echarts from "echarts";
import { Select } from "antd";
import dayjs from "dayjs";
import { Context } from "../../../context";
import upImg from "../../../assets/up.png";

export default function App() {
    const history = useHistory();
    const { vehicleList } = useContext(Context) as {
        vehicleList: any[];
    };
    const [curVehicle, setCurVehicle] = useState<number>();
    const [searchHistory, setSearchHistory] = useState<any[]>([]);

    const [timeSpan, setTimeSpan] = useState("1");
    const [chartObj, setChartObj] = useState<echarts.ECharts>();
    const chartContainer = useRef<HTMLDivElement>(null);

    // 初始化选择的车牌号
    useEffect(() => {
        console.info("收到路由参数：", history.location.state);
        const routeParam = history.location.state;
        if (routeParam) {
            setCurVehicle((routeParam as { id: number }).id);
        } else {
            setCurVehicle(vehicleList[0]?.id);
        }
    }, [history, vehicleList]);

    // 查询数据
    useEffect(() => {
        if (curVehicle) {
            const vehicle = vehicleList.find(item => item.id === curVehicle);
            // 搜索历史
            setSearchHistory([vehicle, ...searchHistory]);
        }
    }, [curVehicle]);

    // 初始化图表
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
                min: 15
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
            let data = arr.map((v, i) => parseInt(Math.random() * 5 + 25 + ""));
            const series = [
                { data },
                { data: data.map(v => parseInt(v + Math.random() * 5 + "")) },
                { data: data.map(v => parseInt(v - Math.random() * 5 + "")) }
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
                {searchHistory.slice(0, 4).map((item, index) => (
                    <li
                        key={Math.random()}
                        className={`tab top ${index === 0 ? "active" : ""}`}
                        onClick={() => {
                            setCurVehicle(item.id);
                        }}>
                        {item.number}
                    </li>
                ))}
                <li className="tab select">
                    <Select
                        placeholder="请选择"
                        className="vehicle-number-select"
                        value={curVehicle}
                        style={{ width: 120 }}
                        onChange={v => {
                            setCurVehicle(v);
                        }}
                        options={vehicleList.map((item: { id: number; number: string }) => ({
                            value: item.id,
                            label: item.number
                        }))}
                    />
                </li>
            </ul>

            <div className="info active">车型_车牌号_VIN码_智驾系统零部件_软件版本_离线</div>
            <div className="card-container">
                <div className="card">
                    <div className="text">当前车速</div>
                    <span className="main-text">16km/h</span>
                    <div className="text">
                        加速度
                        <img src={upImg} alt="" />
                        5m/s<sup>2</sup>
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
