import React, { useEffect, useState } from "react";
import { Layout, Menu, Avatar, Typography, Modal } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import { ArrowLeftOnRectangleIcon } from "@heroicons/react/24/solid";
import "./sideBar.css";

const { Sider } = Layout;

const SideBar = ({ collapsed, itemMenu }) => {
  const location = useLocation();
  const [logoutModalVisible, setLogoutModalVisible] = useState(false);
  const [selectedKeys, setSelectedKeys] = useState("/");
  const navigate = useNavigate();

  useEffect(() => {
    setSelectedKeys(location.pathname);
  }, [location.pathname]);

  const showLogoutModal = () => setLogoutModalVisible(true);
  const hideLogoutModal = () => setLogoutModalVisible(false);

  const confirmLogout = () => {
    // tạm thời chỉ điều hướng, không call API / cookie
    navigate("/login");
    hideLogoutModal();
  };

  const mockProfile = {
    username: "demo_admin",
    avatar:
      "https://e7.pngegg.com/pngimages/178/595/png-clipart-user-profile-computer-icons-login-user-avatars-monochrome-black.png",
  };

  return (
    <>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div>
          <div className="flex flex-col justify-center items-center my-6">
            <Avatar size={collapsed ? 50 : 100} src={mockProfile.avatar} />
            {collapsed ? null : (
              <Typography className="text-white text-xl mt-2">
                {mockProfile.username}
              </Typography>
            )}
          </div>
          <Menu
            theme="dark"
            selectedKeys={[selectedKeys]}
            mode="inline"
            items={itemMenu}
          />
        </div>
        <button
          onClick={showLogoutModal}
          className={`flex ${
            collapsed ? `justify-center` : `justify-start`
          } items-center px-6 py-2.5 mb-5 rounded-xl logout-button`}
        >
          <ArrowLeftOnRectangleIcon className="text-gray-100 w-6 h6" />
          {collapsed ? null : (
            <span className="text-gray-100 ml-3">Đăng xuất</span>
          )}
        </button>
        <Modal
          title="Confirm Logout"
          open={logoutModalVisible}
          onOk={confirmLogout}
          onCancel={hideLogoutModal}
          okText="Logout"
          cancelText="Cancel"
          okButtonProps={{ style: { background: "red" } }}
        >
          Are you sure you want to logout?
        </Modal>
      </Sider>
    </>
  );
};

export default SideBar;