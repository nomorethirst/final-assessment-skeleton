package com.cooksys.dto;

import java.sql.Timestamp;
import java.util.List;

import com.cooksys.entity.Booking;
import com.cooksys.entity.Credentials;
import com.cooksys.entity.Profile;

public class UserDTO {

    private Credentials credentials;

    private Profile profile;

    private Timestamp joined;
    
    private List<Booking> bookings;

    public UserDTO() {}
    
    public Credentials getCredentials() {
        return credentials;
    }

    public void setCredentials(Credentials credentials) {
        this.credentials = credentials;
    }

    public Profile getProfile() {
        return profile;
    }

    public void setProfile(Profile profile) {
        this.profile = profile;
    }

    public Timestamp getJoined() {
        return joined;
    }

    public void setJoined(Timestamp joined) {
        this.joined = joined;
    }

    public List<Booking> getBookings() {
        return bookings;
    }

    public void setBookings(List<Booking> bookings) {
        this.bookings = bookings;
    }
    
    


}
