package com.cooksys.dto;

import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToMany;

import com.cooksys.entity.Flight;

public class BookingDTO {
    
    private List<FlightDTO> flights;

    public List<FlightDTO> getFlights() {
        return flights;
    }

    public void setFlights(List<FlightDTO> flights) {
        this.flights = flights;
    }

    @Override
    public String toString() {
	return "BookingDTO [flights=" + flights + "]";
    }

    

    
    

}
