import {get} from "./fetchTool";

function getVehicle(pageNo: number, name="") {
    return get("/vehicle/list", {
        pageNo,
        name
    });
}

function getVehiclesPosition() {
    return get("/vehicle/position");
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    getVehicle,
    getVehiclesPosition
}