FROM maven:3.9.5-eclipse-temurin-21-alpine AS build

WORKDIR /app

COPY pom.xml .

WORKDIR /app/notification

COPY ./notification/pom.xml .
COPY ./notification/src ./src

RUN mvn clean package

FROM openjdk:21-slim

WORKDIR /app

COPY --from=build /app/notification/target/notification-1.0-SNAPSHOT.jar ./notification-1.0-SNAPSHOT.jar

ENTRYPOINT ["java", "-jar", "notification-1.0-SNAPSHOT.jar"]
