package com.csc3104.notifications.Event;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.csc3104.grpc.POIDetails;
import com.csc3104.grpc.POIRequest;

import net.devh.boot.grpc.client.inject.GrpcClient;

@Service
public class EventService {
    // override gRPC generated code
    // @Autowired
    // private EventRepository repository;

    @GrpcClient("poi-service")
    private com.csc3104.grpc.POIServiceGrpc.POIServiceBlockingStub poiServiceBlockingStub;

    public List<String> sendDetailsToEvents(String businessId) {


        POIRequest req = POIRequest.newBuilder()
                .setBusinessId(businessId)
                .build();

        POIDetails details = poiServiceBlockingStub.getPOIDetails(req);

        // Create a list to hold the details
        List<String> detailsList = new ArrayList<>();

        // Adding details to the list
        detailsList.add("Name: " + details.getName());
        detailsList.add("Image URL: " + details.getImageUrl());
        detailsList.add("Category: " + details.getCategory());
        detailsList.add("Address: " + details.getAddress());

        return detailsList;
    }
}