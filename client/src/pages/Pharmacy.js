// Pharmacy.js
import React, { useState } from "react";
import { Button, Form, Input, Card, List, Modal } from "antd";
import Layout from "../components/Layout";
import { useDispatch, useSelector } from "react-redux";
import { showLoading, hideLoading } from "../redux/alertsSlice";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Pharmacy = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const [selectedMedicineId, setSelectedMedicineId] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [currentMedicine, setCurrentMedicine] = useState({});
  const [medicines, setMedicines] = useState([
    {
      id: 1,
      name: "Paracetamol",
      description: "For pain and fever relief and many more",
      price: "₹5.00",
      manufacturer: "ABC Pharmaceuticals",
      dosage: "500mg",
      stock: 100,
      imageUrl: "https://example.com/paracetamol.jpg",
    },
    {
      id: 2,
      name: "Aspirin",
      description: "Anti-inflammatory and pain relief",
      price: "₹3.50",
      manufacturer: "XYZ Pharmaceuticals",
      dosage: "325mg",
      stock: 150,
      imageUrl: "https://example.com/aspirin.jpg",
    },
    {
      id: 3,
      name: "Ibuprofen",
      description: "Nonsteroidal anti-inflammatory drug",
      price: "₹4.00",
      manufacturer: "DEF Pharmaceuticals",
      dosage: "200mg",
      stock: 120,
      imageUrl: "https://example.com/ibuprofen.jpg",
    },
    {
      id: 4,
      name: "Antibiotic X",
      description: "Broad-spectrum antibiotic",
      price: "₹8.50",
      manufacturer: "GHI Pharmaceuticals",
      dosage: "250mg",
      stock: 80,
      imageUrl: "https://example.com/antibioticX.jpg",
    },
    {
      id: 5,
      name: "Cough Syrup",
      description: "Relieves cough and cold symptoms",
      price: "₹6.00",
      manufacturer: "JKL Pharmaceuticals",
      dosage: "5ml",
      stock: 200,
      imageUrl: "https://example.com/coughsyrup.jpg",
    },
    {
      id: 6,
      name: "Digestive Enzymes",
      description: "Aids in digestion",
      price: "₹7.50",
      manufacturer: "MNO Pharmaceuticals",
      dosage: "100mg",
      stock: 90,
      imageUrl: "https://example.com/digestiveenzymes.jpg",
    },
    {
      id: 7,
      name: "Pain Relief Gel",
      description: "Topical pain relief",
      price: "₹9.00",
      manufacturer: "PQR Pharmaceuticals",
      dosage: "10g",
      stock: 120,
      imageUrl: "https://example.com/painreliefgel.jpg",
    },
    {
      id: 8,
      name: "Multivitamin Tablets",
      description: "Provides essential vitamins and minerals",
      price: "₹12.50",
      manufacturer: "STU Pharmaceuticals",
      dosage: "1 tablet",
      stock: 180,
      imageUrl: "https://example.com/multivitamin.jpg",
    },
    {
      id: 9,
      name: "Allergy Relief Syrup",
      description: "Relieves allergy symptoms",
      price: "₹7.50",
      manufacturer: "VWX Pharmaceuticals",
      dosage: "10ml",
      stock: 150,
      imageUrl: "https://example.com/allergyreliefsyrup.jpg",
    },
    {
      id: 10,
      name: "Calcium Supplements",
      description: "Supports bone health",
      price: "₹10.00",
      manufacturer: "YZ Pharmaceuticals",
      dosage: "500mg",
      stock: 100,
      imageUrl: "https://example.com/calciumsupplements.jpg",
    },
    {
      id: 11,
      name: "Antacid Tablets",
      description: "Relieves acidity and indigestion",
      price: "₹6.50",
      manufacturer: "LMN Pharmaceuticals",
      dosage: "2 tablets",
      stock: 120,
      imageUrl: "https://example.com/antacidtablets.jpg",
    },
    {
      id: 12,
      name: "Anti-Histamine Pills",
      description: "For allergy relief",
      price: "₹8.00",
      manufacturer: "OPQ Pharmaceuticals",
      dosage: "1 pill",
      stock: 100,
      imageUrl: "https://example.com/antihistamine.jpg",
    },
    {
      id: 13,
      name: "Eye Drops",
      description: "Relieves dry and irritated eyes",
      price: "₹15.00",
      manufacturer: "RST Pharmaceuticals",
      dosage: "1 drop",
      stock: 80,
      imageUrl: "https://example.com/eyedrops.jpg",
    },
    {
      id: 14,
      name: "Wound Healing Ointment",
      description: "Promotes faster wound healing",
      price: "₹11.50",
      manufacturer: "UVW Pharmaceuticals",
      dosage: "Apply as needed",
      stock: 90,
      imageUrl: "https://example.com/woundhealingointment.jpg",
    },
    {
      id: 15,
      name: "Fever Reducing Syrup",
      description: "Reduces fever symptoms",
      price: "₹9.50",
      manufacturer: "XYZ Pharmaceuticals",
      dosage: "10ml",
      stock: 150,
      imageUrl: "https://example.com/feverreducingsyrup.jpg",
    },
    {
      id: 16,
      name: "Vitamin C Chewable Tablets",
      description: "Boosts immune system",
      price: "₹13.00",
      manufacturer: "ABC Pharmaceuticals",
      dosage: "1 tablet",
      stock: 120,
      imageUrl: "https://example.com/vitaminc.jpg",
    },
    {
      id: 17,
      name: "Muscle Relaxant Cream",
      description: "Relieves muscle tension",
      price: "₹10.50",
      manufacturer: "JKL Pharmaceuticals",
      dosage: "Apply as needed",
      stock: 100,
      imageUrl: "https://example.com/musclerelaxantcream.jpg",
    },
    {
      id: 18,
      name: "Hair Growth Shampoo",
      description: "Promotes healthy hair growth",
      price: "₹14.00",
      manufacturer: "MNO Pharmaceuticals",
      dosage: "Use regularly",
      stock: 80,
      imageUrl: "https://example.com/hairgrowthshampoo.jpg",
    },
    {
      id: 19,
      name: "Sleep Aid Capsules",
      description: "Promotes better sleep",
      price: "₹16.50",
      manufacturer: "PQR Pharmaceuticals",
      dosage: "1 capsule",
      stock: 70,
      imageUrl: "https://example.com/sleepaidcapsules.jpg",
    },
    {
      id: 20,
      name: "Anti-Acne Gel",
      description: "Treats and prevents acne",
      price: "₹12.00",
      manufacturer: "STU Pharmaceuticals",
      dosage: "Apply as directed",
      stock: 110,
      imageUrl: "https://example.com/antiacnegel.jpg",
    },
    {
      id: 21,
      name: "Vitamin D Supplements",
      description: "Supports bone health and immunity",
      price: "₹18.00",
      manufacturer: "UVW Pharmaceuticals",
      dosage: "1 tablet",
      stock: 90,
      imageUrl: "https://example.com/vitamindsupplements.jpg",
    },
    {
      id: 22,
      name: "Throat Lozenges",
      description: "Soothes sore throat",
      price: "₹7.00",
      manufacturer: "LMN Pharmaceuticals",
      dosage: "As needed",
      stock: 120,
      imageUrl: "https://example.com/throatlozenges.jpg",
    },
    {
      id: 23,
      name: "Sunscreen Lotion",
      description: "Provides sun protection",
      price: "₹14.50",
      manufacturer: "OPQ Pharmaceuticals",
      dosage: "Apply before sun exposure",
      stock: 80,
      imageUrl: "https://example.com/sunscreenlotion.jpg",
    },
    {
      id: 24,
      name: "Joint Pain Relief Cream",
      description: "Relieves joint pain",
      price: "₹11.00",
      manufacturer: "RST Pharmaceuticals",
      dosage: "Apply to affected area",
      stock: 100,
      imageUrl: "https://example.com/jointpainreliefcream.jpg",
    },
    {
      id: 25,
      name: "Antifungal Ointment",
      description: "Treats fungal infections",
      price: "₹9.50",
      manufacturer: "XYZ Pharmaceuticals",
      dosage: "Apply as directed",
      stock: 110,
      imageUrl: "https://example.com/antifungalointment.jpg",
    },
    {
      id: 26,
      name: "Allergy Relief Nasal Spray",
      description: "Relieves nasal allergy symptoms",
      price: "₹13.50",
      manufacturer: "ABC Pharmaceuticals",
      dosage: "2 sprays in each nostril",
      stock: 90,
      imageUrl: "https://example.com/allergyreliefnasalspray.jpg",
    },
    {
      id: 27,
      name: "Omega-3 Fish Oil Capsules",
      description: "Supports heart and brain health",
      price: "₹17.00",
      manufacturer: "JKL Pharmaceuticals",
      dosage: "1 capsule daily",
      stock: 80,
      imageUrl: "https://example.com/omega3fishoilcapsules.jpg",
    },
    {
      id: 28,
      name: "Anti-Wrinkle Cream",
      description: "Reduces signs of aging",
      price: "₹15.00",
      manufacturer: "MNO Pharmaceuticals",
      dosage: "Apply to clean skin",
      stock: 70,
      imageUrl: "https://example.com/antiwrinklecream.jpg",
    },
    {
      id: 29,
      name: "Migraine Relief Tablets",
      description: "Relieves migraine headaches",
      price: "₹20.00",
      manufacturer: "PQR Pharmaceuticals",
      dosage: "1 tablet at onset",
      stock: 60,
      imageUrl: "https://example.com/migrainerelieftablets.jpg",
    },
    {
      id: 30,
      name: "Herbal Tea for Relaxation",
      description: "Promotes relaxation and stress relief",
      price: "₹8.50",
      manufacturer: "STU Pharmaceuticals",
      dosage: "1 cup before bedtime",
      stock: 100,
      imageUrl: "https://example.com/herbaltearelaxation.jpg",
    },
    // Add more medicines as needed
  ]);

  const filteredMedicines = medicines.filter((medicine) =>
    medicine.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const onFinish = async (values) => {
    try {
      dispatch(showLoading());

      // Simulating a successful response for testing
      const response = {
        data: {
          success: true,
          message: "Pharmacy application submitted successfully!",
        },
      };

      dispatch(hideLoading());

      // Handle the response from the API
      const isSuccess = response?.data?.success;
      const message = response?.data?.message || "Something went wrong";

      if (isSuccess) {
        toast.success(message);
        navigate("/");
      } else {
        toast.error(message);
      }
    } catch (error) {
      dispatch(hideLoading());
      toast.error("Something went wrong");
    }
  };

  const handleAddMedicine = (medicine) => {
    setMedicines([...medicines, { ...medicine, id: medicines.length + 1 }]);
    setModalVisible(false);
    toast.success("Medicine added successfully");
  };

  const handleUpdateMedicine = (updatedMedicine) => {
    setMedicines((prevMedicines) =>
      prevMedicines.map((medicine) =>
        medicine.id === updatedMedicine.id ? updatedMedicine : medicine
      )
    );
    setModalVisible(false);
    toast.success("Medicine updated successfully");
  };

  const handleDeleteMedicine = (id) => {
    setMedicines((prevMedicines) =>
      prevMedicines.filter((medicine) => medicine.id !== id)
    );
    toast.success("Medicine deleted successfully");
  };

  const openAddMedicineModal = () => {
    setCurrentMedicine({});
    setModalVisible(true);
  };

  const openEditMedicineModal = (medicine) => {
    setCurrentMedicine(medicine);
    setModalVisible(true);
  };

  return (
    <Layout>
      <div style={{ padding: "20px" }}>
        <div style={{ marginTop: "30px" }}>
          <h1 style={{ fontSize: "24px", marginBottom: "16px" }}>Pharmacy</h1>
          <Input.Search
            placeholder="Search for a medicine"
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ marginBottom: "20px", width: "300px" }}
          />
