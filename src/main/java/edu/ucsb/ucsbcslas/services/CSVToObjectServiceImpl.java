package edu.ucsb.ucsbcslas.services;

import com.opencsv.bean.CsvToBeanBuilder;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.io.Reader;
import java.util.List;
import java.lang.Class;

@Service
public class CSVToObjectServiceImpl<T> implements CSVToObjectService<T> {
    private static Logger log = LoggerFactory.getLogger(CSVToObjectServiceImpl.class);

    @Override
    public List<T> parse(Reader csv, Class<T> type) {
        return new CsvToBeanBuilder<T>(csv)
            .withSkipLines(1)
            .withType(type)
            .build()
            .parse();
    }

    @Override
    public Logger getLogger() {
        return log;
    }
}

