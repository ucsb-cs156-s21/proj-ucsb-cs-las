package edu.ucsb.ucsbcslas.controllers;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;
import edu.ucsb.ucsbcslas.entities.AppUser;
import java.io.Reader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.BufferedReader;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import javax.validation.Valid;
import com.auth0.jwt.JWT;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import edu.ucsb.ucsbcslas.advice.AuthControllerAdvice;
import edu.ucsb.ucsbcslas.entities.OnlineOfficeHours;
import edu.ucsb.ucsbcslas.models.Course;
import edu.ucsb.ucsbcslas.entities.Tutor;
import edu.ucsb.ucsbcslas.entities.TutorAssignment;
import edu.ucsb.ucsbcslas.repositories.OnlineOfficeHoursRepository;
import edu.ucsb.ucsbcslas.repositories.CourseRepository;
import edu.ucsb.ucsbcslas.repositories.TutorRepository;
import edu.ucsb.ucsbcslas.repositories.TutorAssignmentRepository;

@RestController
public class OnlineOfficeHoursController {
    private final Logger logger = LoggerFactory.getLogger(OnlineOfficeHoursController.class);

    @Autowired
    private AuthControllerAdvice authControllerAdvice;
    @Autowired
    private OnlineOfficeHoursRepository officeHoursRepository;
    @Autowired
    private TutorRepository tutorRepository;
    @Autowired
    private CourseRepository courseRepository;
    @Autowired
    private TutorAssignmentRepository tutorAssignmentRepository;
    

    private ObjectMapper mapper = new ObjectMapper();

    private ResponseEntity<String> getUnauthorizedResponse(String roleRequired) throws JsonProcessingException {
        Map<String, String> response = new HashMap<String, String>();
        response.put("error", String.format("Unauthorized; only %s may access this resource.", roleRequired));
        String body = mapper.writeValueAsString(response);
        return new ResponseEntity<String>(body, HttpStatus.UNAUTHORIZED);
    }

    @PostMapping(value = "/api/admin/officeHours", produces = "application/json")
    public ResponseEntity<String> createOfficeHour(@RequestHeader("Authorization") String authorization,
            @RequestBody @Valid OnlineOfficeHours officeHour) throws JsonProcessingException {
                System.out.println(officeHour.toString());
        if (!authControllerAdvice.getIsAdmin(authorization))
           return getUnauthorizedResponse("admin");
        OnlineOfficeHours savedOfficeHour = officeHoursRepository.save(officeHour);
        String body = mapper.writeValueAsString(savedOfficeHour);
        return ResponseEntity.ok().body(body);
    }

    @PutMapping(value = "/api/admin/officeHours/{id}", produces = "application/json")
    public ResponseEntity<String> updateOfficeHour(@RequestHeader("Authorization") String authorization,
            @PathVariable("id") Long id, @RequestBody @Valid OnlineOfficeHours incomingOfficeHour) throws JsonProcessingException {
                Boolean isAdmin = authControllerAdvice.getIsAdmin(authorization);
        if (!isAdmin){
            return getUnauthorizedResponse("admin");
        }
        
        Optional<OnlineOfficeHours> officeHour = officeHoursRepository.findById(id);
        if (!officeHour.isPresent()) {
            return ResponseEntity.notFound().build();
        }

        if (!incomingOfficeHour.getId().equals(id)) {
            return ResponseEntity.badRequest().build();
        }

        officeHoursRepository.save(incomingOfficeHour);
        String body = mapper.writeValueAsString(incomingOfficeHour);
        return ResponseEntity.ok().body(body);
    }

