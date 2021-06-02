package edu.ucsb.ucsbcslas.services;

import com.opencsv.exceptions.CsvDataTypeMismatchException;
import org.slf4j.Logger;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStreamReader;
import java.io.Reader;
import java.util.List;

public interface CSVToObjectService<T> {

    List<T> parse(Reader csv, Class<T> type);

    Logger getLogger();

    default List<T> parse(MultipartFile file, Class<T> type) {
        InputStreamReader reader = null;
        try {
            reader = new InputStreamReader(file.getInputStream());
            List<T> result = parse(reader, type);
            reader.close();
            return result;
        } catch (IOException e) {
            getLogger().error("CSV could not be parsed", e);
        } catch (RuntimeException e) {
            getLogger().error("CSV could not be parsed", e);
        } finally {
            if (reader != null) {
                try {
                    reader.close();
                } catch (IOException ex) {
                    getLogger().error("IOException: {}", ex);
                }
            }
        }
        return null;
    }

}
