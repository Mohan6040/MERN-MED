const express = require("express");
const router = express.Router();
const Pharmacist = require("../models/pharmacistModel"); // Assume you have a pharmacist model
const authMiddleware = require("../middlewares/authMiddleware");

// Example route for pharmacist registration

router.post("/get-pharmacist-info-by-id", authMiddleware, async (req, res) => {
    try {
      const pharmacist = await Pharmacist.findOne({ _id: req.body.pharmacistId });
      pharmacist.password = undefined; // Remove password from the response for security
      if (!pharmacist) {
        return res.status(200).send({ message: "Pharmacist does not exist", success: false });
      } else {
        res.status(200).send({
          success: true,
          data: pharmacist,
        });
      }
    } catch (error) {
      res.status(500).send({ message: "Error getting pharmacist info", success: false, error });
    }
  });
  
  // Example route to update pharmacist profile
  router.post("/update-pharmacist-profile", authMiddleware, async (req, res) => {
    try {
      const updatedPharmacist = await Pharmacist.findByIdAndUpdate(
        req.body.pharmacistId,
        { $set: req.body.updatedData },
        { new: true }
      );
  
      if (!updatedPharmacist) {
        return res.status(200).send({ message: "Pharmacist not found", success: false });
      }
  
      updatedPharmacist.password = undefined; // Remove password from the response for security
  
      res.status(200).send({
        success: true,
        message: "Pharmacist profile updated successfully",
        data: updatedPharmacist,
      });
    } catch (error) {
      res.status(500).send({ message: "Error updating pharmacist profile", success: false, error });
    }
  });
  
  // Example route to fetch all approved pharmacists
  router.get("/get-all-approved-pharmacists", authMiddleware, async (req, res) => {
    try {
      const approvedPharmacists = await Pharmacist.find({ status: "approved" });
      res.status(200).send({
        message: "Approved pharmacists fetched successfully",
        success: true,
        data: approvedPharmacists,
      });
    } catch (error) {
      res.status(500).send({
        message: "Error fetching approved pharmacists",
        success: false,
        error,
      });
    }
  });

  router.post("/update-pharmacist-status", authMiddleware, async (req, res) => {
    try {
      const { pharmacistId, newStatus } = req.body;
  
      const updatedPharmacist = await Pharmacist.findByIdAndUpdate(
        pharmacistId,
        { $set: { status: newStatus } },
        { new: true }
      );
  
      if (!updatedPharmacist) {
        return res.status(200).send({ message: "Pharmacist not found", success: false });
      }
  
      updatedPharmacist.password = undefined; // Remove password from the response for security
  
      res.status(200).send({
        success: true,
        message: "Pharmacist status updated successfully",
        data: updatedPharmacist,
      });
    } catch (error) {
      res.status(500).send({
        message: "Error updating pharmacist status",
        success: false,
        error,
      });
    }
  });
  
  // Example route to fetch pending pharmacist applications
  router.get("/get-pending-pharmacist-applications", authMiddleware, async (req, res) => {
    try {
      const pendingPharmacists = await Pharmacist.find({ status: "pending" });
      res.status(200).send({
        message: "Pending pharmacist applications fetched successfully",
        success: true,
        data: pendingPharmacists,
      });
    } catch (error) {
      res.status(500).send({
        message: "Error fetching pending pharmacist applications",
        success: false,
        error,
      });
    }
  });
  
  // Example route to manage pharmacist appointments
  router.get("/get-pharmacist-appointments", authMiddleware, async (req, res) => {
    try {
      const pharmacistId = req.body.pharmacistId;
      // Assuming you have a model for pharmacist appointments
      const pharmacistAppointments = await Appointment.find({ pharmacistId });
  
      res.status(200).send({
        message: "Pharmacist appointments fetched successfully",
        success: true,
        data: pharmacistAppointments,
      });
    } catch (error) {
      res.status(500).send({
        message: "Error fetching pharmacist appointments",
        success: false,
        error,
      });
    }
  });

  router.post("/update-pharmacist-availability", authMiddleware, async (req, res) => {
    try {
      const { pharmacistId, newAvailability } = req.body;
  
      const updatedPharmacist = await Pharmacist.findByIdAndUpdate(
        pharmacistId,
        { $set: { availability: newAvailability } },
        { new: true }
      );
  
      if (!updatedPharmacist) {
        return res.status(200).send({ message: "Pharmacist not found", success: false });
      }
  
      updatedPharmacist.password = undefined; // Remove password from the response for security
  
      res.status(200).send({
        success: true,
        message: "Pharmacist availability updated successfully",
        data: updatedPharmacist,
      });
    } catch (error) {
      res.status(500).send({
        message: "Error updating pharmacist availability",
        success: false,
        error,
      });
    }
  });
  
  // Example route to manage medication inventory
  router.post("/add-medication-to-inventory", authMiddleware, async (req, res) => {
    try {
      const { pharmacistId, medicationName, quantity } = req.body;
  
      const updatedPharmacist = await Pharmacist.findByIdAndUpdate(
        pharmacistId,
        {
          $push: {
            medicationInventory: {
              name: medicationName,
              quantity,
            },
          },
        },
        { new: true }
      );
  
      if (!updatedPharmacist) {
        return res.status(200).send({ message: "Pharmacist not found", success: false });
      }
  
      updatedPharmacist.password = undefined; // Remove password from the response for security
  
      res.status(200).send({
        success: true,
        message: "Medication added to inventory successfully",
        data: updatedPharmacist,
      });
    } catch (error) {
      res.status(500).send({
        message: "Error adding medication to inventory",
        success: false,
        error,
      });
    }
  });
  
  // Example route to handle prescription requests
  router.post("/handle-prescription-request", authMiddleware, async (req, res) => {
    try {
      const { pharmacistId, prescriptionId, isApproved } = req.body;
  
      // Logic to handle prescription request based on isApproved value
      // ...
  
      res.status(200).send({
        success: true,
        message: isApproved ? "Prescription approved" : "Prescription declined",
      });
    } catch (error) {
      res.status(500).send({
        message: "Error handling prescription request",
        success: false,
        error,
      });
    }
  });


module.exports = router;