    @DeleteMapping(value = "/api/admin/officeHours/{id}", produces = "application/json")
    public ResponseEntity<String> deleteOfficeHour(@RequestHeader("Authorization") String authorization,
            @PathVariable("id") Long id) throws JsonProcessingException {
            Boolean isAdmin = authControllerAdvice.getIsAdmin(authorization);
        if (!isAdmin){
            return getUnauthorizedResponse("admin");
        }

        Optional<OnlineOfficeHours> officeHour = officeHoursRepository.findById(id);
        if (!officeHour.isPresent()) {
            return ResponseEntity.notFound().build();
        }
        officeHoursRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping(value = "/api/public/officeHours", produces = "application/json")
    public ResponseEntity<String> getOfficeHours() throws JsonProcessingException {
        List<OnlineOfficeHours> officeHourList = officeHoursRepository.findAll();
        ObjectMapper mapper = new ObjectMapper();

        String body = mapper.writeValueAsString(officeHourList);
        return ResponseEntity.ok().body(body);
    }

    @GetMapping(value = "/api/member/officeHours", produces = "application/json")
    public ResponseEntity<String> getMemberOfficeHours(@RequestHeader("Authorization") String authorization) throws JsonProcessingException {
        if (!authControllerAdvice.getIsMember(authorization)){
            return getUnauthorizedResponse("member");
        }
        String email = authControllerAdvice.getUser(authorization).getEmail();
        List<OnlineOfficeHours> officeHourList = officeHoursRepository.findByTutorAssignmentTutorEmail(email);
        ObjectMapper mapper = new ObjectMapper();

        String body = mapper.writeValueAsString(officeHourList);
        return ResponseEntity.ok().body(body);
    }

    @GetMapping(value = "/api/public/officeHours/{id}", produces = "application/json")
    public ResponseEntity<String> getOfficeHour(@PathVariable("id") Long id) throws JsonProcessingException {
        Optional<OnlineOfficeHours> officeHour = officeHoursRepository.findById(id);
        if (officeHour.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        ObjectMapper mapper = new ObjectMapper();
        String body = mapper.writeValueAsString(officeHour.get());
        return ResponseEntity.ok().body(body);
    }


    @PostMapping(value = "/api/admin/officehours/upload", produces = "application/json")
    public ResponseEntity<String> uploadCSV(@RequestParam("csv") MultipartFile csv, @RequestHeader("Authorization") String authorization) throws IOException{
        logger.info("Starting upload CSV");
        AppUser user = authControllerAdvice.getUser(authorization);
        if (!authControllerAdvice.getIsAdmin(authorization))
           return getUnauthorizedResponse("admin");
        try {
            BufferedReader csvReader = new BufferedReader(new InputStreamReader(csv.getInputStream()));
            logger.info(new String(csv.getInputStream().readAllBytes()));
            
            String body = "";

            List<OnlineOfficeHours> savedOfficeHour = new ArrayList<>();

            String row = csvReader.readLine();
            String [] data ;
            while(row != null){
                row = row.replace("\"","");
                data = row.split(",");


                String name = data[0];
                String quarter = data[1];
                String instructorFirstName = data[2];
                String instructorLastName = data[3];
                String instructorEmail = data[4];
                String firstName = data[5];
                String lastName = data[6];
                String email = data[7];
                String assignmentType = data[8];
                String dayOfWeek = data[9];
                String startTime = data[10];
                String endTime = data[11];
                String zoomRoomLink = data[12];
                String notes = data[13];
                
                row = csvReader.readLine();
                
                Course course = new Course(name,quarter,instructorFirstName,instructorLastName,instructorEmail);
                
                Course existingCourse = courseRepository.findByNameAndQuarter(course.getName(), course.getQuarter());
                if(existingCourse == null){
                    courseRepository.save(course);
                }
                

                Tutor tutor = new Tutor(firstName,lastName,email);
                Tutor related_tutor;
                Optional<Tutor> existingTutor = tutorRepository.findByEmail(email);
                
                Course related_course = courseRepository.findByNameAndQuarter(course.getName(), course.getQuarter());

                if(existingTutor.isEmpty()){
                    related_tutor = tutorRepository.save(tutor);
                }
                else{
                    related_tutor = existingTutor.get();
                }

                
                TutorAssignment TA;
                TutorAssignment tutorAssignment = new TutorAssignment(related_course,related_tutor,assignmentType);
                List<TutorAssignment> comm =tutorAssignmentRepository.findAllByCourseAndTutor(related_course,related_tutor);
                if(comm.isEmpty()){
                    TA = tutorAssignmentRepository.save(tutorAssignment);
                }
                else{
                    TA = comm.get(0);
                }
                

                OnlineOfficeHours OH = null;
                List<OnlineOfficeHours> existingOfficeHours = officeHoursRepository.findAllByTutorAssignment(TA);
                for(OnlineOfficeHours existingOfficeHour : existingOfficeHours){
                    if (existingOfficeHour.getDayOfWeek().equals(dayOfWeek)  && existingOfficeHour.getStartTime().equals(startTime) &&existingOfficeHour.getEndTime().equals(endTime) ){
                        OH = existingOfficeHour;
                        
                    }
                }
                if(OH ==null){
                    OH = new OnlineOfficeHours(TA, dayOfWeek, startTime, endTime, zoomRoomLink, notes);
                    savedOfficeHour.add(officeHoursRepository.save(OH));
                }
            }
            
            body = mapper.writeValueAsString(savedOfficeHour);
            return ResponseEntity.ok().body(body);

        } catch(RuntimeException e){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Malformed CSV", e);
        }
    }
}
