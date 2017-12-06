package com.cooksys.dto;

import com.cooksys.entity.Credentials;

public class CredentialsBookingDTO {

    private Credentials credentials;

    private BookingDTO booking;

    public Credentials getCredentials() {
        return credentials;
    }

    public void setCredentials(Credentials credentials) {
        this.credentials = credentials;
    }

    public BookingDTO getBooking() {
        return booking;
    }

    public void setBooking(BookingDTO booking) {
        this.booking = booking;
    }

    @Override
    public String toString() {
	return "CredentialsBookingDTO [credentials=" + credentials + ", booking=" + booking + "]";
    }

    

}
