package com.csc3104.notifications.Event;

import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.csc3104.grpc.POIDetails;
import com.csc3104.grpc.POIRequest;

import net.devh.boot.grpc.client.inject.GrpcClient;

@Service
public class EventService {
    // override gRPC generated code

    @GrpcClient("poi-service")
    private com.csc3104.grpc.POIServiceGrpc.POIServiceBlockingStub poiServiceBlockingStub;

    public Map<String, String> sendDetailsToEvents(String businessId) {

        POIRequest req = POIRequest.newBuilder()
                .setBusinessId(businessId)
                .build();

        POIDetails details = poiServiceBlockingStub.getPOIDetails(req);

        if (details != null) {
            Map<String, String> detailsMap = new HashMap<>();
            
            // Adding details to the map
            detailsMap.put("Name", details.getName());
            detailsMap.put("Image URL", details.getImageUrl());
            detailsMap.put("Category", details.getCategory());
            detailsMap.put("Address", details.getAddress());

            return detailsMap;
        } else {
            // Handle the case where details are not found
            return Collections.singletonMap("error", "Details not found for businessId: " + businessId);
        }
    }
}