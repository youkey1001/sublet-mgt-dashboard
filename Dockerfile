FROM openjdk:slim

RUN apt-get update

RUN apt-get install -y curl 

RUN curl -sL https://deb.nodesource.com/setup_14.x | bash - \
    && apt-get install -y nodejs

RUN npm install -g firebase-tools

COPY firebase.json firebase.json

# Functions
EXPOSE 5001
# Firestore
EXPOSE 8080
# Hosting
EXPOSE 5000
# Authentication
EXPOSE 9099
# Storage
EXPOSE 9199
# Database
EXPOSE 9000
# Emulator UI
EXPOSE 4000