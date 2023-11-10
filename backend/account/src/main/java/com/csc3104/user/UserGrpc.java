package com.csc3104.user;

import io.grpc.Status;
import io.grpc.stub.StreamObserver;
import lombok.AllArgsConstructor;
import com.csc3104.user.UserServiceGrpc;
import com.csc3104.user.Account.UserResponse;
import com.csc3104.user.Account.UserRequest;
import net.devh.boot.grpc.server.service.GrpcService;
import org.springframework.http.HttpStatus;

@GrpcService
@AllArgsConstructor
public class UserGrpc extends UserServiceGrpc.UserServiceImplBase {

    private final UserService userService;

    @Override
    public void getUserByEmail(UserRequest request, StreamObserver<UserResponse> responseObserver) {
        var email = request.getEmail();
        var userResponse = userService.getUserByEmail(email); 

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
