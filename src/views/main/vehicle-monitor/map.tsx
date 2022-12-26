import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { vehicle as vehicleApi } from "../../../api";

function Map(props: { tab: string; vehicleList: any[] }) {
    const { tab, vehicleList } = props;
    const history = useHistory();
    console.info(tab, vehicleList);
    const [map, setMap] = useState(null);
    useEffect(() => {
        /**
         * 全局参数设置
         */
        minemap.domainUrl = "https://minemap.minedata.cn";
        minemap.dataDomainUrl = "https://minemap.minedata.cn";
        minemap.serverDomainUrl = "https://sd-data.minedata.cn";
        minemap.spriteUrl = "https://minemap.minedata.cn/minemapapi/v2.1.1/sprite/sprite";
        minemap.serviceUrl = "https://service.minedata.cn/service";
        minemap.key = "ca78282dfff148e3be5390ce027068f5";
        minemap.solution = 11001;

        const map = new minemap.Map({
            container: "map",
            style: "https://service.minedata.cn/map/solu/style/11001",
            center: [120.647445, 31.416957],
            zoom: 12,
            pitch: 0,
            maxZoom: 17,
            minZoom: 3,
            projection: "MERCATOR",
            logoControl: false
        });
        map.addControl(new minemap.Navigation(), "bottom-right");
        map.addControl(new minemap.Fullscreen(), "top-right");
        map.addControl(new minemap.Scale(), "bottom-left");

        map.on("click", (e: any) => {
            console.info([e.lngLat.lng, e.lngLat.lat]);
        });
        setMap(map);
    }, []);

    const [popups, setPopups] = useState([]);
    const [makers, setMakers] = useState([]);
    useEffect(() => {
        if (map && vehicleList.length) {
            // 删除所有markers和popups
            makers.forEach((item: any) => item.remove());
            popups.forEach((item: any) => item.remove());

            if (tab === "realtime-position") {
                let _popups: any = [];
                let _markers: any = [];
                vehicleList.forEach((item: any) => {
                    let popup = new minemap.Popup({ closeOnClick: false, closeButton: false, offset: [0, -17] })
                        .setLngLat(item.position)
                        .setHTML(`<h4>${item.number}</h4>`)
                        .addTo(map);
                    _popups.push(popup);

                    var el = document.createElement("div");
                    // 自定义DOM样式 或者通过css类设置
                    el.style["background" as any] = "url(/images/truck.png) center / 24px no-repeat";
                    el.style["background-color" as any] = item.state === 1 ? "#3370ff" : "#6d6d6d";
                    el.style.width = "34px";
                    el.style.height = "34px";
                    el.style["border-radius" as any] = "50%";
                    let marker = new minemap.Marker(el, {
                        offset: [-17, -17],
                        pitchAlignment: "map",
                        rotationAlignment: "map"
                    })
                        .setLngLat(item.position)
                        .addTo(map);
                    el.addEventListener("click", () => {
                        console.info("clicked at ", item.number);
                        // 跳转到车辆行驶数据
                        history.push("/main/driving-data", { ...item });
                    });
                    _markers.push(marker);
                });
                setPopups(_popups);
                setMakers(_markers);
            }
        }
    }, [map, vehicleList]);
    return <div id="map"></div>;
}

export default React.memo(Map);
