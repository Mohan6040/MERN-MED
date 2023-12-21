import { Button, Form, Input } from "antd";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import toast from "react-hot-toast";
import ReCAPTCHA from "react-google-recaptcha";
import { hideLoading, showLoading } from "../redux/alertsSlice";

function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [recaptchaValue, setRecaptchaValue] = useState(null);

  const onFinish = async (values) => {
    try {
      if (!recaptchaValue) {
        toast.error("Please complete the ReCAPTCHA");
        return;
      }

      dispatch(showLoading());
      const response = await axios.post("/api/user/register", { ...values, recaptchaValue });
      dispatch(hideLoading());

      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/login");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      toast.error("Something went wrong");
    }
  };

  const onRecaptchaChange = (value) => {
    setRecaptchaValue(value);
  };

  return (
    <div className="authentication">
      <div className="authentication-form card p-3">
        <h1 className="card-title">Nice To Meet U</h1>
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item label="Name" name="name" rules={[{ required: true, message: 'Please enter your name' }]}>
            <Input placeholder="Name" />
          </Form.Item>
          <Form.Item label="Email" name="email" rules={[{ required: true, message: 'Please enter your email' }]}>
            <Input placeholder="Email" />
          </Form.Item>
          <Form.Item label="Password" name="password" rules={[{ required: true, message: 'Please enter your password' }]}>
            <Input placeholder="Password" type="password" />
          </Form.Item>

          <Form.Item>
            <ReCAPTCHA sitekey="6Lf7eyQpAAAAABP44pO0L6bvtrOV5FnLLk1kGIrR" onChange={onRecaptchaChange} />
          </Form.Item>

          <Button className="primary-button my-2 full-width-button" htmlType="submit">
            REGISTER
          </Button>

          <Link to="/login" className="anchor mt-2">
            CLICK HERE TO LOGIN
          </Link>
        </Form>
      </div>
    </div>
  );
}

export default Register;
