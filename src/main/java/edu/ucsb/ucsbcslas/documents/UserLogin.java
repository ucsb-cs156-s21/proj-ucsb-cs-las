package edu.ucsb.ucsbcslas.documents;

import java.util.List;
import java.util.Objects;

import org.apache.commons.lang3.builder.EqualsBuilder;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "logins")
public class UserLogin {
    private String timestamp;
    private UserProfile userProfile;

    public UserLogin() {
    }

    public UserLogin(String timestamp, UserProfile userProfile) {
        this.timestamp = timestamp;
        this.userProfile = userProfile;
    }

    public String getTimestamp() {
        return this.timestamp;
    }

    public void setTimestamp(String timestamp) {
        this.timestamp = timestamp;
    }

    public UserProfile getUserProfile() {
        return this.userProfile;
    }

    public void setUserProfile(UserProfile userProfile) {
        this.userProfile = userProfile;
    }

    public UserLogin timestamp(String timestamp) {
        this.timestamp = timestamp;
        return this;
    }

    public UserLogin userProfile(UserProfile userProfile) {
        this.userProfile = userProfile;
        return this;
    }

    @Override
    public boolean equals(Object o) {
        if (o == this)
            return true;
        if (!(o instanceof UserLogin)) {
            return false;
        }
        UserLogin userLogin = (UserLogin) o;
        return Objects.equals(timestamp, userLogin.timestamp) && Objects.equals(userProfile, userLogin.userProfile);
    }

    @Override
    public int hashCode() {
        return Objects.hash(timestamp, userProfile);
    }

    @Override
    public String toString() {
        return "{" +
            " timestamp='" + getTimestamp() + "'" +
            ", userProfile='" + getUserProfile() + "'" +
            "}";
    }



}
