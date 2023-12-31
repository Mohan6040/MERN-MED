import React, { useEffect, useState } from "react";
import { Row, Col, Card, Form, Input, Button} from "antd";
import Layout from "../../components/Layout";
import { useDispatch, useSelector } from "react-redux";
import { showLoading, hideLoading } from "../../redux/alertsSlice";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import DoctorForm from "../../components/DoctorForm";
import moment from "moment";
import UserProfileForm from "../../components/UserProfile";

const { Item } = Form;

function Profile() {
  const { user } = useSelector((state) => state.user);
  const params = useParams();
  const [doctor, setDoctor] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      dispatch(showLoading());
      const response = await axios.post(
        "/api/doctor/update-doctor-profile",
        {
          ...values,
          userId: user._id,
          timings: [
            moment(values.timings[0]).format("HH:mm"),
            moment(values.timings[1]).format("HH:mm"),
          ],
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      toast.error("Something went wrong");
    }
  };

  const getDoctorData = async () => {
    try {
      dispatch(showLoading());
  
      // Fetch user details
      const userResponse = await axios.get(`/api/user/${params.userId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      // Fetch doctor details
    const doctorResponse = await axios.post(
      "/api/doctor/get-doctor-info-by-user-id",
      {
        userId: params.userId,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    dispatch(hideLoading());

    if (userResponse.data.success && doctorResponse.data.success) {
      const userData = userResponse.data.data;
      const doctorData = doctorResponse.data.data;

      // Combine user and doctor data
      const combinedData = {
        username: userData.username,
        // Add more user details as needed
        doctorDetails: doctorData,
      };

      setDoctor(combinedData);
    }
  } catch (error) {
    console.error(error);
    dispatch(hideLoading());
  }
};

  useEffect(() => {
    getDoctorData();
    
  }, []);
  
  return (
    <Layout>
      <Row justify="space-between" align="middle">
        <Col span={24}>
          <h1 className="page-title"> Profile</h1>
          <hr />
        </Col>
      </Row>

      <Row justify="center">
        <Col xs={24} sm={24} md={18} lg={16} xl={14}>
          {user ? (
            <Card title="Profile Information" style={{ marginBottom: "20px" }}>
              <DoctorForm onFinish={onFinish} initialValues={doctor} />
              {/* <div>
      <h1>User Profile</h1>
      <UserProfileForm />
    </div> */}
              {/* Additional Profile Information */}
              <h2 style={{ marginTop: "20px" }}>Additional Information</h2>
              <Form layout="vertical">
                <Item label="Specialization" name="specialization">
                  <Input />
                </Item>

                <Item>
                  <Button type="primary" htmlType="submit">
                    Save Changes
                  </Button>
                </Item>
              </Form>
            </Card>
          ) : (
            <p>Loading...</p>
          )}
        </Col>
      </Row>
    </Layout>
  );
}

export default Profile;
