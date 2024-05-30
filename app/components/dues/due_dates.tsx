import React, { useEffect, useState } from "react";
import { Space, Table, TableColumnsType, Tag } from "antd";

import { Category, Transaction } from "@/types";
import dayjs from "dayjs";
import { StaffService } from "@/services";

const DueDates = () => {
  const [dues, setDues] = useState<Transaction[]>([]);

  const staff = new StaffService();

  const getDues = async () =>
    await staff.getDues().then((e) => setDues(e.data ?? []));

  const generateName = (first: string, last: string) =>
    first[0].toLocaleUpperCase() +
    ". " +
    last[0].toLocaleUpperCase() +
    last.slice(1);

  const columns: TableColumnsType<Transaction> = [
    {
      title: "H.Owner",
      render: (_, row) =>
        generateName(row.homeownerId.name, row.homeownerId.lastname),
    },
    {
      title: "Type",
      width: 1,
      align: "center",
      render: (_, row) =>
        row.categorySelected.map((e: Category) => (
          <Tag>{e.category.toLocaleUpperCase()}</Tag>
        )),
    },
    {
      title: "Amount",
      width: 1,
      align: "center",
      render: (_, row) => row.categorySelected.reduce((p, n) => p + n.fee, 0),
    },
    {
      title: "Due Date",
      width: 1,
      render: (_, row) =>
        dayjs(
          checkTypeName(row.categorySelected[0].category, "monthly")
            ? row.homeownerId.monthlyDueDate
            : checkTypeName(row.categorySelected[0].category, "yearly")
            ? row.homeownerId.yearlyDueDate
            : row.dateCollected
        ).format("MM/DD/YY"),
    },
    {
      title: "Status",
      width: 1,
      render: (_, row) => statusBadge(row),
    },
  ];

  useEffect(() => {
    getDues();
  }, []);

  return <Table dataSource={dues} columns={columns} pagination={false} />;
};

const checkTypeName = (str: string, str2: string) =>
  str.toLocaleLowerCase().includes(str2.toLocaleLowerCase());

const statusBadge = (d: Transaction) => {
  let dotColor = "#72f25c";

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
  }

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <span
        style={{
          marginRight: 5,
          height: 10,
          width: 10,
          borderRadius: "100%",
          background: dotColor,
        }}
      />
    </div>
  );
};

export default DueDates;
