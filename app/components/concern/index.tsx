import React, { useEffect, useState } from "react";
import {
  Space,
  Select,
  Table,
  Tag,
  TableColumnsType,
  Button,
  message,
  Tooltip,
  Popconfirm,
} from "antd";
import { PlusOutlined, EyeOutlined, DeleteOutlined } from "@ant-design/icons";
import dayjs from "dayjs";

import { UserService } from "@/services";
import jason from "@/assets/json/constants.json";
import NewConcern from "./components/new_concern";
import ConcernDetailsCard from "./components/concern_details_card";
import { ConcernData, Concern as ConcernProps } from "@/types";
import { useUserStore } from "@/services/context";

interface ConcernConfigProp {
  open: boolean;
  concern: ConcernProps | null;
}

const Concern = () => {
  const [openNewConcern, setOpenNewConcern] = useState(false);
  const [concerns, setConcerns] = useState<ConcernProps[]>([]);
  const [concernConfig, setConcernConfig] = useState<ConcernConfigProp>({
    open: false,
    concern: null,
  });
  const [trigger, setTrigger] = useState(0);
  const [filter, setFilter] = useState({
    year: new Date().getFullYear(),
    month: new Date().getMonth(),
  });

  const userService = new UserService();
  const { currentUser } = useUserStore();

  const columns: TableColumnsType<ConcernProps> = [
    {
      title: "Title",
      dataIndex: "title",
    },
    {
      title: "Description",
      dataIndex: "description",
    },
    {
      title: "Date Created",
      render: (_, { createdAt }) => dayjs(createdAt).format("MMM DD, YYYY"),
    },
    {
      title: "Status",
      render: (_: any, row: any) => (
        <Tag color={row.resolved == "solve" ? "success" : "error"}>
          {row.resolved == "solve" ? "Solved" : "Unsolved"}
        </Tag>
      ),
    },
    {
      title: "Action",
      align: "center",
      render: (_, row) => (
        <Space>
          <Tooltip title="View">
            <Button
              icon={<EyeOutlined />}
              onClick={() => setConcernConfig({ open: true, concern: row })}
            />
          </Tooltip>
          <Popconfirm
            okText="DELETE"
            okType="danger"
            title="Are you sure you want to delete this ?"
            onConfirm={() => handleDelete(row._id)}
          >
            <Tooltip title="Delete">
              <Button icon={<DeleteOutlined />} danger />
            </Tooltip>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const handleNewConcern = (args: ConcernData) => {
    (async (_) => {
      let res = await _.newConcern({
        ...args,
        homeownerId: currentUser?.homeownerId?._id,
      });
      if (res.success ?? false) {
        message.success("New Concern added Successfully");
        setOpenNewConcern(false);
        setTrigger(trigger + 1);
      }
    })(userService);
  };

  const handleDelete = (_id: string) => {
    (async (_) => {
      let res = await _.deleteConcern(_id);

      if (res?.success ?? false) {
        message.success(res?.message ?? "Success");
        setTrigger(trigger + 1);
      }
    })(userService);
  };

  useEffect(() => {
    (async (_) => {
      let res = await _.getConcerns(currentUser?.homeownerId?._id);
      if (res?.success ?? false) setConcerns(res?.data ?? []);
    })(userService);
  }, [trigger]);

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div style={{ marginBottom: 35 }}>
          <span style={{ marginRight: 25 }}>Filter:</span>
          <Space wrap>
            <Select
              // defaultValue={filter.year}
              style={{ width: 120 }}
              onChange={(e) => setFilter({ ...filter, year: e })}
              options={Array(100)
                .fill(0)
                .map((_, i) => {
                  return {
                    label: new Date().getFullYear(),
                    value: new Date().getFullYear() - i,
                  };
                })}
              placeholder="Year"
            />
            <Select
              // defaultValue={filter.year}
              style={{ width: 120 }}
              onChange={(e) => setFilter({ ...filter, year: e })}
              options={jason.months.map((_, i) => {
                return {
                  label: _,
                  value: i,
                };
              })}
              placeholder="Month"
            />
          </Space>
        </div>
        {currentUser?.type == "homeowner" && (
          <Button
            icon={<PlusOutlined />}
            onClick={() => setOpenNewConcern(true)}
          >
            Add Concern
          </Button>
        )}
      </div>
      <Table
        columns={columns}
        dataSource={concerns}
        pagination={false}
        onRow={(data) => {
          return {
            onClick: () => setConcernConfig({ open: true, concern: data }),
          };
        }}
      />
      {/* context */}
      <NewConcern
        open={openNewConcern}
        onSave={handleNewConcern}
        close={() => setOpenNewConcern(false)}
        isLoading={userService.loaderHas("new-concern")}
      />
      <ConcernDetailsCard
        {...concernConfig}
        close={() => setConcernConfig({ open: false, concern: null })}
      />
    </>
  );
};

export default Concern;
