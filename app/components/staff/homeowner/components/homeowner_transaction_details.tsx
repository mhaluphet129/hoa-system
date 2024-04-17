import React, { useEffect, useState } from "react";
import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  Modal,
  Row,
  Select,
  Table,
  TableColumnsType,
  Tag,
  Typography,
  message,
} from "antd";
import { PlusOutlined, LeftOutlined } from "@ant-design/icons";
import dayjs from "dayjs";

import { StaffService, UserService, UtilService } from "@/services";
import {
  NewHomeownerTransaction,
  Category,
  Staff,
  Transaction,
  ProtectedUser,
} from "@/types";
import { useUserStore } from "@/services/context";

const HOTransacDetails = ({
  user,
  goBack,
}: {
  user: ProtectedUser;
  goBack?: () => void;
}) => {
  const [openNewTransaction, setOpenNewTransaction] = useState(false);
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const userService = new UserService();

  const columns: TableColumnsType<Transaction> = [
    {
      title: "Date",
      width: 100,
      render: (_, { createdAt }) => dayjs(createdAt).format("MMM DD 'YY"),
    },
    {
      title: "Name",
      width: 200,
      render: (_, { userId }: { userId: any }) =>
        `${userId.homeownerId?.name} ${userId.homeownerId?.lastname}`,
    },
    { title: "OR#", width: 40 },
    { title: "AR#", width: 40 },
    {
      title: "Amount",
      width: 60,
      dataIndex: "totalFee",
      render: (_) => `₱${_}`,
    },
    {
      title: "Check/Fund Transfer",
      width: 200,
      render: (_, { paymentType }) => (
        <Tag>{paymentType == "cash" ? "Fund Transfer" : "Check"}</Tag>
      ),
    },
    { title: "Monthly Due/Annual Due" },
  ];

  const handleNewTransaction = (data: any) => {
    (async (_) => {
      let res = await _.newTransaction({ ...data, userId: user._id });

      if (res?.success ?? false) {
        message.success(res?.message ?? "Success");
        setOpenNewTransaction(false);
      }
    })(userService);
  };

  useEffect(() => {
    (async (_) => {
      let res = await _.getTransaction(user._id);
      if (res?.success ?? false) setTransactions(res?.data ?? []);
    })(userService);
  }, []);

  return (
    <>
      <div
        className="header"
        style={{
          display: "flex",
          marginBottom: 10,
          justifyContent: "space-between",
        }}
      >
        {goBack ? (
          <div style={{ cursor: "pointer" }} onClick={goBack}>
            <LeftOutlined /> Back
          </div>
        ) : null}

        <Button
          icon={<PlusOutlined />}
          onClick={() => setOpenNewTransaction(true)}
        >
          Add New Transaction
        </Button>
      </div>
      <Table
        rowKey={(e) => e?._id ?? ""}
        columns={columns}
        dataSource={transactions}
        pagination={false}
      />

      {/* context */}
      <NewTransaction
        open={openNewTransaction}
        close={() => setOpenNewTransaction(false)}
        onSave={handleNewTransaction}
      />
    </>
  );
};

const NewTransaction = ({ open, close, onSave }: NewHomeownerTransaction) => {
  const [categories, setCategories] = useState<Category[]>();
  const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);
  const [staffInfo, setStaffInfo] = useState<Staff>();

  const [form] = Form.useForm();

  const { currentUser } = useUserStore();

  const staff = new StaffService();
  const util = new UtilService();

  const getTitle = () => (
    <Typography.Title level={4}>Add New Transaction</Typography.Title>
  );

  const columns: TableColumnsType<Category> = [
    { title: "Category", dataIndex: "category" },
    { title: "Fee", dataIndex: "fee" },
  ];

  const handleSubmit = () => {
    if (selectedCategories.length == 0) {
      message.warning("Please select atleast 1 category");
      return;
    }
    onSave({
      ...form.getFieldsValue(),
      collectedBy: staffInfo,
      categorySelected: selectedCategories.map((e) => e._id),
    });
  };

  useEffect(() => {
    if (open) {
      (async (_) => {
        let res = await _.getCategory();

        if (res?.success ?? false) setCategories(res?.data ?? []);
      })(staff);
      (async (_) => {
        let res = await _.getStakeholder(
          currentUser?._id ?? "",
          currentUser?.type ?? ""
        );

        if (res?.success ?? false) {
          setStaffInfo(res.data?.staffId);
          form.setFieldValue("collectedBy", res.data?.staffId?.name ?? "");
        }
      })(util);
    }
  }, [open]);

  return (
    <Modal
      open={open}
      onCancel={close}
      closable={false}
      okText="ADD"
      title={getTitle()}
      onOk={handleSubmit}
      width={700}
    >
      <Row gutter={[32, 32]}>
        <Col span={10}>
          <Form layout="vertical" form={form}>
            <Form.Item
              label="Date Collected"
              name="dateCollected"
              className="label-no-padding"
              initialValue={dayjs()}
            >
              <DatePicker />
            </Form.Item>
            <Form.Item
              label="Collected By"
              name="collectedBy"
              className="label-no-padding"
            >
              <Input readOnly />
            </Form.Item>
            <Form.Item
              label="Type of Payment"
              name="paymentType"
              className="label-no-padding"
              initialValue="cash"
            >
              <Select
                options={[
                  {
                    label: "Cash",
                    value: "cash",
                  },
                  {
                    label: "Cheque",
                    value: "cheque",
                  },
                ]}
              />
            </Form.Item>
          </Form>
        </Col>
        <Col span={14}>
          <Table
            rowSelection={{
              type: "checkbox",
              onChange: (
                selectedRowKeys: React.Key[],
                selectedRows: Category[]
              ) => {
                setSelectedCategories(selectedRows);
              },
            }}
            columns={columns}
            dataSource={categories}
            pagination={false}
            rowKey={(e) => e._id}
            bordered
          />
          <div style={{ marginTop: 15 }}>
            <label>TotalCollected</label>
            <Input
              readOnly
              value={selectedCategories.reduce((p, n) => p + n.fee, 0)}
            />
          </div>
        </Col>
      </Row>
    </Modal>
  );
};

export default HOTransacDetails;