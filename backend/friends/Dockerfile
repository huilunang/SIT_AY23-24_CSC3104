# Use a base image with Java pre-installed
FROM openjdk:17-jdk

# Set the working directory inside the container
WORKDIR /backend

# Copy the built JAR file from your Spring Boot application
COPY target/friends-0.0.1-SNAPSHOT.jar friends.jar

# Expose the port the Spring Boot app runs on
EXPOSE 8083

# Command to run the Spring Boot application
CMD ["java", "-jar", "friends.jar"]