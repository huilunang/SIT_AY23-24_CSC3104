FROM maven:3.9.5-eclipse-temurin-21-alpine AS build

WORKDIR /app

COPY pom.xml .

WORKDIR /app/gateway

COPY ./gateway/pom.xml .
COPY ./gateway/src ./src

RUN mvn clean package

FROM openjdk:21-slim

WORKDIR /app

COPY --from=build /app/gateway/target/gateway-1.0-SNAPSHOT.jar ./gateway-1.0-SNAPSHOT.jar

ENTRYPOINT ["java", "-jar", "gateway-1.0-SNAPSHOT.jar"]