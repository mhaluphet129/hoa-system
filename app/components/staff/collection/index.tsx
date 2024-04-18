import React, { useEffect, useState } from "react";
import {
  Button,
  Popconfirm,
  Space,
  Table,
  TableProps,
  Tooltip,
  message,
} from "antd";
import {
  EyeOutlined,
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
} from "@ant-design/icons";

import NewCategory from "./components/new_category";
import { Category, CategoryData, CategoryUtilProps } from "@/types";
import dayjs from "dayjs";
import { StaffService } from "@/services";

const CollectionCategories = () => {
  const [openNewCategory, setOpenNewCategory] = useState<CategoryUtilProps>({
    open: false,
    data: undefined,
    isEdit: false,
  });
  const [categories, setCategories] = useState<Category[]>([]);
  const [trigger, setTrigger] = useState(0);

  const staff = new StaffService();

  const columns: TableProps<Category>["columns"] = [
    { title: "Category", dataIndex: "category" },
    { title: "Description", dataIndex: "description" },
    { title: "Fixed Fee", dataIndex: "fee", render: (_) => `₱${_}` },
    {
      title: "Status",
      dataIndex: "status",
      render: (_) => (
        <>
          <span
            style={{
              marginRight: 4,
              width: 5,
              height: 5,
              borderRadius: "100%",
              backgroundColor: _ == "active" ? "green" : "red",
            }}
          />
          {_[0].toLocaleUpperCase() + _.slice(1)}
        </>
      ),
    },
    {
      title: "Date Created",
      dataIndex: "createdAt",
      render: (_) => dayjs(_).format("MM-DD-YYYY"),
    },
    {
      title: "Action",
      align: "center",
      render: (_, row) => (
        <Space>
          <Tooltip title="View">
            <Button icon={<EyeOutlined />} />
          </Tooltip>
          <Tooltip title="Edit">
            <Button
              icon={<EditOutlined />}
              onClick={() =>
                setOpenNewCategory({ open: true, isEdit: true, data: row })
              }
            />
          </Tooltip>
          <Popconfirm
            title="Are you sure to delete this category?"
            okText="DELETE"
            okType="danger"
            onConfirm={() => handleDelete(row?._id ?? "")}
          >
            <Tooltip title="Delete">
              <Button icon={<DeleteOutlined />} danger />
              {/* handleDelete */}
            </Tooltip>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const handleOnAdd = (obj: CategoryData) => {
    (async (_) => {
      let res = await _.newCategory(obj);
      if (res?.success ?? false) {
        message.success(res?.message ?? "Success");
        setOpenNewCategory({ open: false, isEdit: false, data: undefined });
        setTrigger(trigger + 1);
      } else message.error(res?.message ?? "Error");
    })(staff);
  };

  const handleOnSave = (obj: CategoryData) => {
    (async (_) => {
      let res = await _.updateCategory(obj, openNewCategory.data?._id ?? "");
      if (res?.success ?? false) {
        message.success(res?.message ?? "Success");
        setOpenNewCategory({ open: false, isEdit: false, data: undefined });
        setTrigger(trigger + 1);
      } else message.error(res?.message ?? "Error");
    })(staff);
  };

  const handleDelete = (_id: string) => {
    (async (_) => {
      let res = await _.deleteCategory(_id);
      if (res?.success ?? false) {
        message.success(res?.message ?? "Success");
        setTrigger(trigger + 1);
      } else message.error(res?.message ?? "Error");
    })(staff);
  };

  const getCategories = () => {
    (async (_) => {
      let res = await _.getCategory();

      if (res?.success ?? false) setCategories(res?.data ?? []);
    })(staff);
  };

  useEffect(() => {
    getCategories();
  }, [trigger]);

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 5,
        }}
      >
        <span>Filter here</span>
        <Button
          icon={<PlusOutlined />}
          onClick={() =>
            setOpenNewCategory({ open: true, isEdit: false, data: undefined })
          }
        >
          Add Category
        </Button>
      </div>
      <Table columns={columns} dataSource={categories} pagination={false} />
      {/* context */}
      <NewCategory
        {...openNewCategory}
        onAdd={handleOnAdd}
        onSave={handleOnSave}
        close={() =>
          setOpenNewCategory({ open: false, isEdit: false, data: undefined })
        }
      />
    </>
  );
};

export default CollectionCategories;
