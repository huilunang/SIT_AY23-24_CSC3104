package com.csc3104.notifications.Event.grpc;

// Generated by the protocol buffer compiler.  DO NOT EDIT!
// source: travel-management.proto

public final class TravelManagement {
  private TravelManagement() {}
  public static void registerAllExtensions(
      com.google.protobuf.ExtensionRegistryLite registry) {
  }

  public static void registerAllExtensions(
      com.google.protobuf.ExtensionRegistry registry) {
    registerAllExtensions(
        (com.google.protobuf.ExtensionRegistryLite) registry);
  }
  static final com.google.protobuf.Descriptors.Descriptor
    internal_static_POIRequest_descriptor;
  static final 
    com.google.protobuf.GeneratedMessageV3.FieldAccessorTable
      internal_static_POIRequest_fieldAccessorTable;
  static final com.google.protobuf.Descriptors.Descriptor
    internal_static_POIDetails_descriptor;
  static final 
    com.google.protobuf.GeneratedMessageV3.FieldAccessorTable
      internal_static_POIDetails_fieldAccessorTable;

  public static com.google.protobuf.Descriptors.FileDescriptor
      getDescriptor() {
    return descriptor;
  }
  private static  com.google.protobuf.Descriptors.FileDescriptor
      descriptor;
  static {
    java.lang.String[] descriptorData = {
      "\n\027travel-management.proto\" \n\nPOIRequest\022" +
      "\022\n\nbusinessId\030\001 \001(\t\"O\n\nPOIDetails\022\014\n\004nam" +
      "e\030\001 \001(\t\022\020\n\010category\030\002 \001(\t\022\017\n\007address\030\003 \001" +
      "(\t\022\020\n\010imageUrl\030\004 \001(\t27\n\nPOIService\022)\n\rGe" +
      "tPOIDetails\022\013.POIRequest\032\013.POIDetailsB\002P" +
      "\001b\006proto3"
    };
    descriptor = com.google.protobuf.Descriptors.FileDescriptor
      .internalBuildGeneratedFileFrom(descriptorData,
        new com.google.protobuf.Descriptors.FileDescriptor[] {
        });
    internal_static_POIRequest_descriptor =
      getDescriptor().getMessageTypes().get(0);
    internal_static_POIRequest_fieldAccessorTable = new
      com.google.protobuf.GeneratedMessageV3.FieldAccessorTable(
        internal_static_POIRequest_descriptor,
        new java.lang.String[] { "BusinessId", });
    internal_static_POIDetails_descriptor =
      getDescriptor().getMessageTypes().get(1);
    internal_static_POIDetails_fieldAccessorTable = new
      com.google.protobuf.GeneratedMessageV3.FieldAccessorTable(
        internal_static_POIDetails_descriptor,
        new java.lang.String[] { "Name", "Category", "Address", "ImageUrl", });
  }

  // @@protoc_insertion_point(outer_class_scope)
}