<br/><br/>
          <Button
            type="primary"
            style={{ marginBottom: "20px" }}
            onClick={openAddMedicineModal}
          >
            Add Medicine
          </Button>

          <List 
            grid={{ gutter: 45, column: 3 }}
            dataSource={filteredMedicines}
            renderItem={(medicine) => (
              <List.Item style={{ marginBottom: "45px",transform: selectedMedicineId === medicine.id ? "scale(1.1)" : "scale(1)",
              // Apply other hover effects or styles as needed
              transition: "transform 0.3s ease-in-out",
              hover: "hover" }}
              onClick={() => setSelectedMedicineId(medicine.id)}>
                <Card
                  title={medicine.name}
                  extra={medicine.price}
                  cover={
                    <img
                      alt={medicine.name}
                      src={medicine.imageUrl}
                      style={{
                        width: "100%",
                        height: "150px",
                        objectFit: "cover",
                      }}
                    />
                  }
                  style={{ width: "100%",backgroundColor:"skyblue",borderRadius:'15px',boxShadow:"1px 1px 4px black"}}
                >
                  <p style={{ marginBottom: "8px" }}>
                    Description: {medicine.description}
                  </p>
                  <p style={{ marginBottom: "8px" }}>
                    Manufacturer: {medicine.manufacturer}
                  </p>
                  <p style={{ marginBottom: "8px" }}>
                    Dosage: {medicine.dosage}
                  </p>
                  <p style={{ marginBottom: "8px" }}>Stock: {medicine.stock}</p>
                  <Button
                    type="link"
                    onClick={() => openEditMedicineModal(medicine)}
              
                  >
                    Edit
                  </Button>
                  <Button
                    type="link"
                    danger
                    onClick={() => handleDeleteMedicine(medicine.id)}
                  >
                    Delete
                  </Button>
                </Card>
              </List.Item>
            )}
          />
        </div>
      </div>

      {/* Medicine Modal */}
      <Modal
        title={currentMedicine.id ? "Edit Medicine" : "Add Medicine"}
        visible={modalVisible}
        onOk={() => setModalVisible(false)}
        onCancel={() => setModalVisible(false)}
        footer={null}
      >
        <Form
          layout="vertical"
          onFinish={
            currentMedicine.id ? handleUpdateMedicine : handleAddMedicine
          }
          initialValues={currentMedicine}
        >
          <Form.Item
            label="Medicine Name"
            name="name"
            rules={[
              { required: true, message: "Please enter the medicine name" },
            ]}
          >
            <Input placeholder="Medicine Name" />
          </Form.Item>

          <Form.Item
            label="Description"
            name="description"
            rules={[
              {
                required: true,
                message: "Please enter the medicine description",
              },
            ]}
          >
            <Input.TextArea placeholder="Description" />
          </Form.Item>

          <Form.Item
            label="Price"
            name="price"
            rules={[
              { required: true, message: "Please enter the medicine price" },
            ]}
          >
            <Input placeholder="Price" />
          </Form.Item>

          <Form.Item
            label="Manufacturer"
            name="manufacturer"
            rules={[
              { required: true, message: "Please enter the manufacturer" },
            ]}
          >
            <Input placeholder="Manufacturer" />
          </Form.Item>

          <Form.Item
            label="Dosage"
            name="dosage"
            rules={[{ required: true, message: "Please enter the dosage" }]}
          >
            <Input placeholder="Dosage" />
          </Form.Item>

          <Form.Item
            label="Stock"
            name="stock"
            rules={[{ required: true, message: "Please enter the stock" }]}
          >
            <Input placeholder="Stock" />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              style={{ marginTop: "10px" }}
            >
              {currentMedicine.id ? "Update Medicine" : "Add Medicine"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </Layout>
  );
};

export default Pharmacy;
