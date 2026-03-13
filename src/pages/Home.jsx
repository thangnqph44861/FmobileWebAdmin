import React, { useState } from "react";
import "./home.css";
import { Card, Flex, Statistic, Table, Typography } from "antd";
import CountUp from "react-countup";
import { DatePicker, Space } from "antd";

const formatter = (value) => <CountUp end={value} separator="," />;

const formatterVND = (value) => (
  <>
    <CountUp end={value} separator="," /> {" VNĐ"}
  </>
);

// DỮ LIỆU MOCK
const mockTotalUsers = 1200;
const mockTotalRevenue = 150000000;
const mockOrdersSuccessfully = 320;

const mockTop5ProductByRevenue = [
  {
    _id: "p1",
    productName: "Sản phẩm A",
    productImage: "https://via.placeholder.com/64",
    totalRevenue: 50000000,
  },
  {
    _id: "p2",
    productName: "Sản phẩm B",
    productImage: "https://via.placeholder.com/64",
    totalRevenue: 30000000,
  },
];

const mockTop10ProductSelling = [
  {
    id: "s1",
    productName: "Sản phẩm C",
    productImage: "https://via.placeholder.com/64",
    totalQuantitySold: 120,
  },
  {
    id: "s2",
    productName: "Sản phẩm D",
    productImage: "https://via.placeholder.com/64",
    totalQuantitySold: 90,
  },
];

const mockTop5UserByProduct = [
  {
    id: "u1",
    username: "user01",
    userId: "abc123",
    totalSuccessfulOrders: 25,
  },
  {
    id: "u2",
    username: "user02",
    userId: "xyz789",
    totalSuccessfulOrders: 18,
  },
];

const mockTopLeastSellingProducts = [
  {
    id: "l1",
    productName: "Sản phẩm E",
    productImage: "https://via.placeholder.com/64",
    totalQuantitySold: 3,
  },
  {
    id: "l2",
    productName: "Sản phẩm F",
    productImage: "https://via.placeholder.com/64",
    totalQuantitySold: 5,
  },
];

const Home = () => {
  const [dateRange, setDateRange] = useState(null);

  const handleDateRangeChange = (dates) => {
    setDateRange(dates || null);
  };

  const columns = [
    {
      title: "STT",
      dataIndex: "index",
      key: "index",
      render: (text, record, index) => index + 1,
      width: 50,
    },
    {
      title: "Tên sản phẩm",
      dataIndex: "productName",
      key: "name",
    },
    {
      title: "Hình ảnh",
      dataIndex: "productImage",
      key: "productImage",
      render: (text) => <img src={text} className="w-16" alt="product" />,
    },
    {
      title: "Tổng doanh thu",
      dataIndex: "totalRevenue",
      key: "totalRevenue",
      render: (text) => (
        <Typography>
          {text ? text.toLocaleString("vi-VN") + " đ" : ""}
        </Typography>
      ),
    },
  ];

  const columns2 = [
    {
      title: "STT",
      dataIndex: "index",
      key: "index",
      render: (text, record, index) => index + 1,
      width: 50,
    },
    {
      title: "Tên sản phẩm",
      dataIndex: "productName",
      key: "name",
    },
    {
      title: "Hình ảnh",
      dataIndex: "productImage",
      key: "productImage",
      render: (text) => <img src={text} className="w-16" alt="product" />,
    },
    {
      title: "Số lượng bán",
      dataIndex: "totalQuantitySold",
      key: "totalQuantitySold",
      render: (text) => (
        <Typography>{text ? text.toLocaleString("vi-VN") : ""}</Typography>
      ),
    },
  ];

  const columns3 = [
    {
      title: "STT",
      dataIndex: "index",
      key: "index",
      render: (text, record, index) => index + 1,
      width: 50,
    },
    {
      title: "Tên người dùng",
      dataIndex: "username",
      key: "name",
    },
    {
      title: "ID user",
      dataIndex: "userId",
      key: "userId",
    },
    {
      title: "Số đơn thành công",
      dataIndex: "totalSuccessfulOrders",
      key: "totalSuccessfulOrders",
      render: (text) => (
        <Typography>{text ? text.toLocaleString("vi-VN") : ""}</Typography>
      ),
    },
  ];

  return (
    <div style={{ width: "100%" }}>
      {/* Cards thống kê */}
      <Flex vertical={false}>
        <Card bordered size="default" className="shadow-md  m-3">
          <Statistic
            title="Người dùng kích hoạt"
            value={mockTotalUsers}
            formatter={formatter}
          />
        </Card>

        <Card bordered size="default" className="shadow-md m-3">
          <Statistic
            title="Tổng doanh thu"
            value={mockTotalRevenue}
            formatter={formatterVND}
          />
        </Card>

        <Card bordered size="default" className="shadow-md m-3">
          <Statistic
            title="Tổng đơn hàng thành công"
            value={mockOrdersSuccessfully}
            formatter={formatter}
          />
        </Card>

        <Card bordered size="default" className="shadow-md  m-3">
          <Statistic
            title="Sản phẩm hiện có"
            value={mockTop10ProductSelling.length}
            formatter={formatter}
          />
        </Card>
      </Flex>

      {/* Bộ lọc thời gian */}
      <div>
        <div className="my-4">Chọn thời gian thống kê:</div>
        <Space direction="vertical" size={15}>
          <DatePicker.RangePicker onChange={handleDateRangeChange} />
        </Space>
      </div>

      {/* 2 bảng trên */}
      <div className="flex">
        <div className="w-1/2 p-3">
          <div className="flex flex-col border rounded-md shadow-lg">
            <div className="p-2 px-5">
              <Typography.Title level={4} style={{ marginBottom: 0 }}>
                Top sản phẩm có doanh thu cao nhất
              </Typography.Title>
            </div>
            <Table
              pagination={false}
              dataSource={mockTop5ProductByRevenue}
              columns={columns}
              rowKey={(record) => record._id}
            />
          </div>
        </div>

        <div className="w-1/2 p-3">
          <div className="flex flex-col border rounded-md shadow-lg">
            <div className="p-2 px-5">
              <Typography.Title level={4} style={{ marginBottom: 0 }}>
                Top sản phẩm bán chạy nhất
              </Typography.Title>
            </div>
            <Table
              pagination={false}
              dataSource={mockTop10ProductSelling}
              columns={columns2}
              rowKey={(record) => record.id}
            />
          </div>
        </div>
      </div>

      {/* 2 bảng dưới */}
      <div className="flex">
        <div className="w-1/2 p-3">
          <div className="flex flex-col border rounded-md shadow-lg">
            <div className="p-2 px-5">
              <Typography.Title level={4} style={{ marginBottom: 0 }}>
                Top khách hàng mua nhiều nhất
              </Typography.Title>
            </div>
            <Table
              pagination={false}
              dataSource={mockTop5UserByProduct}
              columns={columns3}
              rowKey={(record) => record.id}
            />
          </div>
        </div>

        <div className="w-1/2 p-3">
          <div className="flex flex-col border rounded-md shadow-lg">
            <div className="p-2 px-5">
              <Typography.Title level={4} style={{ marginBottom: 0 }}>
                Top sản phẩm bán ít nhất
              </Typography.Title>
            </div>
            <Table
              pagination={false}
              dataSource={mockTopLeastSellingProducts}
              columns={columns2}
              rowKey={(record) => record.id}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;