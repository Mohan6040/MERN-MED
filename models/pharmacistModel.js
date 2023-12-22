const mongoose = require("mongoose");

const pharmacistSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    isPharmacist: {
      type: Boolean,
      default: true, // Assuming pharmacists are the primary users of this model
    },
    isDoctor: {
      type: Boolean,
      default: false,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    seenNotifications: {
      type: Array,
      default: [],
    },
    unseenNotifications: {
      type: Array,
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

const pharmacistModel = mongoose.model("pharmacists", pharmacistSchema);

module.exports = pharmacistModel;
