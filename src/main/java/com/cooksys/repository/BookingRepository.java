package com.cooksys.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cooksys.entity.Booking;

public interface BookingRepository extends JpaRepository<Booking, Integer> {

}
