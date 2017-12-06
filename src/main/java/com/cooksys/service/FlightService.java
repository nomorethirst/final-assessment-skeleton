package com.cooksys.service;

import java.util.ArrayList;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import com.cooksys.component.FlightGenerator;
import com.cooksys.pojo.Flight;

@Service
public class FlightService {

	@Autowired
	FlightGenerator generator;

	private ArrayList<Flight> flightList = new ArrayList<>();
	
	public ArrayList<Flight> getDailyFlightList()
	{
		return (ArrayList<Flight>) flightList
			.stream()
			.sorted( (f1, f2) -> f1.getOffset() < f2.getOffset() ? -1 : 1 )
			.collect(Collectors.toList());
	}
	
	//The fixedDelay parameter determines how often a new day is generated as expressed in milliseconds
	@Scheduled(fixedDelay=60000)
	private void refreshFlights()
	{
		flightList = generator.generateNewFlightList();
	}
	
}
