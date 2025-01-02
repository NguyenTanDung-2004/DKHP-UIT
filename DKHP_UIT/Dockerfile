# Sử dụng JDK 21 để chạy ứng dụng
FROM openjdk:21-jdk-slim

# Đặt thư mục làm việc
WORKDIR /app

# Sao chép file .war vào container
COPY target/DKHP_UIT-0.0.1-SNAPSHOT.war app.war

# Expose cổng mà ứng dụng đang chạy
EXPOSE 8080

# Chạy ứng dụng Spring Boot với file .war
ENTRYPOINT ["java", "-jar", "app.war"]
