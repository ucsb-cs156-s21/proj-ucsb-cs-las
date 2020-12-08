package edu.ucsb.ucsbcslas.services;

import java.io.PrintWriter;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import com.opencsv.CSVWriter;

import java.util.List;
import java.util.stream.Collectors;

import edu.ucsb.ucsbcslas.models.Course;

public class CourseTabletoCSV{
    private static Logger logger = LoggerFactory.getLogger(CourseTabletoCSV.class);
    public static void writeCSV(PrintWriter writer, List<Course> courseList){
    String[] header = {"id","Course Name","Quarter","First name","Last name","Email"};
        try{
            CSVWriter csvWriter = new CSVWriter(writer,
                        CSVWriter.DEFAULT_SEPARATOR,
                        CSVWriter.NO_QUOTE_CHARACTER,
                        CSVWriter.DEFAULT_ESCAPE_CHARACTER,
                        CSVWriter.DEFAULT_LINE_END);

         
            csvWriter.writeNext(header);

            for (Course c1: courseList){
        
                String data[] = {
                    c1.getId().toString(),
                    c1.getName(),
                    c1.getQuarter(),
                    c1.getInstructorFirstName(),
                    c1.getInstructorLastName(),
                    c1.getInstructorEmail()
                };
                csvWriter.writeNext(data);
            
            csvWriter.close();
        }
    }
        catch (Exception e){
            logger.info("Writing CSV error");
            e.printStackTrace();
        }

    }
}