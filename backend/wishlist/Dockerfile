FROM maven:3.9.5-eclipse-temurin-21-alpine AS build

WORKDIR /app

COPY pom.xml .

WORKDIR /app/wishlist

COPY ./wishlist/pom.xml .
COPY ./wishlist/src ./src

RUN mvn clean package

FROM openjdk:21-slim

WORKDIR /app

COPY --from=build /app/wishlist/target/wishlist-1.0-SNAPSHOT.jar ./wishlist-1.0-SNAPSHOT.jar

ENTRYPOINT ["java", "-jar", "wishlist-1.0-SNAPSHOT.jar"]
