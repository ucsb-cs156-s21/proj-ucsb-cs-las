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

// Imports from BZ when adding uploading CSV functionality to Tutor Assignment
import org.springframework.web.server.ResponseStatusException;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.bind.annotation.RequestParam;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.Reader;
import java.lang.*;
import edu.ucsb.ucsbcslas.services.CSVToObjectService;
import edu.ucsb.ucsbcslas.entities.AppUser;
import edu.ucsb.ucsbcslas.models.TutorAssignmentModel;

import org.json.JSONObject;

import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.ArrayList;
import java.util.Map;
import java.util.Optional;
import java.util.Set;

import javax.validation.Valid;

import com.auth0.jwt.JWT;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import edu.ucsb.ucsbcslas.advice.AuthControllerAdvice;
import edu.ucsb.ucsbcslas.models.Course;
import edu.ucsb.ucsbcslas.entities.Tutor;
import edu.ucsb.ucsbcslas.entities.TutorAssignment;
import edu.ucsb.ucsbcslas.repositories.CourseRepository;
import edu.ucsb.ucsbcslas.repositories.TutorRepository;
import edu.ucsb.ucsbcslas.repositories.TutorAssignmentRepository;

@RestController
public class TutorAssignmentController {
    private final Logger logger = LoggerFactory.getLogger(TutorAssignmentController.class);

    @Autowired
    private AuthControllerAdvice authControllerAdvice;
    @Autowired
    private TutorAssignmentRepository tutorAssignmentRepository;
    @Autowired
    private CourseRepository courseRepository;
    @Autowired
    private TutorRepository tutorRepository;
    @Autowired
    CSVToObjectService<TutorAssignmentModel> csvToObjectService;

    private ObjectMapper mapper = new ObjectMapper();

    private ResponseEntity<String> getUnauthorizedResponse(String roleRequired) throws JsonProcessingException {
        Map<String, String> response = new HashMap<String, String>();
        response.put("error", String.format("Unauthorized; only %s may access this resource.", roleRequired));
        String body = mapper.writeValueAsString(response);
        return new ResponseEntity<String>(body, HttpStatus.UNAUTHORIZED);
    }

    private ResponseEntity<String> getIncorrectInputResponse() throws JsonProcessingException {
        Map<String, String> response = new HashMap<String, String>();
        response.put("error", String
                .format("Misformatted Input; Check that the tutor email that was input is assigned to a valid tutor"));
        String body = mapper.writeValueAsString(response);
        return new ResponseEntity<String>(body, HttpStatus.BAD_REQUEST);
    }

    @PostMapping(value = "/api/member/tutorAssignments", produces = "application/json")
    public ResponseEntity<String> createTutorAssignment(@RequestHeader("Authorization") String authorization,
            @RequestBody @Valid String tutorAssignment) throws JsonProcessingException {
        if (!authControllerAdvice.getIsAdmin(authorization)) {
            if (courseRepository.findAllByInstructorEmail(authControllerAdvice.getUser(authorization).getEmail())
                    .isEmpty()) {
                return getUnauthorizedResponse("instructor");
            }
        }

        JSONObject ta = new JSONObject(tutorAssignment);
        TutorAssignment newAssignment = new TutorAssignment();

        JSONObject cInfo = new JSONObject(ta.get("course").toString());
        logger.info("course= {}", cInfo);
        Course c = new Course(cInfo.getLong("id"), cInfo.getString("name"), cInfo.getString("quarter"),
                cInfo.getString("instructorFirstName"), cInfo.getString("instructorLastName"),
                cInfo.getString("instructorEmail"));
        newAssignment.setCourse(c);

        Optional<Tutor> tutor = tutorRepository.findByEmail(ta.getString("tutorEmail"));
        if (tutor.isPresent()) {
            newAssignment.setTutor(tutor.get());
        } else {
            return getIncorrectInputResponse();
        }
        newAssignment.setAssignmentType(ta.getString("assignmentType"));

        logger.info("newAssignment= {}", newAssignment);
        TutorAssignment savedTutorAssignment = tutorAssignmentRepository.save(newAssignment);
        String body = mapper.writeValueAsString(savedTutorAssignment);
        return ResponseEntity.ok().body(body);
    }

