package edu.ucsb.ucsbcslas.entities;


import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import org.apache.commons.lang3.builder.EqualsBuilder;

@Entity
public class ActiveQuarter {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private long id = 1;

  @Column(nullable = false)
  private String name = "f20";
  public ActiveQuarter(){

  }

    public long getId() {
        return this.id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getName() {
        return this.name;
    }

    public void setName(String name) {
        this.name = name;
    }
}

   