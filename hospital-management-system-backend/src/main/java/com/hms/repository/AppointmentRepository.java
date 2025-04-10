package com.hms.repository;

import com.hms.entity.Appointment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AppointmentRepository extends JpaRepository<Appointment, Long> {
    List<Appointment> findByStatus(Appointment.Status status);
    List<Appointment> findByPatientId(Long patientId);
    List<Appointment> findByDoctorId(Long DoctorId);
}
