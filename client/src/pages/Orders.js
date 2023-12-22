// Pharmacy.js
import React, { useState } from "react";
import { Button, Form, Input, Card, List, Modal } from "antd";
import Layout from "../components/Layout";
import { useDispatch, useSelector } from "react-redux";
import { showLoading, hideLoading } from "../redux/alertsSlice";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { UploadOutlined } from '@ant-design/icons';

const Pharmacy = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);

  const [searchTerm, setSearchTerm] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [currentMedicine, setCurrentMedicine] = useState({});
  const [medicines, setMedicines] = useState([
    {
        id: 1,
        name: "Paracetamol",
        description: "For pain and fever relief",
        price: "₹30.00",
        manufacturer: "ABC Pharmaceuticals",
        dosage: "500mg",
        stock: 100,
        imageUrl: "https://krosylpharma.com/wp-content/uploads/2021/01/PARACETAMOL-TABLET.png",
      },
      {
        id: 2,
        name: "Aspirin",
        description: "Anti-inflammatory and pain relief",
        price: "₹23.50",
        manufacturer: "XYZ Pharmaceuticals",
        dosage: "75mg",
        stock: 150,
        imageUrl:"https://cpimg.tistatic.com/07773305/b/4/75mg-Aspirin-Tablets-IP.jpg"
      },
      {
        id: 3,
        name: "Ibuprofen",
        description: "Nonsteroidal anti-inflammatory drug",
        price: "₹14.00",
        manufacturer: "DEF Pharmaceuticals",
        dosage: "200mg",
        stock: 120,
        imageUrl:"https://5.imimg.com/data5/SELLER/Default/2023/7/325863554/WI/JM/SY/135658020/ibuprofen-tablets-ip-200-mg-.jpg"
      },
      {
        id: 4,
        name: "Antibiotic X",
        description: "Broad-spectrum antibiotic",
        price: "₹150.50",
        manufacturer: "GHI Pharmaceuticals",
        dosage: "250mg",
        stock: 80,
        imageUrl: "https://zeelabpharmacy.com/public/uploads/files/MW5f758d6906c11-400X.jpg",
      },
      {
        id: 5,
        name: "Cough Syrup",
        description: "Relieves cough and cold symptoms",
        price: "₹96.00",
        manufacturer: "JKL Pharmaceuticals",
        dosage: "5ml",
        stock: 200,
        imageUrl: "https://www.pravek.com/cdn/shop/products/Coughkalp-100ml.png?v=1671426304",
      },
      {
        id: 6,
        name: "Digestive Enzymes",
        description: "Aids in digestion",
        price: "₹200.50",
        manufacturer: "MNO Pharmaceuticals",
        dosage: "100mg",
        stock: 90,
        imageUrl: "https://m.media-amazon.com/images/W/MEDIAX_792452-T2/images/I/61K8OrBclKL.AC_UF1000,1000_QL80.jpg",
      },
      {
        id: 7,
        name: "Pain Relief Gel",
        description: "Topical pain relief",
        price: "₹60.00",
        manufacturer: "PQR Pharmaceuticals",
        dosage: "10g",
        stock: 120,
        imageUrl: "https://zanducare.com/cdn/shop/files/zandu-FastReliefGel_45ml_Packof2_93d2cf38-3af3-46ee-b840-94bdcd2f01d0.jpg?v=1694422553",
      },
      {
        id: 8,
        name: "Multivitamin Tablets",
        description: "Provides essential vitamins",
        price: "₹599.00",
        manufacturer: "STU Pharmaceuticals",
        dosage: "1 tablet",
        stock: 180,
        imageUrl: "https://pacome.in/wp-content/uploads/2021/12/Immunity-and-Health-Booster-1.jpg",
      },
      {
        id: 9,
        name: "Allergy Relief Syrup",
        description: "Relieves allergy symptoms",
        price: "₹99.50",
        manufacturer: "VWX Pharmaceuticals",
        dosage: "10ml",
        stock: 150,
        imageUrl: "https://i.ebayimg.com/images/g/HAMAAOSwD~NlUI1H/s-l1600.jpg",
      },
      {
        id: 10,
        name: "Calcium Supplements",
        description: "Supports bone health",
        price: "₹1000.00",
        manufacturer: "YZ Pharmaceuticals",
        dosage: "500mg",
        stock: 100,
        imageUrl: "https://5.imimg.com/data5/SELLER/Default/2022/9/AU/VX/GF/1803202/calcium-supplements.jpg",
      },
      {
        id: 11,
        name: "Antacid Tablets",
        description: "Relieves acidity and indigestion",
        price: "₹15.50",
        manufacturer: "LMN Pharmaceuticals",
        dosage: "2 tablets",
        stock: 120,
        imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJg7PCYnjyaUot4k9AmBuEXQFomeJauRr5Wg&usqp=CAU",
      },
      {
        id: 12,
        name: "Anti-Histamine Pills",
        description: "For allergy relief",
        price: "₹78.00",
        manufacturer: "OPQ Pharmaceuticals",
        dosage: "1 pill",
        stock: 100,
        imageUrl: "https://static.chemistwarehouse.com.au/ams/media/pi/105709/3DF_800.jpg",
      },
      {
        id: 13,
        name: "Eye Drops",
        description: "Relieves dry and irritated eyes",
        price: "₹350.00",
        manufacturer: "RST Pharmaceuticals",
        dosage: "1 drop",
        stock: 80,
        imageUrl: "https://himalayawellness.in/cdn/shop/products/OPHTHACARE-DROPS-10ML.jpg?v=1659002377",
      },
      {
        id: 14,
        name: "Wound Healing Ointment",
        description: "Promotes faster wound healing",
        price: "₹50.50",
        manufacturer: "UVW Pharmaceuticals",
        dosage: "Apply as needed",
        stock: 90,
        imageUrl: "https://5.imimg.com/data5/ANDROID/Default/2020/9/VZ/CD/JE/23783853/product-jpeg.jpg",
      },
      {
        id: 15,
        name: "Fever Reducing Syrup",
        description: "Reduces fever symptoms",
        price: "₹49.50",
        manufacturer: "XYZ Pharmaceuticals",
        dosage: "10ml",
        stock: 150,
        imageUrl: "https://5.imimg.com/data5/SELLER/Default/2022/11/TU/HV/KZ/127204272/belocold-paracetamol-suspension-syrup-500x500.jpg",
      },
      {
        id: 16,
        name: "Vitamin C Chewable Tablets",
        description: "Boosts immune system",
        price: "₹43.00",
        manufacturer: "ABC Pharmaceuticals",
        dosage: "1 tablet",
        stock: 120,
        imageUrl: "https://images.apollo247.in/pub/media/catalog/product/l/i/lim0003_1_june23.jpg",
      },
      {
        id: 17,
        name: "Muscle Relaxant Cream",
        description: "Relieves muscle tension",
        price: "₹150.50",
        manufacturer: "JKL Pharmaceuticals",
        dosage: "Apply as needed",
        stock: 100,
        imageUrl: "https://alyuva.in/cdn/shop/files/1_4a9c7643-28ef-47e9-8e59-e1f55bc88622.jpg?v=1688880577&width=1946",
      },
      {
        id: 18,
        name: "Hair Growth Shampoo",
        description: "Promotes healthy hair growth",
        price: "₹999.00",
        manufacturer: "MNO Pharmaceuticals",
        dosage: "Use regularly",
        stock: 80,
        imageUrl: "https://rukminim2.flixcart.com/image/850/1000/kyvvtzk0/shampoo/q/h/1/300-olive-macadamia-hair-growth-shampoo-coronationherbals-original-imagbyuhzqbhkd8m.jpeg?q=90",
      },
      {
        id: 19,
        name: "Sleep Aid Capsules",
        description: "Promotes better sleep",
        price: "₹199.50",
        manufacturer: "PQR Pharmaceuticals",
        dosage: "1 capsule",
        stock: 70,
        imageUrl: "https://www.jiomart.com/images/product/original/rvi4k4xp0e/himalayan-organics-natural-sleep-aid-supplement-120-tablets-legal-images-orvi4k4xp0e-p590810877-6-202110041658.jpg?im=Resize=(420,420)",
      },
      {
        id: 20,
        name: "Anti-Acne Gel",
        description: "Treats and prevents acne",
        price: "₹799.00",
        manufacturer: "STU Pharmaceuticals",
        dosage: "Apply as directed",
        stock: 110,
        imageUrl: "https://www.kandharam.co.in/image/cache/catalog/Products/beauty%20and%20grooming/FACE%20CARE/Clinsol%20Gel%20Anti-acne%20Gel%20for%20AcnevPimples%20Free%20Skin%2015g%202022-500x500.png",
      },
      {
        id: 21,
        name: "Vitamin D Supplements",
        description: "Supports bone health and immunity",
        price: "₹5999.00",
        manufacturer: "UVW Pharmaceuticals",
        dosage: "1 tablet",
        stock: 90,
        imageUrl: "https://blog-images-1.pharmeasy.in/blog/production/wp-content/uploads/2022/04/12120041/Sub-Heading-Images-10-13-scaled.jpg",
      },
      {
        id: 22,
        name: "Throat Lozenges",
        description: "Soothes sore throat",
        price: "₹25.00",
        manufacturer: "LMN Pharmaceuticals",
        dosage: "As needed",
        stock: 120,
        imageUrl: "https://cdn11.bigcommerce.com/s-gdy1ehz/images/stencil/1280x1280/products/119470/148219/REC_74016_Cepacol_Lozenges__58987.1429132181.jpg?c=2",
      },
      {
        id: 23,
        name: "Sunscreen Lotion",
        description: "Provides sun protection",
        price: "₹699.50",
        manufacturer: "OPQ Pharmaceuticals",
        dosage: "Apply before sun exposure",
        stock: 80,
        imageUrl: "https://shop.olivaclinic.com/cdn/shop/products/570_df92dd4b-34ef-419c-8285-3937b92a92b3_600x600.jpg?v=1673590419",
      },
      {
        id: 24,
        name: "Joint Pain Relief Cream",
        description: "Relieves joint pain",
        price: "₹179.00",
        manufacturer: "RST Pharmaceuticals",
        dosage: "Apply to affected area",
        stock: 100,
        imageUrl: "https://www.healthwithherbal.in/wp-content/uploads/2022/05/Orthoherb-cream..jpg",
      },
      {
        id: 25,
        name: "Antifungal Ointment",
        description: "Treats fungal infections",
        price: "₹289.50",
        manufacturer: "XYZ Pharmaceuticals",
        dosage: "Apply as directed",
        stock: 110,
        imageUrl: "https://wellify.in/cdn/shop/products/CanestenCream_15g_FOP-Copy_800x.jpg?v=1681476349",
      },
      {
        id: 26,
        name: "Allergy Relief Nasal Spray",
        description: "Relieves nasal allergy symptoms",
        price: "₹120.50",
        manufacturer: "ABC Pharmaceuticals",
        dosage: "2 sprays in each nostril",
        stock: 90,
        imageUrl: "https://target.scene7.com/is/image/Target/GUEST_10b85da3-b21c-4a88-98b3-159628226273?wid=488&hei=488&fmt=pjpeg",
      },
      {
        id: 27,
        name: "Omega-3 Fish Oil Capsules",
        description: "Supports heart and brain health",
        price: "₹2999.00",
        manufacturer: "JKL Pharmaceuticals",
        dosage: "1 capsule daily",
        stock: 80,
        imageUrl: "https://rukminim2.flixcart.com/image/850/1000/xif0q/vitamin-supplement/q/n/u/1000-omega-3-fish-oil-capsules-for-men-women-omega-fatty-acids-original-imagknvurxp3t8un.jpeg?q=20",
      },
      {
        id: 28,
        name: "Anti-Wrinkle Cream",
        description: "Reduces signs of aging",
        price: "₹1699.00",
        manufacturer: "MNO Pharmaceuticals",
        dosage: "Apply to clean skin",
        stock: 70,
        imageUrl: "https://m.media-amazon.com/images/W/MEDIAX_792452-T2/images/I/61vlmzoKfAS.jpg",
      },
      {
        id: 29,
        name: "Migraine Relief Tablets",
        description: "Relieves migraine headaches",
        price: "₹500.00",
        manufacturer: "PQR Pharmaceuticals",
        dosage: "1 tablet at onset",
        stock: 60,
        imageUrl: "https://onemg.gumlet.io/a_ignore,w_380,h_380,c_fit,q_auto,f_auto/g4eiw5tnhpyojyi0x5zo.jpg",
      },
      {
        id: 30,
        name: "Herbal Tea for Relaxation",
        description: "Promotes relaxation and stress relief",
        price: "₹190.50",
        manufacturer: "STU Pharmaceuticals",
        dosage: "1 cup before bedtime",
        stock: 100,
        imageUrl: "https://ekhadiindia.s3.ap-south-1.amazonaws.com/uploads/products/photos/RleEhNOG0ixiN9AR03YwWz1fFrQ72taxTNbOzj5z.jpeg",
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
        <div style={{ padding: '20px' }}>
          <div style={{ marginTop: '30px' }}>
            <h1 style={{ fontSize: '24px', marginBottom: '16px' }}>Pharmacy</h1>
            <Input.Search
              placeholder="Search for a medicine"
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ marginBottom: '20px', width: '300px' }}
            />
            <br />
            <br />
            <Button
              type="primary"
              style={{ marginBottom: '20px' }}
              onClick={openAddMedicineModal}
            >
              Add Medicine
            </Button>
  
            <List
              grid={{ gutter: 16, column: 3 }}
              dataSource={filteredMedicines}
              renderItem={(medicine) => (
                <List.Item style={{ marginBottom: '16px' }}>
                  <Card
                    title={medicine.name}
                    extra={`${medicine.price}`}
                    cover={
                      <img
                        alt={medicine.name}
                        src={medicine.imageUrl}
                        style={{
                          width: '100%',
                          height: '150px',
                          objectFit: 'cover',
                        }}
                      />
                    }
                    style={{ width: '100%' }}
                  >
                    <p style={{ marginBottom: '8px' }}>
                      Description: {medicine.description}
                    </p>
                    <p style={{ marginBottom: '8px' }}>
                      Manufacturer: {medicine.manufacturer}
                    </p>
                    <p style={{ marginBottom: '8px' }}>
                      Dosage: {medicine.dosage}
                    </p>
                    <p style={{ marginBottom: '8px' }}>Stock: {medicine.stock}</p>
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
          title={currentMedicine.id ? 'Edit Medicine' : 'Add Medicine'}
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
                { required: true, message: 'Please enter the medicine name' },
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
                  message: 'Please enter the medicine description',
                },
              ]}
            >
              <Input.TextArea placeholder="Description" />
            </Form.Item>
  
            <Form.Item
              label="Price"
              name="price"
              rules={[
                { required: true, message: 'Please enter the medicine price' },
              ]}
            >
              <Input placeholder="Price" />
            </Form.Item>
  
            <Form.Item
              label="Manufacturer"
              name="manufacturer"
              rules={[
                { required: true, message: 'Please enter the manufacturer' },
              ]}
            >
              <Input placeholder="Manufacturer" />
            </Form.Item>
  
            <Form.Item
              label="Dosage"
              name="dosage"
              rules={[{ required: true, message: 'Please enter the dosage' }]}
            >
              <Input placeholder="Dosage" />
            </Form.Item>
  
            <Form.Item
              label="Stock"
              name="stock"
              rules={[{ required: true, message: 'Please enter the stock' }]}
            >
              <Input placeholder="Stock" />
            </Form.Item>
  
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                style={{ marginTop: '10px' }}
              >
                {currentMedicine.id ? 'Update Medicine' : 'Add Medicine'}
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </Layout>
    );
  };
 

  
  export default Pharmacy;
