package edu.ucsb.ucsbcslas;

import static org.assertj.core.api.Assertions.assertThat;

import edu.ucsb.ucsbcslas.controllers.*;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class DemoApplicationTests {

  @Autowired
  private AppController appController;
  @Autowired
  private ReactController reactController;
  @Autowired
  private CourseController courseController;
  @Autowired
  private RoleController roleController;
  @Autowired
  private OnlineOfficeHoursController onlineOfficeHoursController;

  @Test
  void contextLoads() {
    assertThat(appController).isNotNull();
    assertThat(reactController).isNotNull();
    assertThat(courseController).isNotNull();
    assertThat(roleController).isNotNull();
    assertThat(onlineOfficeHoursController).isNotNull();
  }

  // This test just provides coverage on the main method of DemoApplication.
  @Test
  public void applicationContextTest() {
    DemoApplication.main(new String[] {});
  }

}