    @GetMapping(value = "/api/member/tutorAssignments", produces = "application/json")
    public ResponseEntity<String> getTutorAssignments(@RequestHeader("Authorization") String authorization)
            throws JsonProcessingException {
        List<TutorAssignment> tutorAssignmentList = new ArrayList();
        if (authControllerAdvice.getIsAdmin(authorization)) {
            tutorAssignmentList = tutorAssignmentRepository.findAll();
            if (tutorAssignmentList.isEmpty()) {
                return ResponseEntity.notFound().build();
            }
            ObjectMapper mapper = new ObjectMapper();
            String body = mapper.writeValueAsString(tutorAssignmentList);
            return ResponseEntity.ok().body(body);
        } else {
            List<Course> courseList = courseRepository
                    .findAllByInstructorEmail(authControllerAdvice.getUser(authorization).getEmail());
            if (!(courseList.isEmpty())) {
                for (Course temp : courseList) {
                    Optional<Course> course = courseRepository.findById(temp.getId());
                    if (course.isPresent()) {
                        List<TutorAssignment> tutorAssignments = tutorAssignmentRepository
                                .findAllByCourse(course.get());
                        tutorAssignmentList.addAll(tutorAssignments);
                    }
                }
                if (tutorAssignmentList.isEmpty()) {
                    return ResponseEntity.notFound().build();
                }
                ObjectMapper mapper = new ObjectMapper();
                String body = mapper.writeValueAsString(tutorAssignmentList);
                return ResponseEntity.ok().body(body);
            }
        }
        if (authControllerAdvice.getIsMember(authorization)) {
            Optional<Tutor> tutor = tutorRepository.findByEmail(authControllerAdvice.getUser(authorization).getEmail());
            if (tutor.isPresent()) {
                List<TutorAssignment> tutorAssignments = tutorAssignmentRepository.findAllByTutor(tutor.get());
                tutorAssignmentList.addAll(tutorAssignments);
            }
            if (tutorAssignmentList.isEmpty()) {
                return ResponseEntity.notFound().build();
            }
            ObjectMapper mapper = new ObjectMapper();
            String body = mapper.writeValueAsString(tutorAssignmentList);
            return ResponseEntity.ok().body(body);
        }
        return getUnauthorizedResponse("member");
    }

    @GetMapping(value = "/api/public/tutorAssignment/{course_id}", produces = "application/json")
    public ResponseEntity<String> getTutorAssignmentByCourseID(@PathVariable("course_id") Long course_id)
            throws JsonProcessingException {
        List<TutorAssignment> tutorAssignments = tutorAssignmentRepository.findAllByCourseId(course_id);

        ObjectMapper mapper = new ObjectMapper();
        String body = mapper.writeValueAsString(tutorAssignments);
        return ResponseEntity.ok().body(body);
    }

    /**
     * return a list of all course numbers that appear in the tutor assignment table
     * 
     * @return response containing a list of all course numbers
     * @throws JsonProcessingException
     */
    @GetMapping(value = "/api/public/tutorAssignment/course_numbers", produces = "application/json")
    public ResponseEntity<String> getCourseNumbers() throws JsonProcessingException {
        List<TutorAssignment> tutorAssignments = tutorAssignmentRepository.findAll();
        Set<String> courseNumbers = new HashSet<String>();
        for (TutorAssignment ta : tutorAssignments) {
            courseNumbers.add(ta.getCourse().getName());

        }

        ObjectMapper mapper = new ObjectMapper();
        String body = mapper.writeValueAsString(courseNumbers);
        return ResponseEntity.ok().body(body);
    }

    @GetMapping(value = "/api/public/tutorAssignment/byCourseNumber/{courseNumber}", produces = "application/json")
    public ResponseEntity<String> getTutorAssignmentByCourseID(@PathVariable("courseNumber") String courseNumber)
            throws JsonProcessingException {
        List<TutorAssignment> tutorAssignments = tutorAssignmentRepository.findAll();
        List<TutorAssignment> tutorAssignmentsMatchingCourse = new ArrayList<TutorAssignment>();
        for (TutorAssignment ta : tutorAssignments) {
            if (ta.getCourse().getName().equals(courseNumber)) {
                tutorAssignmentsMatchingCourse.add(ta);
            }

        }
        ObjectMapper mapper = new ObjectMapper();
        String body = mapper.writeValueAsString(tutorAssignmentsMatchingCourse);
        return ResponseEntity.ok().body(body);
    }

    @GetMapping(value = "/api/member/tutorAssignment/byTutor/{tutor}", produces = "application/json")
    public ResponseEntity<String> getTutorAssignmentByTutor(@PathVariable("tutor") String tutorEmail)
            throws JsonProcessingException {

        Optional<Tutor> tutor = tutorRepository.findByEmail(tutorEmail);
        List<TutorAssignment> tutorAssignments = new ArrayList<TutorAssignment>();
        tutorAssignments = tutorAssignmentRepository.findAllByTutor(tutor.get());
        ObjectMapper mapper = new ObjectMapper();
        String body = mapper.writeValueAsString(tutorAssignments);
        return ResponseEntity.ok().body(body);

    }

