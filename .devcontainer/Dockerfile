FROM node:20

WORKDIR /workspace
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "start"]

// .devcontainer/docker-compose.yml
version: '3.8'
services:
app:
build:
context: .
dockerfile: Dockerfile
ports:

"3000:3000" volumes:
..:/workspace:cached environment:
DATABASE_URL=mysql://user:password@mysql:3306/daysave depends_on:
mysql mysql: image: mysql:8.0 environment: MYSQL_ROOT_PASSWORD: root MYSQL_DATABASE: daysave MYSQL_USER: user MYSQL_PASSWORD: password ports:
"3306:3306" plantuml: image: plantuml/plantuml-server:latest ports:
"8080:8080"