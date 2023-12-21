import { Button, Form, Input } from "antd";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import ReCAPTCHA from "react-google-recaptcha";
import { hideLoading, showLoading } from "../redux/alertsSlice";

function Login() {
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
      const response = await axios.post("/api/user/login", { ...values, recaptchaValue });
      dispatch(hideLoading());

      if (response.data.success) {
        toast.success(response.data.message);
        localStorage.setItem("token", response.data.data);
        navigate("/");
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
        <h1 className="card-title">Welcome Back</h1>
        <Form layout="vertical" onFinish={onFinish}>
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
            LOGIN
          </Button>

          <Link to="/register" className="anchor mt-2">
            CLICK HERE TO REGISTER
          </Link>
        </Form>
      </div>
    </div>
  );
}

export default Login;
