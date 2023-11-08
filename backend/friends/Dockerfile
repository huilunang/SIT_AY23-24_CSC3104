FROM maven:3.9.5-eclipse-temurin-21-alpine AS build

WORKDIR /app

COPY pom.xml .

WORKDIR /app/friends

COPY ./friends/pom.xml .
COPY ./friends/src ./src

RUN mvn clean package

FROM openjdk:21-slim

WORKDIR /app

COPY --from=build /app/friends/target/friends-1.0-SNAPSHOT.jar ./friends-1.0-SNAPSHOT.jar

ENTRYPOINT ["java", "-jar", "friends-1.0-SNAPSHOT.jar"]
