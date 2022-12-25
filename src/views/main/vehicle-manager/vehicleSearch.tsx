import React, { useRef, useState, useEffect } from "react";
import { Button, DatePicker, Form, Input, Select } from "antd";
import style from "./style.module.scss";

const { RangePicker } = DatePicker;

export default function App() {
    const [form] = Form.useForm();
    const handleOk = () => {
        form.submit();
    };
    const handleReset = () => {
        form.resetFields();
    };
    const onFinish = (values: any) => {
        console.log("Received values of form: ", values);
    };
    return (
        <div className={style["form-container"]}>
            <Form
                labelCol={{ flex: "80px" }}
                labelAlign="left"
                labelWrap
                colon={false}
                size="small"
                form={form}
                onFinish={onFinish}>
                <Form.Item name="type" label="车型">
                    <Select placeholder="请选择" />
                </Form.Item>
                <Form.Item name="number" label="车牌号">
                    <Select placeholder="请选择" />
                </Form.Item>
                <Form.Item name="version" label="软件版本">
                    <Select placeholder="请选择" />
                </Form.Item>
                <Form.Item name="vin" label="VIN码">
                    <Select placeholder="请选择" />
                </Form.Item>
                <Form.Item name="sysParts" label="智驾系统零部件">
                    <Select placeholder="请选择" />
                </Form.Item>
                <Form.Item name="date" label="创建日期">
                    <RangePicker size="small" />
                </Form.Item>
            </Form>
            <div className={style.buttons}>
                <Button onClick={handleOk} size="small" type="primary">
                    查询
                </Button>
                <Button onClick={handleReset} size="small" disabled>
                    重置
                </Button>
            </div>
        </div>
    );
}
