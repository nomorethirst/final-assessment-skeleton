package com.cooksys.dto;

import com.cooksys.entity.Booking;
import com.cooksys.entity.Credentials;

public class CredentialsBookingDTO {

    private Credentials credentials;

    private Booking booking;

    public Credentials getCredentials() {
        return credentials;
    }

    public void setCredentials(Credentials credentials) {
        this.credentials = credentials;
    }

    public Booking getBooking() {
        return booking;
    }

    public void setBooking(Booking booking) {
        this.booking = booking;
    }

    

}
