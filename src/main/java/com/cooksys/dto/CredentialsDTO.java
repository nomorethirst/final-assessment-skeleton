package com.cooksys.dto;

import com.cooksys.entity.Credentials;

public class CredentialsDTO {

    private Credentials credentials;

    public CredentialsDTO() {
    }

    public CredentialsDTO(Credentials credentials) {
        this.credentials = credentials;
    }

    public Credentials getCredentials() {
        return credentials;
    }

    public void setCredentials(Credentials credentials) {
        this.credentials = credentials;
    }

}
