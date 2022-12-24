import React, { useRef, useState, useEffect } from "react";
import { DeleteOutlined, DownOutlined, RightOutlined, PlusOutlined, FormOutlined } from "@ant-design/icons";
import { Table } from "antd";
import type { TableColumnsType } from "antd";
import style from "./style.module.scss";

interface DataType {
    key: React.Key;
    type: string;
    number: string;
    vin: string;
    version: string;
    sysParts: string;
    state: number;
    createDate: string;
}

interface ExpandedDataType {
    key: React.Key;
    info: string;
    createDate: string;
    name: string;
    code: string;
}

export default function App() {
    const [id, setId] = useState<number>(0);
    const expandedRowRender = (record: DataType, index: number) => {
        console.info(record);
        const columns: TableColumnsType<ExpandedDataType> = [
            { title: "车型码", dataIndex: "code", key: "code" },
            { title: "配置名称", dataIndex: "name", key: "name" },
            { title: "关键总成信息", dataIndex: "info", key: "info" },
            { title: "创建日期", dataIndex: "createDate", key: "createDate" },
            {
                title: "操作",
                dataIndex: "operation",
                key: "operation",
                render: () => (
                    <>
                        <span className={style.action}>
                            <FormOutlined />
                        </span>
                        <span className={style.action}>
                            <DeleteOutlined />
                        </span>
                    </>
                )
            }
        ];

        const data = [];
        for (let i = 0; i < 3; ++i) {
            data.push({
                key: i.toString(),
                name: "This is production name",
                info: "CA6DM2-46E66+畅行版AMT——无液缓+BOSCH电池转向+板簧后悬+120km/h",
                createDate: "2014-12-24",
                code: "t-56" + id
            });
        }
        return <Table columns={columns} dataSource={data} pagination={false} />;
    };

    const columns: TableColumnsType<DataType> = [
        { title: "车型", dataIndex: "type", key: "type" },
        { title: "车牌号", dataIndex: "number", key: "number" },
        { title: "VIN码", dataIndex: "vin", key: "version" },
        { title: "软件版本", dataIndex: "version", key: "version" },
        { title: "智驾系统零部件", dataIndex: "sysParts", key: "sysParts" },
        { title: "状态", dataIndex: "state", key: "state" },
        { title: "创建日期", dataIndex: "createDate", key: "createDate" },
        {
            title: "操作",
            key: "operation",
            render: (text, record, index) => (
                <>
                    <span className={style.action}>
                        <PlusOutlined />
                    </span>
                    <span className={style.action}>
                        <FormOutlined />
                    </span>
                    <span onClick={() => console.info(record)} className={style.action}>
                        <DeleteOutlined />
                    </span>
                </>
            )
        }
    ];

    const data: DataType[] = [];
    for (let i = 0; i < 3; ++i) {
        data.push({
            key: i.toString(),
            type: "J7A01",
            number: "苏UG9IOS",
            vin: "v-0-1",
            version: "10.3.4",
            sysParts: "Lorem loking",
            state: 0,
            createDate: "2014-12-24"
        });
    }

    return (
        <Table
            columns={columns}
            expandable={{
                expandedRowRender: (record, index) => expandedRowRender(record, index),
                expandIcon: ({ expanded, onExpand, record }) =>
                    expanded ? (
                        <DownOutlined onClick={e => onExpand(record, e)} />
                    ) : (
                        <RightOutlined onClick={e => onExpand(record, e)} />
                    ),
                defaultExpandedRowKeys: ["0"],
                onExpand: (expanded, record) => {
                    console.info(expanded, record.key);
                    setId(record.key as number);
                }
            }}
            dataSource={data}
            size="small"
        />
    );
}
