package edu.ucsb.ucsbcslas.models;

import java.util.Objects;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import org.apache.commons.lang3.builder.EqualsBuilder;

@Entity
public class Tutor {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @Column(nullable = false)
    private String fname;
    @Column(nullable = false)
    private String lname;
    @Column(nullable = false)
    private String email;

    public Tutor() {
    }

    public Tutor(Long id, String fname, String lname, String email) {
        this.id = id;
        this.fname = fname;
        this.lname = lname;
        this.email = email;
    }

    @Override
    public String toString() {
        return String.format(
                "Tutor[ id=%d, fname=%s, lname=%s, email=%s ]",
                id, fname, lname, email);
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj)
            return true;
        if (obj == null || getClass() != obj.getClass())
            return false;
        Tutor other = (Tutor) obj;

        // Using EqualsBuilder cuts down on the number of branches/tests we end up
        // having to write.
        // Instead of needing to test equals failing on a difference in every single
        // field, we can
        // just test one difference.
        EqualsBuilder builder = new EqualsBuilder();
        builder.append(id, other.id)
                .append(fname, other.fname)
                .append(lname, other.lname).append(email, other.email);
        return builder.isEquals();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFullName() {
        return fname + " " + lname;
    }

    public String getFirstName() {
        return fname;
    }

    public void setFirstName(String fname) {
        this.fname = fname;
    }

    public String getLastName() {
        return lname;
    }

    public void setLastName(String lname) {
        this.lname = lname;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, fname, lname, email);
    }

}
