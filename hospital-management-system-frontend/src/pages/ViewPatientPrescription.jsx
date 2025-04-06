import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ViewPatientPrescriptions = () => {
  const navigate = useNavigate();
  const [prescriptions, setPrescriptions] = useState([]);

  const patientId = localStorage.getItem("patientId");

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/prescription/getbypatientid/${patientId}`)
      .then((res) =>
        setPrescriptions(Array.isArray(res.data) ? res.data : [res.data])
      )
      .catch(() => alert("Failed to load prescriptions"));
  }, [patientId]);

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow-lg rounded-4" style={{ width: "600px" }}>
        <h2 className="text-center mb-4 fw-bold">Your Prescriptions</h2>

        {prescriptions.length === 0 ? (
          <p className="text-center text-danger fw-bold">No prescriptions found.</p>
        ) : (
          <div className="table-responsive">
            <table className="table table-striped table-bordered text-center">
              <thead className="table-dark">
                <tr>
                  <th>Doctor</th>
                  <th>Medicine</th>
                  <th>Dosage</th>
                  <th>Instruction</th>
                </tr>
              </thead>
              <tbody>
                {prescriptions.map((prescription) => (
                  <tr key={prescription.id}>
                    <td>{prescription.doctor.name}</td>
                    <td>{prescription.medication}</td>
                    <td>{prescription.dosage}</td>
                    <td>{prescription.instructions}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <button
          onClick={() => navigate("/patientdashboard")}
          className="btn btn-secondary mt-3 fw-bold w-100"
        >
          Back to Dashboard
        </button>
      </div>
    </div>
  );
};

export default ViewPatientPrescriptions;
