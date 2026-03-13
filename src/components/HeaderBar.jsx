import React, { useState } from "react";
import {
  Layout,
  Button,
  Dropdown,
  Modal,
  Form,
  Input,
  DatePicker,
  Flex,
} from "antd";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { UserIcon } from "@heroicons/react/24/solid";

const { Header } = Layout;

const HeaderBar = ({ toggleMenu, collapsed }) => {
  const [openDialogChangePassword, setOpenDialogChangePassword] =
    useState(false);
  const [openDialogChangeProfile, setOpenDialogChangeProfile] = useState(false);

  const itemsUser = [
    { label: "Đổi mật khẩu", key: "0" },
    { label: "Chỉnh sửa profile", key: "1" },
  ];

  const handleClickDropdown = (e) => {
    if (e.key === "0") setOpenDialogChangePassword(true);
    if (e.key === "1") setOpenDialogChangeProfile(true);
  };

  return (
    <>
      <Header
        style={{
          padding: 0,
          background: "#ffffff",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Button
          type="text"
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={toggleMenu}
          style={{ fontSize: "16px", width: 64, height: 64 }}
        />
        <div className="mx-10 flex items-center">
          <Dropdown
            menu={{ items: itemsUser, onClick: handleClickDropdown }}
            arrow={{ pointAtCenter: true }}
            trigger={["click"]}
          >
            <Button
              onClick={(e) => e.preventDefault()}
              icon={<UserIcon className="h-5 w-5" />}
            />
          </Dropdown>
        </div>
      </Header>

      <DialogChangeProfile
        visible={openDialogChangeProfile}
        onCancel={() => setOpenDialogChangeProfile(false)}
      />
      <DialogChangePassword
        visible={openDialogChangePassword}
        onCancel={() => setOpenDialogChangePassword(false)}
      />
    </>
  );
};

const DialogChangeProfile = ({ visible, onCancel }) => {
  const [form] = Form.useForm();

  const handleFinish = () => {
    form.resetFields();
    onCancel();
  };

  return (
    <Modal open={visible} footer={null} onCancel={onCancel}>
      <Flex className="bg-white" vertical>
        <p className="text-xl font-bold self-center my-5">
          Chỉnh sửa thông tin cá nhân
        </p>
        <Form form={form} layout="vertical" size="middle" onFinish={handleFinish}>
          <Form.Item name="email" label="Email" initialValue="user@example.com">
            <Input disabled />
          </Form.Item>
          <Form.Item name="username" label="Username" initialValue="demo_user">
            <Input placeholder="enter your username" />
          </Form.Item>
          <Form.Item name="full_name" label="Full Name" initialValue="Demo User">
            <Input placeholder="enter your full name" />
          </Form.Item>
          <Form.Item name="birthday" label="Birthday">
            <DatePicker className="w-full" placeholder="select birthday" />
          </Form.Item>

          <div className="flex flex-row items-center justify-between ">
            <Form.Item>
              <Button htmlType="reset" className="w-[230px]">
                Clear
              </Button>
            </Form.Item>

            <Form.Item>
              <Button
                htmlType="submit"
                type="primary"
                className="bg-[#407cff] px-10 w-[230px]"
              >
                Submit
              </Button>
            </Form.Item>
          </div>
        </Form>
      </Flex>
    </Modal>
  );
};

const DialogChangePassword = ({ visible, onCancel }) => {
  const [form] = Form.useForm();

  const handleFinish = () => {
    form.resetFields();
    onCancel();
  };

  const handleClear = () => {
    form.resetFields();
    onCancel();
  };

  return (
    <Modal open={visible} footer={null} onCancel={onCancel} closeIcon={false}>
      <Flex vertical>
        <p className="text-xl font-bold self-center my-5">Change Password</p>
        <Form form={form} layout="vertical" onFinish={handleFinish}>
          <Form.Item
            label="Mật khẩu cũ"
            name={"oldPassword"}
            rules={[{ required: true, message: "Hãy nhập mật khẩu cũ của bạn" }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            label="Mật khẩu mới"
            name={"newPassword"}
            rules={[
              { required: true, message: "hãy nhập mật khẩu mới của bạn" },
              { min: 8, message: "Mật khẩu mới phải có ít nhât 8 ký tự" },
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            label="Xác nhận mật khẩu"
            name={"confirmPassword"}
            rules={[
              { required: true, message: "Nhập lại mật khẩu" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("newPassword") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("Mật khẩu không khớp"));
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>

          <div className="flex flex-row items-center justify-between">
            <Form.Item>
              <Button
                htmlType="button"
                className="w-[230px]"
                onClick={handleClear}
              >
                Clear
              </Button>
            </Form.Item>

            <Form.Item>
              <Button
                htmlType="submit"
                type="primary"
                className="bg-[#407cff] px-10 w-[230px]"
              >
                Submit
              </Button>
            </Form.Item>
          </div>
        </Form>
      </Flex>
    </Modal>
  );
};

export default HeaderBar;