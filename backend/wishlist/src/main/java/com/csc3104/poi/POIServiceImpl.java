package com.csc3104.poi;

import com.csc3104.grpc.POIRequest;
import com.csc3104.grpc.POIDetails;
// import com.csc3104.poi.POIService;
import com.csc3104.grpc.POIServiceGrpc.POIServiceImplBase;

import net.devh.boot.grpc.server.service.GrpcService;

import io.grpc.Status;
import io.grpc.stub.StreamObserver;

@GrpcService
public class POIServiceImpl extends POIServiceImplBase {

    private final POIService poiService;

    public POIServiceImpl(POIService poiService) {
        this.poiService = poiService;
    }

    @Override
    public void getPOIDetails(POIRequest request, StreamObserver<POIDetails> responseObserver) {
        String businessId = request.getBusinessId();

        Object[] details = poiService.getDetails(businessId);
        POIDetails.Builder poiDetailsBuilder = POIDetails.newBuilder();

        if (details != null) {
            poiDetailsBuilder
                    .setName((String) details[0])
                    .setImageUrl((String) details[1])
                    .setCategory((String) details[2])
                    .setAddress((String) details[3]);

            responseObserver.onNext(poiDetailsBuilder.build());
            responseObserver.onCompleted();
        } else {
            responseObserver.onError(Status.NOT_FOUND.asException());
        }
    }
}
