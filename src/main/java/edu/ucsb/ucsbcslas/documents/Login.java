package edu.ucsb.ucsbcslas.documents;

import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

import org.apache.commons.lang3.builder.EqualsBuilder;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "logins")        //"logins" corresponds to the name of the MongoDB Collection
public class Login {
    private String timestamp;
    private String email;
    private String firstName;
    private String lastName;

    public Login() {
    }

    public Login(String timestamp, String email, String firstName, String lastName, String role) {
        this.timestamp = timestamp;
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.role = role;
    }

    public String getTimestamp() {
        return this.timestamp;
    }

    public void setTimestamp(String timestamp) {
        this.timestamp = timestamp;
    }

    public String getEmail() {
        return this.email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getFirstName() {
        return this.firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return this.lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getRole() {
        return this.role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o)  // Check references
            return true;
        if (o == null || getClass() != o.getClass())    // Check if same class, or null
            return false;
        Login login = (Login) o;
        EqualsBuilder builder = new EqualsBuilder();
        builder.append(timestamp, login.timestamp)
                .append(email, login.email)
                .append(firstName, login.firstName)
                .append(lastName, login.lastName)
                .append(role, login.role);
        return builder.build();
    }

    @Override
    public int hashCode() {
        return Objects.hash(timestamp, email, firstName, lastName, role);
    }

    @Override
    public String toString() {
        return "{" +
            " timestamp='" + getTimestamp() + "'" +
            ", email='" + getEmail() + "'" +
            ", firstName='" + getFirstName() + "'" +
            ", lastName='" + getLastName() + "'" +
            ", role='" + getRole() + "'" +
            "}";
    }

}
/*
Example of the JSON for a Login document:

{
    "_id": {
        "$oid": "5fcf123e546a77556efb8345"
    },
    "timestamp": "10:00",
    "email": "mongo_test@ucsb.edu",
    "firstName": "mongo",
    "lastName": "test",
    "role": "Admin"
}

*/