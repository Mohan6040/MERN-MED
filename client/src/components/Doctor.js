import React from "react";
import { useNavigate } from "react-router-dom";

function Doctor({ doctor }) {
  const navigate = useNavigate();

  const handleAppointmentBooking = () => {
    navigate(`/book-appointment/${doctor._id}`);
  };

  return (
    <div className="card p-2 cursor-pointer" onClick={handleAppointmentBooking}>
      <h1 className="card-title">
        {`${doctor.firstName} ${doctor.lastName}`}
      </h1>
      <hr />
      <p>
        <b>Phone Number:</b> {doctor.phoneNumber}
      </p>
      <p>
        <b>Address:</b> {doctor.address}
      </p>
      <p>
        <b>Fee per Consultation:</b> {doctor.feePerCunsultation}
      </p>
      <p>
        <b>Timings:</b> {doctor.timings[0]} - {doctor.timings[1]}
      </p>
    </div>
  );
}

export default Doctor;
