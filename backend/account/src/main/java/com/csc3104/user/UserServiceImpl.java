package com.csc3104.user;

import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;

import io.grpc.Status;
import io.grpc.stub.StreamObserver;
import net.devh.boot.grpc.server.service.GrpcService;

import com.csc3104.user.UserResponse;
import com.csc3104.user.UserRequest;
import com.csc3104.user.UserServiceGrpc.UserServiceImplBase;

@GrpcService
public class UserServiceImpl extends UserServiceImplBase {

    private final UserService userService;

    public UserServiceImpl(UserService userService) {
        this.userService = userService;
    }

    @Override
    public void getUserByEmail(UserRequest request, StreamObserver<UserResponse> responseObserver) {
        String userEmail = request.getEmail();
        var userResponse = userService.getUserByEmail(userEmail);

        if (userResponse.getStatusCode() == HttpStatus.OK) {
            UserDTO user = userResponse.getBody(); // Make sure the response contains the UserDTO

            UserResponse response = UserResponse.newBuilder()
                    .setFirstname(user.getFirstname())
                    .setLastname(user.getLastname())
                    .setEmail(user.getEmail())
                    .build();

            responseObserver.onNext(response);
            responseObserver.onCompleted();
        } else {
            responseObserver.onError(Status.NOT_FOUND.asRuntimeException());
        }
    }
}