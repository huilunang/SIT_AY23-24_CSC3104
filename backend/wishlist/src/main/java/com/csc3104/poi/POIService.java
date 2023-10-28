package main.java.com.csc3104.poi;

import java.util.List;
import java.util.Optional;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.ResponseEntity;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;


@Service
public class POIService {
    @Value("${yelp.api.base-url}")
    private String yelpBaseUrl;

    @Value("${yelp.api.api-key}")
    private String apiKey;

    @Autowired
    private RestTemplate restTemplate;

    public ResponseEntity<String> searchYelp(String term, String location) {
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + apiKey);

        String url = yelpBaseUrl + "/businesses/search?term=" + term + "&location=" + location;

        HttpEntity<String> entity = new HttpEntity<>(headers);
        return restTemplate.exchange(url, HttpMethod.GET, entity, String.class);
    }
}
