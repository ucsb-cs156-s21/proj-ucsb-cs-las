package edu.ucsb.ucsbcslas.documents;

import java.util.Objects;

public class UserProfile {
   private String  givenName;
   private String familyName;
   private String nickname;
   private String name;
   private String email;

    public UserProfile() {
    }

    public UserProfile(String givenName, String familyName, String nickname, String name, String email) {
        this.givenName = givenName;
        this.familyName = familyName;
        this.nickname = nickname;
        this.name = name;
        this.email = email;
    }

    public String getGivenName() {
        return this.givenName;
    }

    public void setGivenName(String givenName) {
        this.givenName = givenName;
    }

    public String getFamilyName() {
        return this.familyName;
    }

    public void setFamilyName(String familyName) {
        this.familyName = familyName;
    }

    public String getNickname() {
        return this.nickname;
    }

    public void setNickname(String nickname) {
        this.nickname = nickname;
    }

    public String getName() {
        return this.name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return this.email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    @Override
    public boolean equals(Object o) {
        if (o == this)
            return true;
        if (!(o instanceof UserProfile)) {
            return false;
        }
        UserProfile userProfile = (UserProfile) o;
        return Objects.equals(givenName, userProfile.givenName) && Objects.equals(familyName, userProfile.familyName) && Objects.equals(nickname, userProfile.nickname) && Objects.equals(name, userProfile.name) && Objects.equals(email, userProfile.email);
    }

    @Override
    public int hashCode() {
        return Objects.hash(givenName, familyName, nickname, name, email);
    }

    @Override
    public String toString() {
        return "{" +
            " givenName='" + getGivenName() + "'" +
            ", familyName='" + getFamilyName() + "'" +
            ", nickname='" + getNickname() + "'" +
            ", name='" + getName() + "'" +
            ", email='" + getEmail() + "'" +
            "}";
    }




}