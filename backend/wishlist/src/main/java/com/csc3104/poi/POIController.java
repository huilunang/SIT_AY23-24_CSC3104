package main.java.com.csc3104.poi;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/poi")
public class POIController {
    @Autowired
    private POIService poiService;

    // @GetMapping("/search")
    // public ResponseEntity<String> searchPOI(@RequestParam String term, @RequestParam String location) {
    //     return poiService.searchYelp(term, location);
    // }

    @GetMapping("/search")
    public String test(){
        return "hello";
    }
}   
