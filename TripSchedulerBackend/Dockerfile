FROM openjdk:17
COPY target/TripSchedulerBackend-0.0.1-SNAPSHOT.jar TripScheduler.jar
ENV PORT=8080 \
    DB_URL="host.docker.internal:3307" \
    DB_USER="root" \
    DB_PASSWORD="root"
EXPOSE ${PORT}
ENTRYPOINT ["java" ,"-jar" ,"TripScheduler.jar","--server.port=${PORT}"]