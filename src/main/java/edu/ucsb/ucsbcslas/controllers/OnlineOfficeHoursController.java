package edu.ucsb.ucsbcslas.controllers;

import org.slf4j.Logger;
import java.io.*;
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

//new
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.Reader;
import java.lang.*;
import edu.ucsb.ucsbcslas.services.CSVToObjectService;
import edu.ucsb.ucsbcslas.entities.AppUser;

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

//new
import edu.ucsb.ucsbcslas.models.Course;
import edu.ucsb.ucsbcslas.entities.Tutor;
import edu.ucsb.ucsbcslas.entities.TutorAssignment;

import edu.ucsb.ucsbcslas.repositories.OnlineOfficeHoursRepository;

//new
import edu.ucsb.ucsbcslas.repositories.CourseRepository;
import edu.ucsb.ucsbcslas.repositories.TutorRepository;
import edu.ucsb.ucsbcslas.repositories.TutorAssignmentRepository;
import edu.ucsb.ucsbcslas.controllers.CourseController;

@RestController
public class OnlineOfficeHoursController {
    private final Logger logger = LoggerFactory.getLogger(OnlineOfficeHoursController.class);

    @Autowired
    private AuthControllerAdvice authControllerAdvice;
    @Autowired
    private OnlineOfficeHoursRepository officeHoursRepository;
    @Autowired
    private TutorRepository tutorRepository;
    //new
    @Autowired
    private CourseRepository courseRepository;
    @Autowired
    private TutorAssignmentRepository tutorAssignmentRepository;
    @Autowired
    CSVToObjectService<OnlineOfficeHours> csvToObjectService;
    // @Autowired

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

    // @PostMapping(value = "/api/admin/officehours/upload", produces = "application/json")
    // public ResponseEntity<String> uploadCSV(@RequestParam("csv") MultipartFile csv, @RequestHeader("Authorization") String authorization) throws IOException{
    //     logger.info("Starting upload CSV");
    //     AppUser user = authControllerAdvice.getUser(authorization);
    //     try {
    //         Reader reader = new InputStreamReader(csv.getInputStream());
    //         logger.info(new String(csv.getInputStream().readAllBytes()));
    //         List<OnlineOfficeHours> uploadedOfficeHours = csvToObjectService.parse(reader, OnlineOfficeHours.class);
    //         List<OnlineOfficeHours> savedOfficeHour = (List<OnlineOfficeHours>) officeHoursRepository.saveAll(uploadedOfficeHours);
    //         String body = mapper.writeValueAsString(savedOfficeHour);
    //         return ResponseEntity.ok().body(body);
    //     } catch(RuntimeException e){
    //         throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Malformed CSV", e);
    //     }
    // }

    @PostMapping(value = "/api/admin/officehours/upload", produces = "application/json")
    public ResponseEntity<String> uploadCSV(@RequestParam("csv") MultipartFile csv, @RequestHeader("Authorization") String authorization) throws IOException{
        logger.info("Starting upload CSV");
        AppUser user = authControllerAdvice.getUser(authorization);
        try {
            BufferedReader csvReader = new BufferedReader(new InputStreamReader(csv.getInputStream()));
            // logger.info(new String(csv.getInputStream().readAllBytes()));
            String row = "";
            String body = "";
            // Course
            String name;
            String quarter;
            String instructorFirstName;
            String instructorLastName;
            String instructorEmail;
            
            //Tutor
            String firstName;
            String lastName;
            String email;

            // TutorAssignment
            // Long TA_id;
            //need coresponding course and tutor
            String assignmentType;

            // Office Hours
            // Long id;
            String dayOfWeek;
            String startTime;
            String endTime;
            String zoomRoomLink;
            String notes;
            List<OnlineOfficeHours> savedOfficeHour = new ArrayList<>();
            while((row = csvReader.readLine()) != null){
                body += row;
                String [] data = row.split(",");
                
                name = data[0];
                quarter = data[1];
                instructorFirstName = data[2];
                instructorLastName = data[3];
                instructorEmail = data[4];
                firstName = data[5];
                lastName = data[6];
                email = data[7];
                assignmentType = data[8];
                dayOfWeek = data[9];
                startTime = data[10];
                endTime = data[11];
                zoomRoomLink = data[12];
                notes = data[13];

                // System.out.println(data[0]+data[1]);
                Course course = new Course(name,quarter,instructorFirstName,instructorLastName,instructorEmail);
                // System.out.println(course.toString());
                Course existingCourse = courseRepository.findByNameAndQuarter(course.getName(), course.getQuarter());
                if(existingCourse != null){
                    System.out.println(course.getName()+"already exist");
                }
                else{
                    courseRepository.save(course);
                }
                

                Tutor tutor = new Tutor(firstName,lastName,email);
                Tutor related_tutor;
                Optional<Tutor> existingTutor = tutorRepository.findByEmail(email);
                
                Course related_course = courseRepository.findByNameAndQuarter(course.getName(), course.getQuarter());
                if(!existingTutor.isPresent()){
                    related_tutor = tutorRepository.save(tutor);
                }
                else{
                    System.out.println("Tutor"+ tutor.toString() + "already exist");
                    related_tutor = existingTutor.get();
                }

                
                TutorAssignment TA;
                TutorAssignment tutorAssignment = new TutorAssignment(related_course,related_tutor,assignmentType);
                List<TutorAssignment> TAbyCourse = tutorAssignmentRepository.findAllByCourse(related_course);
                List<TutorAssignment> TAbyTutor = tutorAssignmentRepository.findAllByTutor(related_tutor);
                List<TutorAssignment> comm =TAbyCourse;
                comm.retainAll(TAbyTutor);
                if(comm == null){
                    TA = tutorAssignmentRepository.save(tutorAssignment);
                }
                else{
                    TA = comm.get(0);
                }
                

                OnlineOfficeHours OH = null;
                List<OnlineOfficeHours> existingOfficeHours = officeHoursRepository.findAllByTutorAssignment(TA);
                for(int i = 0; i < existingOfficeHours.size(); i++ ){
                    if (existingOfficeHours.get(i).getDayOfWeek() == dayOfWeek && existingOfficeHours.get(i).getStartTime() == startTime &&existingOfficeHours.get(i).getEndTime() == endTime){
                        OH = existingOfficeHours.get(i);
                        
                    }
                }
                if(OH ==null){
                    OH = new OnlineOfficeHours(TA, dayOfWeek, startTime, endTime, zoomRoomLink, notes);
                    savedOfficeHour.add(officeHoursRepository.save(OH));
                }
            }
            
            
            return ResponseEntity.ok().body(body);
        } catch(RuntimeException e){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Malformed CSV", e);
        }
    }
}
