package com.csc3104.poi;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.bson.types.ObjectId;
import org.json.JSONArray;
import org.json.JSONObject;
import org.json.JSONException;
import org.springframework.context.annotation.Bean;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;


@Service
public class POIService {
    // @Value("${api.baseurl}")
    private String yelpBaseUrl = "https://api.yelp.com/v3";

    // @Value("${api.key}")
    private String apiKey = "T-x0gy1cReiguaj6wrR7t3Bbh1VLvXOdQtqWD5S_utPY-MSF55xx5HSe916Ffh3l3HufmaMviu-ty2XUKTLeyta6v2MkWOX0I3H7sOWUOOWQM_OVdCrPMIGS3SI6ZXYx";

    private final RestTemplate restTemplate;

    @Autowired
    public POIService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public static String formatAddress(JSONObject location) throws JSONException {
        String address1 = location.getString("address1");
        String address2 = location.optString("address2", ""); 
        String address3 = location.optString("address3", "");
        String city = location.getString("city");
        String zipCode = location.getString("zip_code");

        StringBuilder formattedAddress = new StringBuilder(address1);
        if (!address2.isEmpty()) {
            formattedAddress.append(", ").append(address2);
            if (!address3.isEmpty()) {
                formattedAddress.append(", ").append(address3);
            }
        }
        formattedAddress.append(", ").append(city).append(" ").append(zipCode);
        return formattedAddress.toString();
    }

    public POI getDetails(String businessId) {
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + apiKey);

        String url = yelpBaseUrl + "/businesses/" + businessId;

        ResponseEntity<String> responseEntity = restTemplate.exchange(url, HttpMethod.GET, new HttpEntity<>(headers), String.class);

        try {
            if (responseEntity.getStatusCode() == HttpStatus.OK) {
                String response = responseEntity.getBody();
                POI poi = new POI();
                
                JSONObject jsonObject = new JSONObject(response);

                String name = jsonObject.getString("name");
                String imageURL = jsonObject.getString("image_url");

                JSONObject location = jsonObject.getJSONObject("location");
                String address = formatAddress(location);

                JSONArray categories = jsonObject.getJSONArray("categories");
                StringBuilder categoriesAll = new StringBuilder();
                for (int i = 0; i < categories.length(); i++) {
                    String category = categories.getJSONObject(i).getString("title");
                    if (i == 0) {
                        categoriesAll.append(category);
                    } else {
                        categoriesAll.append(", ").append(category);
                    }
                }

                poi.setName(name);
                poi.setImageUrl(imageURL);
                poi.setCategory(categoriesAll.toString());
                poi.setAddress(address);

                return poi;
            } else {
                return null; 
            }
        } catch (JSONException e) {
            e.printStackTrace();
            return null;
        }
    }
}