FROM maven:3.9.5-eclipse-temurin-21-alpine AS build

WORKDIR /app

COPY pom.xml .

WORKDIR /app/account

COPY ./account/pom.xml .
COPY ./account/src ./src

RUN mvn clean package

FROM openjdk:21-slim

WORKDIR /app

COPY --from=build /app/account/target/account-1.0-SNAPSHOT.jar ./account-1.0-SNAPSHOT.jar

ENTRYPOINT ["java", "-jar", "account-1.0-SNAPSHOT.jar"]
