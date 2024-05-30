import React, { useEffect, useRef, useState } from "react";
import {
  AutoComplete,
  Button,
  Checkbox,
  Col,
  DatePicker,
  Form,
  Input,
  Modal,
  Row,
  Select,
  Space,
  Steps,
  Table,
  TableColumnsType,
  Tag,
  Tooltip,
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
  User,
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
  const [dues, setDues] = useState<Transaction[]>([]);
  const [services, setServices] = useState<Transaction[]>([]);
  const [trigger, setTrigger] = useState(0);

  const userService = new UserService();
  const staff = new StaffService();

  const { currentUser } = useUserStore();

  const columns1: TableColumnsType<Transaction> = [
    {
      title: "Date",
      width: 100,
      render: (_, { createdAt }) => dayjs(createdAt).format("MMM DD 'YY"),
    },
    {
      title: "Name",
      width: 200,
      render: (_, { homeownerId }: { homeownerId: any }) =>
        `${homeownerId?.name} ${homeownerId?.lastname}`,
    },
    { title: "OR#", width: 200 },
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
    {
      title: "Monthly Due/Annual Due",
      render: (_, { categorySelected }) => (
        <Space>
          {categorySelected.map((e: any) => (
            <Tooltip title={e.description}>
              <Tag>{e.category}</Tag>
            </Tooltip>
          ))}
        </Space>
      ),
    },
    {
      title: "Status",
      render: (_, row) => statusBadge(row),
    },
  ];

  const columns2: TableColumnsType<Transaction> = [
    {
      title: "Date",
      width: 100,
      render: (_, { createdAt }) => dayjs(createdAt).format("MMM DD 'YY"),
    },
    {
      title: "Name",
      width: 200,
      render: (_, { homeownerId }: { homeownerId: any }) =>
        `${homeownerId?.name} ${homeownerId?.lastname}`,
    },
    { title: "OR#", width: 200 },
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
    {
      title: "Service / Rental",
      render: (_, { categorySelected }) => (
        <Space>
          {categorySelected.map((e: any) => (
            <Tooltip title={e.description}>
              <Tag>{e.category}</Tag>
            </Tooltip>
          ))}
        </Space>
      ),
    },
    {
      title: "Status",
      render: (_, row) => statusBadge(row),
    },
  ];

  const handleNewTransaction = (data: any) => {
    (async (_) => {
      let res = await _.newTransaction({
        ...data,
        homeownerId: user.homeownerId?._id,
      });

      if (res?.success ?? false) {
        message.success(res?.message ?? "Success");
        setOpenNewTransaction(false);
        setTrigger(trigger + 1);
      }
    })(userService);
  };

  useEffect(() => {
    (async (_) => {
      let res = await _.getTransaction(user.homeownerId?._id);
      if (res?.success ?? false) {
        setDues(res?.data?.[0] ?? []);
        setServices(res?.data?.[1] ?? []);
      }
    })(userService);
  }, [trigger]);

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
          <Button onClick={goBack} size="large" icon={<LeftOutlined />}>
            Back
          </Button>
        ) : null}

        {currentUser?.type != "homeowner" && (
          <Button
            icon={<PlusOutlined />}
            onClick={() => setOpenNewTransaction(true)}
          >
            Add New Transaction
          </Button>
        )}
      </div>
      <Typography.Title level={4}>Dues</Typography.Title>
      <Table
        rowKey={(e) => e?._id ?? ""}
        columns={columns1}
        dataSource={dues}
        pagination={false}
        style={{
          marginBottom: 20,
        }}
      />
      <Typography.Title level={4}>Rentals / Services</Typography.Title>
      <Table
        rowKey={(e) => e?._id ?? ""}
        columns={columns2}
        dataSource={services}
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

