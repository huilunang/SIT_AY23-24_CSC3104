package com.csc3104.grpc;

import static io.grpc.MethodDescriptor.generateFullMethodName;

/**
 */
@jakarta.annotation.Generated(value = "by gRPC proto compiler (version 1.42.1)", comments = "Source: travel-management.proto")
@io.grpc.stub.annotations.GrpcGenerated
public final class POIServiceGrpc {

  private POIServiceGrpc() {
  }

  public static final String SERVICE_NAME = "com.csc3104.grpc.POIService";

  // Static method descriptors that strictly reflect the proto.
  private static volatile io.grpc.MethodDescriptor<com.csc3104.grpc.POIRequest, com.csc3104.grpc.POIDetails> getGetPOIDetailsMethod;

  @io.grpc.stub.annotations.RpcMethod(fullMethodName = SERVICE_NAME + '/'
      + "GetPOIDetails", requestType = com.csc3104.grpc.POIRequest.class, responseType = com.csc3104.grpc.POIDetails.class, methodType = io.grpc.MethodDescriptor.MethodType.UNARY)
  public static io.grpc.MethodDescriptor<com.csc3104.grpc.POIRequest, com.csc3104.grpc.POIDetails> getGetPOIDetailsMethod() {
    io.grpc.MethodDescriptor<com.csc3104.grpc.POIRequest, com.csc3104.grpc.POIDetails> getGetPOIDetailsMethod;
    if ((getGetPOIDetailsMethod = POIServiceGrpc.getGetPOIDetailsMethod) == null) {
      synchronized (POIServiceGrpc.class) {
        if ((getGetPOIDetailsMethod = POIServiceGrpc.getGetPOIDetailsMethod) == null) {
          POIServiceGrpc.getGetPOIDetailsMethod = getGetPOIDetailsMethod = io.grpc.MethodDescriptor.<com.csc3104.grpc.POIRequest, com.csc3104.grpc.POIDetails>newBuilder()
              .setType(io.grpc.MethodDescriptor.MethodType.UNARY)
              .setFullMethodName(generateFullMethodName(SERVICE_NAME, "GetPOIDetails"))
              .setSampledToLocalTracing(true)
              .setRequestMarshaller(io.grpc.protobuf.ProtoUtils.marshaller(
                  com.csc3104.grpc.POIRequest.getDefaultInstance()))
              .setResponseMarshaller(io.grpc.protobuf.ProtoUtils.marshaller(
                  com.csc3104.grpc.POIDetails.getDefaultInstance()))
              .setSchemaDescriptor(new POIServiceMethodDescriptorSupplier("GetPOIDetails"))
              .build();
        }
      }
    }
    return getGetPOIDetailsMethod;
  }

  /**
   * Creates a new async stub that supports all call types for the service
   */
  public static POIServiceStub newStub(io.grpc.Channel channel) {
    io.grpc.stub.AbstractStub.StubFactory<POIServiceStub> factory = new io.grpc.stub.AbstractStub.StubFactory<POIServiceStub>() {
      @java.lang.Override
      public POIServiceStub newStub(io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
        return new POIServiceStub(channel, callOptions);
      }
    };
    return POIServiceStub.newStub(factory, channel);
  }

  /**
   * Creates a new blocking-style stub that supports unary and streaming output
   * calls on the service
   */
  public static POIServiceBlockingStub newBlockingStub(
      io.grpc.Channel channel) {
    io.grpc.stub.AbstractStub.StubFactory<POIServiceBlockingStub> factory = new io.grpc.stub.AbstractStub.StubFactory<POIServiceBlockingStub>() {
      @java.lang.Override
      public POIServiceBlockingStub newStub(io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
        return new POIServiceBlockingStub(channel, callOptions);
      }
    };
    return POIServiceBlockingStub.newStub(factory, channel);
  }

  /**
   * Creates a new ListenableFuture-style stub that supports unary calls on the
   * service
   */
  public static POIServiceFutureStub newFutureStub(
      io.grpc.Channel channel) {
    io.grpc.stub.AbstractStub.StubFactory<POIServiceFutureStub> factory = new io.grpc.stub.AbstractStub.StubFactory<POIServiceFutureStub>() {
      @java.lang.Override
      public POIServiceFutureStub newStub(io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
        return new POIServiceFutureStub(channel, callOptions);
      }
    };
    return POIServiceFutureStub.newStub(factory, channel);
  }

  /**
   */
  public static abstract class POIServiceImplBase implements io.grpc.BindableService {

    /**
     */
    public void getPOIDetails(com.csc3104.grpc.POIRequest request,
        io.grpc.stub.StreamObserver<com.csc3104.grpc.POIDetails> responseObserver) {
      io.grpc.stub.ServerCalls.asyncUnimplementedUnaryCall(getGetPOIDetailsMethod(), responseObserver);
    }

    @java.lang.Override
    public final io.grpc.ServerServiceDefinition bindService() {
      return io.grpc.ServerServiceDefinition.builder(getServiceDescriptor())
          .addMethod(
              getGetPOIDetailsMethod(),
              io.grpc.stub.ServerCalls.asyncUnaryCall(
                  new MethodHandlers<com.csc3104.grpc.POIRequest, com.csc3104.grpc.POIDetails>(
                      this, METHODID_GET_POIDETAILS)))
          .build();
    }
  }

  /**
   */
  public static final class POIServiceStub extends io.grpc.stub.AbstractAsyncStub<POIServiceStub> {
    private POIServiceStub(
        io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
      super(channel, callOptions);
    }

