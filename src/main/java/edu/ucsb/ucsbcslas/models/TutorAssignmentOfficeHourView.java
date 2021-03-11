package edu.ucsb.ucsbcslas.models;

import java.util.List;
import java.util.Objects;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import org.apache.commons.lang3.builder.EqualsBuilder;

import edu.ucsb.ucsbcslas.entities.OnlineOfficeHours;
import edu.ucsb.ucsbcslas.entities.TutorAssignment;

public class TutorAssignmentOfficeHourView {
    private TutorAssignment tutorAssignment;
    private List <OnlineOfficeHours> onlineOfficeHours;
    private String day;

    public TutorAssignmentOfficeHourView() {
    }
    
    public TutorAssignmentOfficeHourView(TutorAssignment tutorAssignment,List <OnlineOfficeHours> onlineOfficeHours) {
      this.tutorAssignment = tutorAssignment;
      this.onlineOfficeHours = onlineOfficeHours;
    }
    @Override
    public String toString() {
      return String.format("[tutorAssignment=%s, onlineOfficeHours=%s]",tutorAssignment,onlineOfficeHours);
    }
  
    @Override
    public boolean equals(Object obj) {
      if (this == obj)
        return true;
      if (obj == null || getClass() != obj.getClass())
        return false;
      TutorAssignmentOfficeHourView other = (TutorAssignmentOfficeHourView) obj;
  
      // Using EqualsBuilder cuts down on the number of branches/tests we end up having to write.
      // Instead of needing to test equals failing on a difference in every single field, we can
      // just test one difference.
      EqualsBuilder builder = new EqualsBuilder();
      builder.append(tutorAssignment, other.tutorAssignment).append(onlineOfficeHours, other.onlineOfficeHours);
      return builder.isEquals();
      
    }
    public TutorAssignment getTutorAssignment() {
        return tutorAssignment;
      }
    
    public void setTutorAssignment(TutorAssignment tutorAssignment) {
        this.tutorAssignment = tutorAssignment;
      }

    public List <OnlineOfficeHours> getOnlineOfficeHours() {
        return onlineOfficeHours;
      }
    
    public void setOnlineOfficeHours(List <OnlineOfficeHours> onlineOfficeHours) {
        this.onlineOfficeHours = onlineOfficeHours;
      }

    public void setDay(String day) {
      this.day = day;
    }

    public String getDay() {
      return this.day;
    }
}

