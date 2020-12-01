package edu.ucsb.ucsbcslas.entities;


import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import org.apache.commons.lang3.builder.EqualsBuilder;
import java.util.Objects;

@Entity
public class ActiveQuarter {
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private Long id;
  @Column(nullable = false)
  private String activeQuarter;
  public ActiveQuarter(){}
  
    public ActiveQuarter(Long id, String activeQuarter) {
        this.id = id;
        this.activeQuarter = activeQuarter;
    }


    public Long getId() {
        return this.id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getActiveQuarter() {
        return this.activeQuarter;
    }

    public void setActiveQuarter(String activeQuarter) {
        this.activeQuarter = activeQuarter;
    }

    public ActiveQuarter id(Long id) {
        this.id = id;
        return this;
    }

    public ActiveQuarter activeQuarter(String activeQuarter) {
        this.activeQuarter = activeQuarter;
        return this;
    }

    @Override
    public boolean equals(Object o) {
        if (o == this)
            return true;
        if (!(o instanceof ActiveQuarter)) {
            return false;
        }
        ActiveQuarter activeQuarter = (ActiveQuarter) o;
        return Objects.equals(id, activeQuarter.id) && Objects.equals(activeQuarter, activeQuarter.activeQuarter);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, activeQuarter);
    }

    @Override
    public String toString() {
        return "{" +
            " id='" + getId() + "'" +
            ", activeQuarter='" + getActiveQuarter() + "'" +
            "}";
    }
}
