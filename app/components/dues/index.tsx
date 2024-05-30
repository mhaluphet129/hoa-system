import { useEffect, useMemo, useState } from "react";
import {
  Button,
  DatePicker,
  Popconfirm,
  Select,
  Space,
  Table,
  TableColumnsType,
  Tag,
  Tooltip,
  message,
} from "antd";
import dayjs, { Dayjs } from "dayjs";
import { PlusOutlined, DeleteOutlined, CheckOutlined } from "@ant-design/icons";

import { StaffService, UserService } from "@/services";
import { Category, Transaction } from "@/types";
import { NewTransaction } from "@/app/components/homeowner/components/homeowner_transaction_details";

interface Filter {
  category?: string | null;
  fromDate?: Dayjs | null;
  toDate?: Dayjs | null;
  status?: "completed" | "overdue" | "ongoing" | null;
}

const Dues = () => {
  const [dues, setDues] = useState<Transaction[]>([]);
  const [category, setCategory] = useState<Category[]>([]);
  const [openNewTransaction, setOpenNewTransaction] = useState(false);
  const [filter, setFilter] = useState<Filter>({
    category: null,
    fromDate: null,
    toDate: null,
    status: null,
  });

  const staff = new StaffService();
  const user = new UserService();

  const memoizedCategory = useMemo(() => {
    if (category !== null) {
      return category;
    } else {
      getCategories();
      return null;
    }
  }, [category]);

  const getDues = async ({ category, fromDate, toDate, status }: Filter) =>
    await staff
      .getDues({ category, fromDate, toDate, status })
      .then((e) => setDues(e.data ?? []));

  const getCategories = async () =>
    await staff.getCategory().then((e) => setCategory(e.data ?? []));

  const generateName = (first: string, last: string) =>
    first[0].toLocaleUpperCase() +
    first.slice(1) +
    " " +
    last[0].toLocaleUpperCase() +
    last.slice(1);

  const columns: TableColumnsType<Transaction> = [
    {
      title: "Home Owner",
      render: (_, row) =>
        generateName(row.homeownerId.name, row.homeownerId.lastname),
    },
    {
      title: "Type",
      render: (_, row) =>
        row.categorySelected.map((e: Category) => (
          <Tag>{e.category.toLocaleUpperCase()}</Tag>
        )),
    },
    {
      title: "Amount",
      render: (_, row) =>
        `₱ ${row.categorySelected
          .reduce((p, n) => p + n.fee, 0)
          .toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}`,
    },
    {
      title: "Due Date",
      render: (_, row) =>
        dayjs(
          checkTypeName(row.categorySelected[0].category, "monthly")
            ? row.homeownerId.monthlyDueDate
            : checkTypeName(row.categorySelected[0].category, "yearly")
            ? row.homeownerId.yearlyDueDate
            : row.dateCollected
        ).format("MMMM DD, YYYY"),
    },
    {
      title: "Status",
      render: (_, row) => statusBadge(row),
    },
    {
      title: "Function",
      align: "center",
      render: (_, row) => (
        <Space>
          <Tooltip
            title={row.status != "completed" ? "Update as Completed" : ""}
          >
            <Popconfirm
              title={null}
              icon={null}
              okText="Mark as Completed"
              okButtonProps={{ type: "primary", size: "large" }}
              cancelButtonProps={{ size: "large" }}
              onConfirm={() => handleMarkAsCompleted(row._id ?? "")}
            >
              <Button
                icon={<CheckOutlined />}
                type="primary"
                size="large"
                disabled={row.status == "completed"}
              />
            </Popconfirm>
          </Tooltip>
          <Popconfirm
            title={
              <span style={{ fontSize: "1.2em" }}>Delete Confirmation</span>
            }
            icon={null}
            okText="DELETE"
            okType="danger"
            okButtonProps={{ type: "primary", size: "large" }}
            cancelButtonProps={{ size: "large" }}
            onConfirm={() => handleDeleteDue(row._id ?? "")}
          >
            <Button icon={<DeleteOutlined />} size="large" danger />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const getHeader = () => (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <Space>
        {/* <Typography.Title level={5} style={{ margin: 0, marginRight: 20 }}>
        FILTER:{" "}
      </Typography.Title> */}
        <Select
          placeholder="Select Category"
          size="large"
          style={{
            width: 150,
          }}
          onChange={(e) => setFilter({ ...filter, category: e })}
          options={(memoizedCategory ?? []).map((e) => ({
            label: e.category,
            value: e._id,
          }))}
          allowClear
        />
        {/* <DatePicker.RangePicker
          format="MMMM DD, YYYY"
          disabled
          size="large"
          placeholder={["Select a Start Date", "Select an End Date"]}
          defaultValue={[dayjs().startOf("year"), dayjs().endOf("year")]}
          onChange={(e) =>
            setFilter({
              ...filter,
              fromDate: e ? e[0] : null,
              toDate: e ? e[1] : null,
            })
          }
        /> */}
        <Select
          placeholder="Select Status"
          size="large"
          style={{
            width: 150,
          }}
          options={["Completed", "Overdue", "Ongoing"].map((e) => ({
            label: e,
            value: e,
          }))}
          onChange={(e) =>
            setFilter({
              ...filter,
              status: e,
            })
          }
          allowClear
        />
      </Space>
      <Button
        size="large"
        icon={<PlusOutlined />}
        onClick={() => setOpenNewTransaction(true)}
      >
        New Transaction
      </Button>
    </div>
  );

  const handleNewTransaction = (e: any) => {
    const { complete, categorySelected, userId, dateCollected } = e;

    if (complete) {
      (async (_) => {
        let res = await _.newTransaction(e);

        if (res?.success ?? false) {
          message.success(res?.message ?? "Success");
          setOpenNewTransaction(false);
          getDues(filter);
        }
      })(user);
    } else {
      (async (_) => {
        await staff
          .newDue({
            homeownerId: userId,
            status: "pending",
            categorySelected,
            dateCollected,
          })
          .then(() => getDues(filter));
      })(staff);

      message.success("Successfully Created");

      setOpenNewTransaction(false);
    }
  };

  const handleDeleteDue = (id: string) => {
    (async (_) => {
      let res = await _.deleteTransaction(id);

      if (res?.success ?? false) {
        message.success(res?.message ?? "Success");
        getDues(filter);
      }
    })(staff);
  };

  const handleMarkAsCompleted = (id: string) => {
    (async (_) => {
      let res = await _.updateTransaction(id, { status: "completed" });

      if (res?.success ?? false) {
        message.success(res?.message ?? "Success");
        getDues(filter);
      }
    })(staff);
  };

  useEffect(() => {
    getCategories();
  }, []);

  useEffect(() => {
    getDues(filter);
  }, [filter, dues]);

  return (
    <>
      <Table title={getHeader} dataSource={dues} columns={columns} />

      {/* context */}
      <NewTransaction
        open={openNewTransaction}
        close={() => setOpenNewTransaction(false)}
        onSave={handleNewTransaction}
        fromDue
      />
    </>
  );
};

const checkTypeName = (str: string, str2: string) =>
  str.toLocaleLowerCase().includes(str2.toLocaleLowerCase());

const statusBadge = (d: Transaction) => {
  let dotColor = "#72f25c";
  let text = "Completed";

  if (
    d.status == "pending" &&
    dayjs(
      checkTypeName(d.categorySelected[0].category, "monthly")
        ? d.homeownerId.monthlyDueDate
        : checkTypeName(d.categorySelected[0].category, "yearly")
        ? d.homeownerId.yearlyDueDate
        : d.dateCollected
    ).diff(dayjs()) > 0
  ) {
    dotColor = "#a5baff";
    text = "Ongoing";
  }

  if (
    d.status == "pending" &&
    dayjs(
      checkTypeName(d.categorySelected[0].category, "monthly")
        ? d.homeownerId.monthlyDueDate
        : checkTypeName(d.categorySelected[0].category, "yearly")
        ? d.homeownerId.yearlyDueDate
        : d.dateCollected
    ).diff(dayjs()) < 0
  ) {
    dotColor = "#f00";
    text = "Overdue";
  }

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <span
        style={{
          marginRight: 5,
          height: 10,
          width: 10,
          borderRadius: "100%",
          background: dotColor,
        }}
      />
      {text}
    </div>
  );
};

export default Dues;
