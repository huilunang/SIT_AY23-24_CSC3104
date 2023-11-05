package com.csc3104.poi;

import java.util.Collections;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.ArrayList;

import org.json.JSONArray;
import org.json.JSONObject;
import org.json.JSONException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;


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

    // Format location data from Yelp API to suitable address format
    public static String formatAddress(JSONObject location) throws JSONException {
        String address1 = location.getString("address1");
        String address2 = location.optString("address2", ""); 
        String address3 = location.optString("address3", "");
        String city = location.getString("city");
        String zipCode = location.getString("zip_code");

        StringBuilder formattedAddress = new StringBuilder(address1);
        if (!address2.equals("null") && !address2.equals("")) {
            formattedAddress.append(", ").append(address2);
            if (!address3.equals("null") && !address3.equals("")) {
                formattedAddress.append(", ").append(address3);
            }
        }
        formattedAddress.append(", ").append(city).append(" ").append(zipCode);
        return formattedAddress.toString();
    }

    // Based on business ID, return the business details in array 
    // Name: Name of the shop
    // Categories: Category of the shop (bar, cafe, etc.)
    // Location: Address of the shop
    // Image URL: Image of the shop
    // Rating: Rating of the shop 
    public Object[] getDetails(String businessId) {
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + apiKey);

        String url = yelpBaseUrl + "/businesses/" + businessId;

        ResponseEntity<String> responseEntity = restTemplate.exchange(url, HttpMethod.GET, new HttpEntity<>(headers), String.class);

        try {
            if (responseEntity.getStatusCode() == HttpStatus.OK) {
                String response = responseEntity.getBody();
                
                JSONObject jsonObject = new JSONObject(response);

                String name = jsonObject.getString("name");
                String imageURL = jsonObject.getString("image_url");
                String rating = jsonObject.getString("rating");

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

                Object[] result = new Object[5];
                result[0] = name;
                result[1] = imageURL;
                result[2] = categoriesAll.toString();
                result[3] = address;
                result[4] = rating;

                return result;
            } else {
                return null;
            }
        } catch (JSONException e) {
            e.printStackTrace();
            return null;
        }
    }

    // Get Autocomplete suggestions 
    public Map<String, String[]> getAutoCompleteSuggestion(String location, String userInput) {
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + apiKey);

        String url = yelpBaseUrl + "/businesses/search?location=" + location + "&term=" + userInput;

        ResponseEntity<String> responseEntity = restTemplate.exchange(url, HttpMethod.GET, new HttpEntity<>(headers), String.class);

        if (responseEntity.getStatusCode() == HttpStatus.OK) {
            try {
                String response = responseEntity.getBody();
                
                JSONObject jsonResponse = new JSONObject(response);

                JSONArray suggestions = jsonResponse.getJSONArray("businesses");
                
                Map<String, String[]> suggestedShopInfo = new LinkedHashMap<>();
                
                int count = 0;
                for (int i = 0; i < suggestions.length(); i++) {
                    if (count >= 5) {
                        break;
                    }
                    JSONObject business = suggestions.getJSONObject(i);
                    String businessId = business.getString("id");
                    String name = business.getString("name");
                    JSONObject locationInfo = business.getJSONObject("location");
                    String address = locationInfo.getString("address1");
    
                    String nameAndAddress = name + " | " + address;
                    String[] details = {nameAndAddress, name, address};
                    
                    if (name.toLowerCase().contains(userInput.toLowerCase())) {
                        suggestedShopInfo.put(businessId, details);
                        count++;
                    }
                }
    
                return suggestedShopInfo;
            } catch (JSONException e) {
                e.printStackTrace();
            }
        }
        return Collections.emptyMap();
    }

    // Creation of POI Record
    public POI getPOIRecord(String businessId) {
        POI poi = new POI();

        Object[] details = getDetails(businessId);
        String name = (String) details[0];
        String imageURL = (String) details[1];
        String categories = (String) details[2];
        String address = (String) details[3];
        String rating = (String) details[4];

        poi.setName(name);
        poi.setImageUrl(imageURL);
        poi.setCategory(categories);
        poi.setAddress(address);
        poi.setRating(rating);
        poi.setRemarks("");

        return poi;
    }

    // Set Radius
    public static final int radius=3000;

    // public ArrayList<POI> getPOIByArea(String location, String[] categories){
    public ArrayList<POI> getPOIByArea(String location){
        // Set Header
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + apiKey);
        // Initialize ArrayList of POIs and Radius
        ArrayList<POI> POIs = new ArrayList<>();
        // if (categories.length>0){
        //     for (int i=0; i<categories.length;i++){
        //         String category = categories[i];
        //     }
        // }
        // Encode location string into UTF-8 Format
        // location = "Yio Chu Kang";
        // try {
        //     location = URLEncoder.encode(location, "UTF-8");
        // } catch (UnsupportedEncodingException e) {
        //     e.printStackTrace();
        // }
        String locQuery = "&location=" + location;
        String url = yelpBaseUrl + "/businesses/search?radius=3000&limit=40&category=food" + locQuery;
        
        ResponseEntity<String> responseEntity = restTemplate.exchange(url, HttpMethod.GET, new HttpEntity<>(headers), String.class);

        if (responseEntity.getStatusCode() == HttpStatus.OK) {
            try{
                String response = responseEntity.getBody();
                JSONObject jsonResponse = new JSONObject(response);
                JSONArray businesses = jsonResponse.getJSONArray("businesses");

                for (int i = 0; i < businesses.length(); i++) {
                    JSONObject business = businesses.getJSONObject(i);
                    POI poi = new POI();
                    poi.setName(business.getString("name"));
                    poi.setCategory(business.getJSONArray("categories").getJSONObject(0).getString("title"));
                    poi.setAddress(business.getJSONObject("location").getString("address1"));
                    poi.setImageUrl(business.getString("image_url"));
                    poi.setRating(business.getString("rating"));
                    POIs.add(poi);
                }
            }catch(JSONException e) {
                e.printStackTrace();
            }
        }

        return POIs;
    }
}