const NewTransaction = ({
  open,
  close,
  onSave,
  fromDue,
}: NewHomeownerTransaction) => {
  const [categories, setCategories] = useState<Category[]>();
  const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);
  const [homeowner, setHomeOwners] = useState<User[]>([]);
  const [selectedHomeowner, setSelectedHomeowner] = useState<User | null>(null);
  const [staffInfo, setStaffInfo] = useState<Staff>();
  const [step, setStep] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const [complete, setComplete] = useState(false);

  const [form] = Form.useForm();

  const { currentUser } = useUserStore();

  const staff = new StaffService();
  const util = new UtilService();
  const user = new UserService();

  const getTitle = () => (
    <Typography.Title level={4}>Add New Transaction</Typography.Title>
  );

  const columns: TableColumnsType<Category> = [
    {
      title: (
        <Typography.Text
          style={{
            fontSize: "1.35em",
          }}
        >
          Category
        </Typography.Text>
      ),
      dataIndex: "category",
    },
    {
      title: (
        <Typography.Text
          style={{
            fontSize: "1.35em",
            display: "block",
            textAlign: "center",
          }}
        >
          Fee
        </Typography.Text>
      ),
      dataIndex: "fee",
      align: "right",
      width: 50,
      render: (_) =>
        `₱${_.toLocaleString(undefined, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}`,
    },
  ];

  const handleSubmit = () => {
    if (fromDue && step == 0) {
      if (selectedHomeowner == null) {
        message.warning("Select a Home Owner first");
      } else setStep(1);
      return;
    }

    if (selectedCategories.length == 0) {
      message.warning("Please select atleast 1 category");
      return;
    }

    onSave({
      ...form.getFieldsValue(),
      collectedBy: staffInfo,
      categorySelected: selectedCategories.map((e) => e._id),
      complete,
      ...(fromDue
        ? {
            userId: selectedHomeowner?.homeownerId?._id,
          }
        : {}),
    });
  };

  const runTimer = (e: string) => {
    if (timerRef.current) clearTimeout(timerRef.current);

    timerRef.current = setTimeout(() => searchUser(e), 500);
  };

  const searchUser = async (key: string) => {
    await user
      .getUsers({ search: key })
      .then((e) => setHomeOwners(e.data ?? []));
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
      onCancel={() => {
        setStep(0);
        form.resetFields();
        setComplete(false);
        setSelectedHomeowner(null);
        close();
      }}
      closable={false}
      okText={fromDue && step == 0 ? "NEXT" : "ADD"}
      title={getTitle()}
      onOk={handleSubmit}
      width={700}
      destroyOnClose
    >
      {fromDue && (
        <Steps
          current={step}
          style={{
            marginBottom: 25,
          }}
          items={[
            {
              title: "Select Homeowner",
            },
            {
              title: "Transaction Details",
            },
          ]}
        />
      )}
      {(fromDue && step == 1) || !fromDue ? (
        <Row gutter={[32, 32]}>
          <Col span={10}>
            <Form layout="vertical" form={form}>
              <Form.Item
                label="Date Collected / Due Date"
                name="dateCollected"
                className="label-no-padding"
                initialValue={dayjs()}
              >
                <DatePicker size="large" />
              </Form.Item>
              <Form.Item
                label="Collected By"
                name="collectedBy"
                className="label-no-padding"
              >
                <Input readOnly size="large" />
              </Form.Item>
              <Form.Item
                label="Type of Payment"
                name="paymentType"
                className="label-no-padding"
                initialValue="cash"
              >
                <Select
                  size="large"
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
              <div
                style={{
                  cursor: "pointer",
                }}
                onClick={() => setComplete(!complete)}
              >
                <Checkbox style={{ marginRight: 10 }} checked={complete} />{" "}
                <label
                  style={{
                    cursor: "pointer",
                  }}
                >
                  Mark as completed
                </label>
              </div>
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
                getCheckboxProps: (row: Category) => ({
                  disabled:
                    fromDue &&
                    (row.category.toLocaleLowerCase().includes("monthly") ||
                      row.category.toLocaleLowerCase().includes("yearly")),
                }),
              }}
              columns={columns}
              dataSource={categories}
              pagination={false}
              rowKey={(e) => e._id}
              bordered
            />
            <div style={{ marginTop: 15 }}>
              <label style={{ marginRight: 10 }}>Total Collected:</label>
              <span style={{ fontSize: "1.2em" }}>
                ₱{" "}
                {selectedCategories
                  .reduce((p, n) => p + n.fee, 0)
                  .toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
              </span>
            </div>
          </Col>
        </Row>
      ) : (
        <AutoComplete
          onChange={(_) => {
            if (_ != "") runTimer(_);
          }}
          style={{
            width: "100%",
            marginBottom: 10,
          }}
          filterOption={(inputValue, option) =>
            option!
              .value!.toString()
              .toUpperCase()
              .indexOf(inputValue.toUpperCase()) !== -1
          }
          options={homeowner.map((e) => ({
            label: `${e.homeownerId?.name} ${e.homeownerId?.lastname}  (${e.username})`,
            value: e.homeownerId?.name + " " + e.homeownerId?.lastname,
            key: e._id,
          }))}
          onSelect={(_, e) =>
            setSelectedHomeowner(homeowner.filter((p) => p._id == e.key)[0])
          }
          size="large"
          autoFocus
          allowClear
        />
      )}
    </Modal>
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

export { NewTransaction };
export default HOTransacDetails;
