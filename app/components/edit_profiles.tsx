import React, { useEffect, useState } from "react";
import {
  Button,
  Col,
  Form,
  Input,
  Modal,
  Row,
  Space,
  Steps,
  Typography,
  message,
} from "antd";
import bcrypt from "bcryptjs";

import { useUserStore } from "@/services/context";
import {
  RegistrationService,
  StaffService,
  TreasurerService,
  UserService,
} from "@/services";

const EditProfile = ({ open, close }: { open: boolean; close: () => void }) => {
  const [step, setStep] = useState(0);
  const [input, setInput] = useState<any>({});

  const { currentUser, setUser } = useUserStore();

  const treasurer = new TreasurerService();
  const user = new UserService();
  const staff = new StaffService();
  const register = new RegistrationService();

  const handleUpdate = async () => {
    if (currentUser?.type == "treasurer") {
      if (step == 0) {
        await treasurer
          .updateTreasurer(currentUser?.treasurerId?._id ?? "", {
            name: input?.treasurerId?.name,
          })
          .then((e) => {
            setUser({ ...currentUser, treasurerId: e.data });
            message.success(e.message);
            setStep(0);
          });
      } else {
        await user.updateUser(currentUser?._id ?? "", input).then((e) => {
          setUser(e.data);
          message.success(e.message);
          setStep(0);
        });
      }
    } else if (currentUser?.type == "staff") {
      if (step == 0) {
        await staff
          .updateStaff(currentUser?.staffId?._id ?? "", input.staffId)
          .then((e) => {
            setUser({ ...currentUser, staffId: e.data });
            message.success(e.message);
            setStep(0);
          });
      } else {
        await user.updateUser(currentUser?._id ?? "", input).then((e) => {
          setUser(e.data);
          message.success(e.message);
          setStep(0);
        });
      }
    } else if (currentUser?.type == "homeowner") {
      if (step == 0) {
        await register
          .updateHomeowner(
            currentUser?.homeownerId?._id ?? "",
            input.homeownerId
          )
          .then((e) => {
            setUser({ ...currentUser, homeownerId: e.data });
            message.success(e.message);
            setStep(0);
          });
      } else {
        await user.updateUser(currentUser?._id ?? "", input).then((e) => {
          setUser(e.data);
          message.success(e.message);
          setStep(0);
        });
      }
    }
  };

  const showForm = () => {
    switch (currentUser?.type) {
      case "treasurer": {
        return (
          <div
            style={{
              marginTop: 20,
            }}
          >
            {showTreasureForm()}
          </div>
        );
      }

      case "staff": {
        return (
          <div
            style={{
              marginTop: 20,
            }}
          >
            {showStaffForm()}
          </div>
        );
      }

      case "homeowner": {
        return (
          <div
            style={{
              marginTop: 20,
            }}
          >
            {showHomeownerForm()}
          </div>
        );
      }
    }
  };

  const showTreasureForm = () => {
    return step == 0 ? (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <label style={{ fontSize: "1.5em", marginRight: 20 }}>Name</label>
        <Input
          size="large"
          style={{ width: "100%" }}
          value={input?.treasurerId?.name}
          onChange={(e) =>
            setInput({
              ...input,
              treasurerId: {
                ...input.treasurerId,
                name: e.target.value,
              },
            })
          }
        />
      </div>
    ) : (
      <Space direction="vertical">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <label style={{ fontSize: "1.5em", marginRight: 20, width: 200 }}>
            Username
          </label>
          <Input
            size="large"
            style={{ width: "100%" }}
            value={input?.username}
            onChange={(e) =>
              setInput({
                ...input,
                username: e.target.value,
              })
            }
          />
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <label style={{ fontSize: "1.5em", marginRight: 20, width: 200 }}>
            Password
          </label>
          <Input.Password
            size="large"
            style={{ width: "100%" }}
            onChange={async (e) => {
              let password = await bcrypt.hash("password", 8);
              setInput({
                ...input,
                password,
              });
            }}
          />
        </div>
      </Space>
    );
  };

  const showStaffForm = () => {
    return step == 0 ? (
      <Space direction="vertical">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <label style={{ fontSize: "1.5em", marginRight: 20 }}>Name</label>
          <Input
            size="large"
            style={{ width: "100%" }}
            value={input?.staffId?.name}
            onChange={(e) =>
              setInput({
                ...input,
                staffId: {
                  ...input.staffId,
                  name: e.target.value,
                },
              })
            }
          />
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <label style={{ fontSize: "1.5em", marginRight: 20 }}>Phone</label>
          <Input
            size="large"
            style={{ width: "100%" }}
            value={input?.staffId?.phone}
            maxLength={11}
            onChange={(e) =>
              setInput({
                ...input,
                staffId: {
                  ...input.staffId,
                  phone: e.target.value,
                },
              })
            }
          />
        </div>
      </Space>
    ) : (
      <Space direction="vertical">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <label style={{ fontSize: "1.5em", marginRight: 20, width: 200 }}>
            Username
          </label>
          <Input
            size="large"
            style={{ width: "100%" }}
            value={input?.username}
            onChange={(e) =>
              setInput({
                ...input,
                username: e.target.value,
              })
            }
          />
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <label style={{ fontSize: "1.5em", marginRight: 20, width: 200 }}>
            Password
          </label>
          <Input.Password
            size="large"
            style={{ width: "100%" }}
            onChange={async (e) => {
              let password = await bcrypt.hash("password", 8);
              setInput({
                ...input,
                password,
              });
            }}
          />
        </div>
      </Space>
    );
  };

  const showHomeownerForm = () => {
    // homeownerId
    return step == 0 ? (
      <Space direction="vertical">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <label style={{ fontSize: "1.5em", marginRight: 20, width: 200 }}>
            Name
          </label>
          <Input
            size="large"
            style={{ width: "100%" }}
            value={input?.homeownerId?.name}
            onChange={(e) =>
              setInput({
                ...input,
                homeownerId: {
                  ...input.homeownerId,
                  name: e.target.value,
                },
              })
            }
          />
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <label style={{ fontSize: "1.5em", marginRight: 20, width: 200 }}>
            Middle Name
          </label>
          <Input
            size="large"
            style={{ width: "100%" }}
            placeholder="optional"
            value={input?.homeownerId?.middlename}
            onChange={(e) =>
              setInput({
                ...input,
                homeownerId: {
                  ...input.homeownerId,
                  middlename: e.target.value,
                },
              })
            }
          />
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <label style={{ fontSize: "1.5em", marginRight: 20, width: 200 }}>
            Last Name
          </label>
          <Input
            size="large"
            style={{ width: "100%" }}
            value={input?.homeownerId?.lastname}
            onChange={(e) =>
              setInput({
                ...input,
                homeownerId: {
                  ...input.homeownerId,
                  lastname: e.target.value,
                },
              })
            }
          />
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <label style={{ fontSize: "1.5em", marginRight: 20, width: 200 }}>
            Email
          </label>
          <Input
            size="large"
            style={{ width: "100%" }}
            value={input?.homeownerId?.email}
            onChange={(e) =>
              setInput({
                ...input,
                homeownerId: {
                  ...input.homeownerId,
                  email: e.target.value,
                },
              })
            }
          />
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <label style={{ fontSize: "1.5em", marginRight: 20, width: 200 }}>
            Phone
          </label>
          <Input
            size="large"
            style={{ width: "100%" }}
            value={input?.homeownerId?.phone}
            maxLength={11}
            onChange={(e) =>
              setInput({
                ...input,
                homeownerId: {
                  ...input.homeownerId,
                  phone: e.target.value,
                },
              })
            }
          />
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <label style={{ fontSize: "1.5em", marginRight: 20, width: 200 }}>
            Address
          </label>
          <Input
            size="large"
            style={{ width: "100%" }}
            value={input?.homeownerId?.address}
            onChange={(e) =>
              setInput({
                ...input,
                homeownerId: {
                  ...input.homeownerId,
                  address: e.target.value,
                },
              })
            }
          />
        </div>
      </Space>
    ) : (
      <Space direction="vertical">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <label style={{ fontSize: "1.5em", marginRight: 20, width: 200 }}>
            Username
          </label>
          <Input
            size="large"
            style={{ width: "100%" }}
            value={input?.username}
            onChange={(e) =>
              setInput({
                ...input,
                username: e.target.value,
              })
            }
          />
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <label style={{ fontSize: "1.5em", marginRight: 20, width: 200 }}>
            Password
          </label>
          <Input.Password
            size="large"
            style={{ width: "100%" }}
            onChange={async (e) => {
              let password = await bcrypt.hash("password", 8);
              setInput({
                ...input,
                password,
              });
            }}
          />
        </div>
      </Space>
    );
  };

  useEffect(() => {
    if (open) setInput({ ...currentUser });
  }, [open]);

  return (
    <Modal
      open={open}
      onCancel={() => {
        setStep(0);
        close();
      }}
      closable={false}
      footer={
        <Button
          type="primary"
          block
          size="large"
          style={{ width: 200 }}
          onClick={handleUpdate}
        >
          UPDATE
        </Button>
      }
      width={800}
      styles={{
        body: {
          minHeight: 200,
        },
      }}
    >
      <Row>
        <Col span={8}>
          <Steps
            current={step}
            direction="vertical"
            onChange={setStep}
            items={[
              {
                title: "Personal Details",
              },
              {
                title: "Credentials",
              },
            ]}
          />
        </Col>
        <Col span={16}>{showForm()}</Col>
      </Row>
    </Modal>
  );
};

export default EditProfile;