    @GetMapping(value = "/api/member/tutorAssignments/{id}", produces = "application/json")
    public ResponseEntity<String> getTutorAssignment(@PathVariable("id") Long id) throws JsonProcessingException {
        Optional<TutorAssignment> tutorAssignment = tutorAssignmentRepository.findById(id);
        if (tutorAssignment.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        ObjectMapper mapper = new ObjectMapper();
        String body = mapper.writeValueAsString(tutorAssignment.get());
        return ResponseEntity.ok().body(body);
    }

    @PutMapping(value = "/api/member/tutorAssignments/{id}", produces = "application/json")
    public ResponseEntity<String> updateTutorAssignment(@RequestHeader("Authorization") String authorization,
            @PathVariable("id") Long id, @RequestBody @Valid String incomingTutorAssignment)
            throws JsonProcessingException {

        if (!authControllerAdvice.getIsAdmin(authorization))
            return getUnauthorizedResponse("admin");
        Optional<TutorAssignment> tutorAssignment = tutorAssignmentRepository.findById(id);
        if (!tutorAssignment.isPresent()) {
            return ResponseEntity.notFound().build();
        }
        logger.info(incomingTutorAssignment);
        JSONObject ta = new JSONObject(incomingTutorAssignment);
        TutorAssignment newAssignment = new TutorAssignment();
        logger.info("ta: ", ta.toString());
        JSONObject cInfo = new JSONObject(ta.get("course").toString());
        logger.info("cInfo: ", cInfo.toString());
        Course c = new Course(cInfo.getLong("id"), cInfo.getString("name"), cInfo.getString("quarter"),
                cInfo.getString("instructorFirstName"), cInfo.getString("instructorLastName"),
                cInfo.getString("instructorEmail"));
        newAssignment.setCourse(c);

        logger.info("tutorAssignment: ", tutorAssignment.get().getTutor().getEmail());
        logger.info("ta: ", ta.getString("tutorEmail"));
        if (!(ta.getString("tutorEmail").equals(tutorAssignment.get().getTutor().getEmail()))) {
            Optional<Tutor> tutor = tutorRepository.findByEmail(ta.getString("tutorEmail"));
            logger.info("tutor: ", tutor);
            if (tutor.isPresent()) {
                newAssignment.setTutor(tutor.get());
            } else {
                return getIncorrectInputResponse();
            }
        } else {

            JSONObject tInfo = new JSONObject(ta.get("tutor").toString());
            Tutor t = new Tutor(tInfo.getLong("id"), tInfo.getString("firstName"), tInfo.getString("lastName"),
                    tInfo.getString("email"));
            newAssignment.setTutor(t);

        }
        newAssignment.setAssignmentType(ta.getString("assignmentType"));

        newAssignment.setId(id);
        tutorAssignmentRepository.save(newAssignment);
        String body = mapper.writeValueAsString(newAssignment);
        return ResponseEntity.ok().body(body);
    }

    // Controller to upload CSV for tutorAssignment Service

    @PostMapping(value = "/api/member/tutorAssignments/upload", produces = "application/json")
    public ResponseEntity<String> uploadCSV(@RequestParam("csv") MultipartFile csv,
            @RequestHeader("Authorization") String authorization) throws IOException {
        logger.info("Starting upload CSV");
        AppUser user = authControllerAdvice.getUser(authorization);
        try {
            Reader reader = new InputStreamReader(csv.getInputStream());
            logger.info(new String(csv.getInputStream().readAllBytes()));
            List<TutorAssignmentModel> uploadedTutorAssignments = csvToObjectService.parse(reader,
                    TutorAssignmentModel.class);

            logger.info(uploadedTutorAssignments.get(0).toString());
            for (TutorAssignmentModel i : uploadedTutorAssignments) {
                Course currentCourse;
                Tutor currentTutor;
                List<Course> courseList = courseRepository.findByNameAndQuarterAndInstructorEmail(i.getCourseName(),
                        i.getQuarter(), i.getInstructorEmail());
                if (courseList.isEmpty()) {
                    currentCourse = new Course(i.getCourseName(), i.getQuarter(), i.getInstructorFirstName(),
                            i.getInstructorLastName(), i.getInstructorEmail());
                    courseRepository.save(currentCourse);
                } else {
                    currentCourse = courseList.get(0);
                }

            }

            // List<TutorAssignmentModel> savedTutorAssignments =
            // (List<TutorAssignmentModel>) tutorAssignmentRepository
            // .saveAll(uploadedTutorAssignments);
            // String body = mapper.writeValueAsString(savedTutorAssignments);
            // return ResponseEntity.ok().body(body);

            return ResponseEntity.ok().body("empty");
        } catch (RuntimeException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Malformed CSV", e);
        }
    }
    // Possibility of having 2 instances of the same prof teaching 2 classes in the
    // same quarter (same class name)

    // findByNameAndQuarterAndInstructorEmail
}
