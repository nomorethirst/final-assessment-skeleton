package com.cooksys.dto;

import com.cooksys.entity.Credentials;
import com.cooksys.entity.Profile;

public class CredentialsProfileDTO {

    private Credentials credentials;

    private Profile profile;

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

    @Override
    public String toString() {
        return "CredentialsProfileDTO [credentials=" + credentials.toString() + ", profile=" + profile.toString() + "]";
    }

}
