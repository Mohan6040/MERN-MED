import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Layout from '../components/Layout';
import { Col, Row, Spin } from 'antd';
import Doctor from '../components/Doctor';
import { useDispatch, useSelector } from 'react-redux';
import { showLoading, hideLoading } from '../redux/alertsSlice';

function Home() {
  const [doctors, setDoctors] = useState([]);
  const dispatch = useDispatch();

  const getData = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.get('/api/user/get-all-approved-doctors', {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      });
      dispatch(hideLoading());
      if (response.data.success) {
        setDoctors(response.data.data);
      }
    } catch (error) {
      dispatch(hideLoading());
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Layout>
      <div style={{ marginBottom: '20px' }}>
        <h1>Welcome to the Hospital Management System</h1>
        <p>Find and connect with our approved doctors below:</p>
      </div>

      <Row gutter={20}>
        {doctors.length > 0 ? (
          doctors.map((doctor) => (
            <Col key={doctor._id} span={8} xs={24} sm={24} lg={8}>
              <Doctor doctor={doctor} />
            </Col>
          ))
        ) : (
          <Col span={24}>
            <Spin size="large" />
          </Col>
        )}
      </Row>
    </Layout>
  );
}

export default Home;
