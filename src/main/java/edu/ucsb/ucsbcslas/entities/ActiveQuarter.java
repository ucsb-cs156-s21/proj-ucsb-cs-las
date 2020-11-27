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
  @GeneratedValue(strategy = GenerationType.AUTO)
  private Long id;

    @Override
    public boolean equals(Object o) {
        if (o == this)
            return true;
        if (!(o instanceof ActiveQuarter)) {
            return false;
        }
        ActiveQuarter other = (ActiveQuarter) o;
        EqualsBuilder e = new EqualsBuilder();
        e.append(activeQuarterValue, other.activeQuarterValue);
        return e.isEquals();
    }

  @Column(nullable = false)
  private String activeQuarterValue;

    public ActiveQuarter(String activeQuarterValue) {
        this.activeQuarterValue = activeQuarterValue;
    }
    public ActiveQuarter(){

    }


    public Long getId() {
        return this.id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getActiveQuarterValue() {
        return this.activeQuarterValue;
    }

    public void setActiveQuarterValue(String activeQuarterValue) {
        this.activeQuarterValue = activeQuarterValue;
    }
}
