import {get, post} from "./fetchTool";

function getVehicleState() {
    return get("/l3-vehicle/monitor/state/online");
}

function getVehiclePosition() {
    return get("/l3-vehicle/monitor/state/position");
}

function getPathRealtime() {
    return post("/l3-vehicle/monitor/state/online");
}

function getPathHistory() {
    return post("/l3-vehicle/monitor/state/position");
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    getVehicleState,
    getVehiclePosition,
    getPathRealtime,
    getPathHistory
}