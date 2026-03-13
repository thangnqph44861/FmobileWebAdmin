import React, { useEffect, useState } from "react";
import { Layout, notification, theme } from "antd";
import { Link, Outlet, useNavigate } from "react-router-dom";
import {
  HomeIcon,
  Squares2X2Icon,
  UserGroupIcon,
  ClipboardDocumentListIcon,
} from "@heroicons/react/24/solid";
import SideBar from "./components/SideBar";
import HeaderBar from "./components/HeaderBar";
import { useDispatch } from "react-redux";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import { fetchMyProfileRequest } from "./redux/actions/MyProfile";
import { fetchCustomerRequest } from "./redux/actions/Customer";

const { Content } = Layout;

function getItem(label, key, icon, children) {
  return { key, icon, children, label };
}

const App = () => {
  const [collapsed, setCollapsed] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = Cookies.get("token");

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const itemMenu = [
    getItem(<Link to="/">Trang chủ</Link>, "/", <HomeIcon className="w-5 h-5" />),
    getItem("Sản phẩm", "product", <Squares2X2Icon className="w-5 h-5" />, [
      getItem(<Link to="/products">Sản phẩm</Link>, "/products"),
      getItem(<Link to="/categories">Loại sản phẩm</Link>, "/categories"),
      getItem(<Link to="/banner">Quảng cáo</Link>, "/banner"),
    ]),
    getItem(
      <Link to="/invoice">Hóa đơn</Link>,
      "/invoice",
      <ClipboardDocumentListIcon className="w-5 h-5" />
    ),
    getItem("Mọi người", "user", <UserGroupIcon className="w-5 h-5" />, [
      getItem(<Link to="/customers">Người dùng</Link>, "/customers"),
    ]),
  ];

  // Check login + token expiration

  // Fetch dữ liệu ban đầu (profile + danh mục, sản phẩm, khách hàng...)
  useEffect(() => {
  const token = Cookies.get("token");
  if (!token) return;

  try {
    const decoded = jwtDecode(token);
    dispatch(fetchMyProfileRequest(decoded.userId, token));
  } catch (e) {
    // ignore
  }
}, [dispatch]);

  useEffect(() => {
    dispatch(fetchCustomerRequest("customer", token));
  }, []);

  return (
    <Layout className="h-[100vh]">
      <SideBar collapsed={collapsed} itemMenu={itemMenu} />
      <Layout className="h-[100vh]">
        <HeaderBar
          toggleMenu={() => setCollapsed(!collapsed)}
          collapsed={collapsed}
        />
        <Content
          style={{
            margin: "10px 10px",
            padding: 24,
            background: colorBgContainer,
            overflow: "auto",
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default App;