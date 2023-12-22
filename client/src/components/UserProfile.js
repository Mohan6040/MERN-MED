import React from "react";
import { Button, Col, Form, Input, Row } from "antd";

function UserProfileForm({ onFinish, initialValues }) {
  return (
    <Form
      layout="vertical"
      onFinish={onFinish}
      initialValues={initialValues}
    >
      <h1 className="card-title mt-3">Personal Information</h1>
      <Row gutter={20}>
        <Col span={8} xs={24} sm={24} lg={8}>
          <Form.Item
            label="First Name"
            name="firstName"
          >
            <Input placeholder="First Name" />
          </Form.Item>
        </Col>
        {/* Add other personal information fields here */}
      </Row>
      <hr />
      <h1 className="card-title mt-3">Professional Information</h1>
      <Row gutter={20}>
        <Col span={8} xs={24} sm={24} lg={8}>
          <Form.Item
            label="Occupation"
            name="occupation"
          >
            <Input placeholder="Occupation" />
          </Form.Item>
        </Col>
        {/* Add other professional information fields here */}
      </Row>

      <div className="d-flex justify-content-end">
        <Button className="primary-button" htmlType="submit">
          SAVE
        </Button>
      </div>
    </Form>
  );
}

export default UserProfileForm;
