package com.cooksys.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cooksys.entity.Flight;

public interface FlightRepository extends JpaRepository<Flight, Integer> {

}
