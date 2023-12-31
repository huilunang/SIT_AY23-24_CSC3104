// Generated by the protocol buffer compiler.  DO NOT EDIT!
// source: travel-management.proto

package com.csc3104.grpc;

/**
 * Protobuf type {@code com.csc3104.grpc.POIRequest}
 */
public final class POIRequest extends
    com.google.protobuf.GeneratedMessageV3 implements
    // @@protoc_insertion_point(message_implements:com.csc3104.grpc.POIRequest)
    POIRequestOrBuilder {
  private static final long serialVersionUID = 0L;

  // Use POIRequest.newBuilder() to construct.
  private POIRequest(com.google.protobuf.GeneratedMessageV3.Builder<?> builder) {
    super(builder);
  }

  private POIRequest() {
    businessId_ = "";
  }

  @java.lang.Override
  @SuppressWarnings({ "unused" })
  protected java.lang.Object newInstance(
      UnusedPrivateParameter unused) {
    return new POIRequest();
  }

  @java.lang.Override
  public final com.google.protobuf.UnknownFieldSet getUnknownFields() {
    return this.unknownFields;
  }

  private POIRequest(
      com.google.protobuf.CodedInputStream input,
      com.google.protobuf.ExtensionRegistryLite extensionRegistry)
      throws com.google.protobuf.InvalidProtocolBufferException {
    this();
    if (extensionRegistry == null) {
      throw new java.lang.NullPointerException();
    }
    com.google.protobuf.UnknownFieldSet.Builder unknownFields = com.google.protobuf.UnknownFieldSet.newBuilder();
    try {
      boolean done = false;
      while (!done) {
        int tag = input.readTag();
        switch (tag) {
          case 0:
            done = true;
            break;
          case 10: {
            java.lang.String s = input.readStringRequireUtf8();

            businessId_ = s;
            break;
          }
          default: {
            if (!parseUnknownField(
                input, unknownFields, extensionRegistry, tag)) {
              done = true;
            }
            break;
          }
        }
      }
    } catch (com.google.protobuf.InvalidProtocolBufferException e) {
      throw e.setUnfinishedMessage(this);
    } catch (java.io.IOException e) {
      throw new com.google.protobuf.InvalidProtocolBufferException(
          e).setUnfinishedMessage(this);
    } finally {
      this.unknownFields = unknownFields.build();
      makeExtensionsImmutable();
    }
  }

  public static final com.google.protobuf.Descriptors.Descriptor getDescriptor() {
    return com.csc3104.grpc.TravelManagement.internal_static_com_csc3104_grpc_POIRequest_descriptor;
  }

  @java.lang.Override
  protected com.google.protobuf.GeneratedMessageV3.FieldAccessorTable internalGetFieldAccessorTable() {
    return com.csc3104.grpc.TravelManagement.internal_static_com_csc3104_grpc_POIRequest_fieldAccessorTable
        .ensureFieldAccessorsInitialized(
            com.csc3104.grpc.POIRequest.class, com.csc3104.grpc.POIRequest.Builder.class);
  }

  public static final int BUSINESSID_FIELD_NUMBER = 1;
  private volatile java.lang.Object businessId_;

  /**
   * <code>string businessId = 1;</code>
   * 
   * @return The businessId.
   */
  @java.lang.Override
  public java.lang.String getBusinessId() {
    java.lang.Object ref = businessId_;
    if (ref instanceof java.lang.String) {
      return (java.lang.String) ref;
    } else {
      com.google.protobuf.ByteString bs = (com.google.protobuf.ByteString) ref;
      java.lang.String s = bs.toStringUtf8();
      businessId_ = s;
      return s;
    }
  }

  /**
   * <code>string businessId = 1;</code>
   * 
   * @return The bytes for businessId.
   */
  @java.lang.Override
  public com.google.protobuf.ByteString getBusinessIdBytes() {
    java.lang.Object ref = businessId_;
    if (ref instanceof java.lang.String) {
      com.google.protobuf.ByteString b = com.google.protobuf.ByteString.copyFromUtf8(
          (java.lang.String) ref);
      businessId_ = b;
      return b;
    } else {
      return (com.google.protobuf.ByteString) ref;
    }
  }

  private byte memoizedIsInitialized = -1;

  @java.lang.Override
  public final boolean isInitialized() {
    byte isInitialized = memoizedIsInitialized;
    if (isInitialized == 1)
      return true;
    if (isInitialized == 0)
      return false;

    memoizedIsInitialized = 1;
    return true;
  }

  @java.lang.Override
  public void writeTo(com.google.protobuf.CodedOutputStream output)
      throws java.io.IOException {
    if (!getBusinessIdBytes().isEmpty()) {
      com.google.protobuf.GeneratedMessageV3.writeString(output, 1, businessId_);
    }
    unknownFields.writeTo(output);
  }

  @java.lang.Override
  public int getSerializedSize() {
    int size = memoizedSize;
    if (size != -1)
      return size;

    size = 0;
    if (!getBusinessIdBytes().isEmpty()) {
      size += com.google.protobuf.GeneratedMessageV3.computeStringSize(1, businessId_);
    }
    size += unknownFields.getSerializedSize();
    memoizedSize = size;
    return size;
  }

  @java.lang.Override
  public boolean equals(final java.lang.Object obj) {
    if (obj == this) {
      return true;
    }
    if (!(obj instanceof com.csc3104.grpc.POIRequest)) {
      return super.equals(obj);
    }
    com.csc3104.grpc.POIRequest other = (com.csc3104.grpc.POIRequest) obj;

    if (!getBusinessId()
        .equals(other.getBusinessId()))
      return false;
    if (!unknownFields.equals(other.unknownFields))
      return false;
    return true;
  }

  @java.lang.Override
  public int hashCode() {
    if (memoizedHashCode != 0) {
      return memoizedHashCode;
    }
    int hash = 41;
    hash = (19 * hash) + getDescriptor().hashCode();
    hash = (37 * hash) + BUSINESSID_FIELD_NUMBER;
    hash = (53 * hash) + getBusinessId().hashCode();
    hash = (29 * hash) + unknownFields.hashCode();
    memoizedHashCode = hash;
    return hash;
  }

  public static com.csc3104.grpc.POIRequest parseFrom(
      java.nio.ByteBuffer data)
      throws com.google.protobuf.InvalidProtocolBufferException {
    return PARSER.parseFrom(data);
  }

  public static com.csc3104.grpc.POIRequest parseFrom(
      java.nio.ByteBuffer data,
      com.google.protobuf.ExtensionRegistryLite extensionRegistry)
      throws com.google.protobuf.InvalidProtocolBufferException {
    return PARSER.parseFrom(data, extensionRegistry);
  }

  public static com.csc3104.grpc.POIRequest parseFrom(
      com.google.protobuf.ByteString data)
      throws com.google.protobuf.InvalidProtocolBufferException {
    return PARSER.parseFrom(data);
  }

  public static com.csc3104.grpc.POIRequest parseFrom(
      com.google.protobuf.ByteString data,
      com.google.protobuf.ExtensionRegistryLite extensionRegistry)
      throws com.google.protobuf.InvalidProtocolBufferException {
    return PARSER.parseFrom(data, extensionRegistry);
  }

  public static com.csc3104.grpc.POIRequest parseFrom(byte[] data)
      throws com.google.protobuf.InvalidProtocolBufferException {
    return PARSER.parseFrom(data);
  }

  public static com.csc3104.grpc.POIRequest parseFrom(
      byte[] data,
      com.google.protobuf.ExtensionRegistryLite extensionRegistry)
      throws com.google.protobuf.InvalidProtocolBufferException {
    return PARSER.parseFrom(data, extensionRegistry);
  }

  public static com.csc3104.grpc.POIRequest parseFrom(java.io.InputStream input)
      throws java.io.IOException {
    return com.google.protobuf.GeneratedMessageV3
        .parseWithIOException(PARSER, input);
  }

  public static com.csc3104.grpc.POIRequest parseFrom(
      java.io.InputStream input,
      com.google.protobuf.ExtensionRegistryLite extensionRegistry)
      throws java.io.IOException {
    return com.google.protobuf.GeneratedMessageV3
        .parseWithIOException(PARSER, input, extensionRegistry);
  }

  public static com.csc3104.grpc.POIRequest parseDelimitedFrom(java.io.InputStream input)
      throws java.io.IOException {
    return com.google.protobuf.GeneratedMessageV3
        .parseDelimitedWithIOException(PARSER, input);
  }

  public static com.csc3104.grpc.POIRequest parseDelimitedFrom(
      java.io.InputStream input,
      com.google.protobuf.ExtensionRegistryLite extensionRegistry)
      throws java.io.IOException {
    return com.google.protobuf.GeneratedMessageV3
        .parseDelimitedWithIOException(PARSER, input, extensionRegistry);
  }

  public static com.csc3104.grpc.POIRequest parseFrom(
      com.google.protobuf.CodedInputStream input)
      throws java.io.IOException {
    return com.google.protobuf.GeneratedMessageV3
        .parseWithIOException(PARSER, input);
  }

  public static com.csc3104.grpc.POIRequest parseFrom(
      com.google.protobuf.CodedInputStream input,
      com.google.protobuf.ExtensionRegistryLite extensionRegistry)
      throws java.io.IOException {
    return com.google.protobuf.GeneratedMessageV3
        .parseWithIOException(PARSER, input, extensionRegistry);
  }

  @java.lang.Override
  public Builder newBuilderForType() {
    return newBuilder();
  }

  public static Builder newBuilder() {
    return DEFAULT_INSTANCE.toBuilder();
  }

  public static Builder newBuilder(com.csc3104.grpc.POIRequest prototype) {
    return DEFAULT_INSTANCE.toBuilder().mergeFrom(prototype);
  }

  @java.lang.Override
  public Builder toBuilder() {
    return this == DEFAULT_INSTANCE
        ? new Builder()
        : new Builder().mergeFrom(this);
  }

  @java.lang.Override
  protected Builder newBuilderForType(
      com.google.protobuf.GeneratedMessageV3.BuilderParent parent) {
    Builder builder = new Builder(parent);
    return builder;
  }

  /**
   * Protobuf type {@code com.csc3104.grpc.POIRequest}
   */
  public static final class Builder extends
      com.google.protobuf.GeneratedMessageV3.Builder<Builder> implements
      // @@protoc_insertion_point(builder_implements:com.csc3104.grpc.POIRequest)
      com.csc3104.grpc.POIRequestOrBuilder {
    public static final com.google.protobuf.Descriptors.Descriptor getDescriptor() {
      return com.csc3104.grpc.TravelManagement.internal_static_com_csc3104_grpc_POIRequest_descriptor;
    }

    @java.lang.Override
    protected com.google.protobuf.GeneratedMessageV3.FieldAccessorTable internalGetFieldAccessorTable() {
      return com.csc3104.grpc.TravelManagement.internal_static_com_csc3104_grpc_POIRequest_fieldAccessorTable
          .ensureFieldAccessorsInitialized(
              com.csc3104.grpc.POIRequest.class, com.csc3104.grpc.POIRequest.Builder.class);
    }

    // Construct using com.csc3104.grpc.POIRequest.newBuilder()
    private Builder() {
      maybeForceBuilderInitialization();
    }

    private Builder(
        com.google.protobuf.GeneratedMessageV3.BuilderParent parent) {
      super(parent);
      maybeForceBuilderInitialization();
    }

    private void maybeForceBuilderInitialization() {
      if (com.google.protobuf.GeneratedMessageV3.alwaysUseFieldBuilders) {
      }
    }

    @java.lang.Override
    public Builder clear() {
      super.clear();
      businessId_ = "";

      return this;
    }

    @java.lang.Override
    public com.google.protobuf.Descriptors.Descriptor getDescriptorForType() {
      return com.csc3104.grpc.TravelManagement.internal_static_com_csc3104_grpc_POIRequest_descriptor;
    }

    @java.lang.Override
    public com.csc3104.grpc.POIRequest getDefaultInstanceForType() {
      return com.csc3104.grpc.POIRequest.getDefaultInstance();
    }

    @java.lang.Override
    public com.csc3104.grpc.POIRequest build() {
      com.csc3104.grpc.POIRequest result = buildPartial();
      if (!result.isInitialized()) {
        throw newUninitializedMessageException(result);
      }
      return result;
    }

    @java.lang.Override
    public com.csc3104.grpc.POIRequest buildPartial() {
      com.csc3104.grpc.POIRequest result = new com.csc3104.grpc.POIRequest(this);
      result.businessId_ = businessId_;
      onBuilt();
      return result;
    }

    @java.lang.Override
    public Builder clone() {
      return super.clone();
    }

    @java.lang.Override
    public Builder setField(
        com.google.protobuf.Descriptors.FieldDescriptor field,
        java.lang.Object value) {
      return super.setField(field, value);
    }

    @java.lang.Override
    public Builder clearField(
        com.google.protobuf.Descriptors.FieldDescriptor field) {
      return super.clearField(field);
    }

    @java.lang.Override
    public Builder clearOneof(
        com.google.protobuf.Descriptors.OneofDescriptor oneof) {
      return super.clearOneof(oneof);
    }

    @java.lang.Override
    public Builder setRepeatedField(
        com.google.protobuf.Descriptors.FieldDescriptor field,
        int index, java.lang.Object value) {
      return super.setRepeatedField(field, index, value);
    }

    @java.lang.Override
    public Builder addRepeatedField(
        com.google.protobuf.Descriptors.FieldDescriptor field,
        java.lang.Object value) {
      return super.addRepeatedField(field, value);
    }

    @java.lang.Override
    public Builder mergeFrom(com.google.protobuf.Message other) {
      if (other instanceof com.csc3104.grpc.POIRequest) {
        return mergeFrom((com.csc3104.grpc.POIRequest) other);
      } else {
        super.mergeFrom(other);
        return this;
      }
    }

    public Builder mergeFrom(com.csc3104.grpc.POIRequest other) {
      if (other == com.csc3104.grpc.POIRequest.getDefaultInstance())
        return this;
      if (!other.getBusinessId().isEmpty()) {
        businessId_ = other.businessId_;
        onChanged();
      }
      this.mergeUnknownFields(other.unknownFields);
      onChanged();
      return this;
    }

    @java.lang.Override
    public final boolean isInitialized() {
      return true;
    }

    @java.lang.Override
    public Builder mergeFrom(
        com.google.protobuf.CodedInputStream input,
        com.google.protobuf.ExtensionRegistryLite extensionRegistry)
        throws java.io.IOException {
      com.csc3104.grpc.POIRequest parsedMessage = null;
      try {
        parsedMessage = PARSER.parsePartialFrom(input, extensionRegistry);
      } catch (com.google.protobuf.InvalidProtocolBufferException e) {
        parsedMessage = (com.csc3104.grpc.POIRequest) e.getUnfinishedMessage();
        throw e.unwrapIOException();
      } finally {
        if (parsedMessage != null) {
          mergeFrom(parsedMessage);
        }
      }
      return this;
    }

    private java.lang.Object businessId_ = "";

    /**
     * <code>string businessId = 1;</code>
     * 
     * @return The businessId.
     */
    public java.lang.String getBusinessId() {
      java.lang.Object ref = businessId_;
      if (!(ref instanceof java.lang.String)) {
        com.google.protobuf.ByteString bs = (com.google.protobuf.ByteString) ref;
        java.lang.String s = bs.toStringUtf8();
        businessId_ = s;
        return s;
      } else {
        return (java.lang.String) ref;
      }
    }

    /**
     * <code>string businessId = 1;</code>
     * 
     * @return The bytes for businessId.
     */
    public com.google.protobuf.ByteString getBusinessIdBytes() {
      java.lang.Object ref = businessId_;
      if (ref instanceof String) {
        com.google.protobuf.ByteString b = com.google.protobuf.ByteString.copyFromUtf8(
            (java.lang.String) ref);
        businessId_ = b;
        return b;
      } else {
        return (com.google.protobuf.ByteString) ref;
      }
    }

    /**
     * <code>string businessId = 1;</code>
     * 
     * @param value The businessId to set.
     * @return This builder for chaining.
     */
    public Builder setBusinessId(
        java.lang.String value) {
      if (value == null) {
        throw new NullPointerException();
      }

      businessId_ = value;
      onChanged();
      return this;
    }

    /**
     * <code>string businessId = 1;</code>
     * 
     * @return This builder for chaining.
     */
    public Builder clearBusinessId() {

      businessId_ = getDefaultInstance().getBusinessId();
      onChanged();
      return this;
    }

    /**
     * <code>string businessId = 1;</code>
     * 
     * @param value The bytes for businessId to set.
     * @return This builder for chaining.
     */
    public Builder setBusinessIdBytes(
        com.google.protobuf.ByteString value) {
      if (value == null) {
        throw new NullPointerException();
      }
      checkByteStringIsUtf8(value);

      businessId_ = value;
      onChanged();
      return this;
    }

    @java.lang.Override
    public final Builder setUnknownFields(
        final com.google.protobuf.UnknownFieldSet unknownFields) {
      return super.setUnknownFields(unknownFields);
    }

    @java.lang.Override
    public final Builder mergeUnknownFields(
        final com.google.protobuf.UnknownFieldSet unknownFields) {
      return super.mergeUnknownFields(unknownFields);
    }

    // @@protoc_insertion_point(builder_scope:com.csc3104.grpc.POIRequest)
  }

  // @@protoc_insertion_point(class_scope:com.csc3104.grpc.POIRequest)
  private static final com.csc3104.grpc.POIRequest DEFAULT_INSTANCE;
  static {
    DEFAULT_INSTANCE = new com.csc3104.grpc.POIRequest();
  }

  public static com.csc3104.grpc.POIRequest getDefaultInstance() {
    return DEFAULT_INSTANCE;
  }

  private static final com.google.protobuf.Parser<POIRequest> PARSER = new com.google.protobuf.AbstractParser<POIRequest>() {
    @java.lang.Override
    public POIRequest parsePartialFrom(
        com.google.protobuf.CodedInputStream input,
        com.google.protobuf.ExtensionRegistryLite extensionRegistry)
        throws com.google.protobuf.InvalidProtocolBufferException {
      return new POIRequest(input, extensionRegistry);
    }
  };

  public static com.google.protobuf.Parser<POIRequest> parser() {
    return PARSER;
  }

  @java.lang.Override
  public com.google.protobuf.Parser<POIRequest> getParserForType() {
    return PARSER;
  }

  @java.lang.Override
  public com.csc3104.grpc.POIRequest getDefaultInstanceForType() {
    return DEFAULT_INSTANCE;
  }

}
