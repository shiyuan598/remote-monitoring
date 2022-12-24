import React, { useRef, useState, useEffect } from "react";
import { Button, Form, Input, Select } from "antd";
import style from "./style.module.scss";

export default function App() {
    const [form] = Form.useForm();
    const handleOk = () => {
        form.submit();
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
                <Form.Item name="type" label="车型" required={true} rules={[{ required: true, message: "请输入车型" }]}>
                    <Input placeholder="请输入" />
                </Form.Item>
                <Form.Item name="number" label="车牌号" required={true} rules={[{ required: true, message: "请输入车牌号" }]}>
                    <Input placeholder="请输入" />
                </Form.Item>
                <Form.Item
                    name="version"
                    label="软件版本"
                    required={true}
                    rules={[{ required: true, message: "请输入软件版本" }]}>
                    <Input placeholder="请输入" />
                </Form.Item>
                <Form.Item name="vin" label="VIN码" required={true} rules={[{ required: true, message: "请输入VIN码" }]}>
                    <Input placeholder="请输入" />
                </Form.Item>
                <Form.Item
                    name="sysParts"
                    label="智驾系统零部件"
                    required={true}
                    rules={[{ required: true, message: "请输入智驾系统零部件" }]}>
                    <Input placeholder="请输入" />
                </Form.Item>
            </Form>
            <div className={style.buttons}>
                <Button onClick={handleOk} size="small" type="primary">
                    录入
                </Button>
            </div>
        </div>
    );
}