    @java.lang.Override
    protected POIServiceStub build(
        io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
      return new POIServiceStub(channel, callOptions);
    }

    /**
     */
    public void getPOIDetails(com.csc3104.grpc.POIRequest request,
        io.grpc.stub.StreamObserver<com.csc3104.grpc.POIDetails> responseObserver) {
      io.grpc.stub.ClientCalls.asyncUnaryCall(
          getChannel().newCall(getGetPOIDetailsMethod(), getCallOptions()), request, responseObserver);
    }
  }

  /**
   */
  public static final class POIServiceBlockingStub extends io.grpc.stub.AbstractBlockingStub<POIServiceBlockingStub> {
    private POIServiceBlockingStub(
        io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
      super(channel, callOptions);
    }

    @java.lang.Override
    protected POIServiceBlockingStub build(
        io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
      return new POIServiceBlockingStub(channel, callOptions);
    }

    /**
     */
    public com.csc3104.grpc.POIDetails getPOIDetails(com.csc3104.grpc.POIRequest request) {
      return io.grpc.stub.ClientCalls.blockingUnaryCall(
          getChannel(), getGetPOIDetailsMethod(), getCallOptions(), request);
    }
  }

  /**
   */
  public static final class POIServiceFutureStub extends io.grpc.stub.AbstractFutureStub<POIServiceFutureStub> {
    private POIServiceFutureStub(
        io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
      super(channel, callOptions);
    }

    @java.lang.Override
    protected POIServiceFutureStub build(
        io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
      return new POIServiceFutureStub(channel, callOptions);
    }

    /**
     */
    public com.google.common.util.concurrent.ListenableFuture<com.csc3104.grpc.POIDetails> getPOIDetails(
        com.csc3104.grpc.POIRequest request) {
      return io.grpc.stub.ClientCalls.futureUnaryCall(
          getChannel().newCall(getGetPOIDetailsMethod(), getCallOptions()), request);
    }
  }

  private static final int METHODID_GET_POIDETAILS = 0;

  private static final class MethodHandlers<Req, Resp> implements
      io.grpc.stub.ServerCalls.UnaryMethod<Req, Resp>,
      io.grpc.stub.ServerCalls.ServerStreamingMethod<Req, Resp>,
      io.grpc.stub.ServerCalls.ClientStreamingMethod<Req, Resp>,
      io.grpc.stub.ServerCalls.BidiStreamingMethod<Req, Resp> {
    private final POIServiceImplBase serviceImpl;
    private final int methodId;

    MethodHandlers(POIServiceImplBase serviceImpl, int methodId) {
      this.serviceImpl = serviceImpl;
      this.methodId = methodId;
    }

    @java.lang.Override
    @java.lang.SuppressWarnings("unchecked")
    public void invoke(Req request, io.grpc.stub.StreamObserver<Resp> responseObserver) {
      switch (methodId) {
        case METHODID_GET_POIDETAILS:
          serviceImpl.getPOIDetails((com.csc3104.grpc.POIRequest) request,
              (io.grpc.stub.StreamObserver<com.csc3104.grpc.POIDetails>) responseObserver);
          break;
        default:
          throw new AssertionError();
      }
    }

    @java.lang.Override
    @java.lang.SuppressWarnings("unchecked")
    public io.grpc.stub.StreamObserver<Req> invoke(
        io.grpc.stub.StreamObserver<Resp> responseObserver) {
      switch (methodId) {
        default:
          throw new AssertionError();
      }
    }
  }

  private static abstract class POIServiceBaseDescriptorSupplier
      implements io.grpc.protobuf.ProtoFileDescriptorSupplier, io.grpc.protobuf.ProtoServiceDescriptorSupplier {
    POIServiceBaseDescriptorSupplier() {
    }

    @java.lang.Override
    public com.google.protobuf.Descriptors.FileDescriptor getFileDescriptor() {
      return com.csc3104.grpc.TravelManagement.getDescriptor();
    }

    @java.lang.Override
    public com.google.protobuf.Descriptors.ServiceDescriptor getServiceDescriptor() {
      return getFileDescriptor().findServiceByName("POIService");
    }
  }

  private static final class POIServiceFileDescriptorSupplier
      extends POIServiceBaseDescriptorSupplier {
    POIServiceFileDescriptorSupplier() {
    }
  }

  private static final class POIServiceMethodDescriptorSupplier
      extends POIServiceBaseDescriptorSupplier
      implements io.grpc.protobuf.ProtoMethodDescriptorSupplier {
    private final String methodName;

    POIServiceMethodDescriptorSupplier(String methodName) {
      this.methodName = methodName;
    }

    @java.lang.Override
    public com.google.protobuf.Descriptors.MethodDescriptor getMethodDescriptor() {
      return getServiceDescriptor().findMethodByName(methodName);
    }
  }

  private static volatile io.grpc.ServiceDescriptor serviceDescriptor;

  public static io.grpc.ServiceDescriptor getServiceDescriptor() {
    io.grpc.ServiceDescriptor result = serviceDescriptor;
    if (result == null) {
      synchronized (POIServiceGrpc.class) {
        result = serviceDescriptor;
        if (result == null) {
          serviceDescriptor = result = io.grpc.ServiceDescriptor.newBuilder(SERVICE_NAME)
              .setSchemaDescriptor(new POIServiceFileDescriptorSupplier())
              .addMethod(getGetPOIDetailsMethod())
              .build();
        }
      }
    }
    return result;
  }
}
