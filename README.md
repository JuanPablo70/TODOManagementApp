# TODO Management Fullstack App

This learning project, inspired by the Udemy course [Master Spring Boot 3 & Spring Framework 6 with Java](https://www.udemy.com/course/spring-boot-and-spring-framework-tutorial-for-beginners/), developed using Spring for the backend and React for the frontend. The application allows users to add, update, and manage their tasks efficiently.

### Prerequisites

To use this project, you need to have knowledge of:

+ Java - Object Oriented Programming Language.
+ Spring Boot - Create stand-alone Spring applications.
+ React - The library for web and native user interfaces.
+ Postman - API testing platform.

### Installing the Project

To download this project, run the following command down below.

```
git clone https://github.com/JuanPablo70/SocialMedia-REST-API.git
```

With Docker Desktop installed, execute the following command down bellow.

```
docker run --detach --env MYSQL_ROOT_PASSWORD=t0d0s --env MYSQL_USER=todos-user --env MYSQL_PASSWORD=dummypassword --env MYSQL_DATABASE=todos-database --name mysql --publish 3306:3306 mysql:8-oracle
```

Open a terminal in the backend project directory and run the following command:

```
./mvnw spring-boot:run
```

Open another terminal in the frontend project directory and run the following commands:

```
npm install
npm start
```

Use your preferred browser and go to localhost:3000 or localhost:3000/login.

### About this Project

This project is a web application for managing tasks (TODOS) that allows users to add, delete, and update their tasks. Each task has the following attributes:

+ Description: Details of the task.

+ Target Date: Deadline for completing the task.

+ Done: Status indicating whether the task is finished.

#### Features:

+ Add Todos: Allows users to create new tasks with a description, target date, and completion status.

+ Delete Todos: Enables users to delete existing tasks.

+ Update Tasks: Provides options to modify the description, target date, and status of the tasks.

### Build With

+ [Spring Initializr](https://start.spring.io) - Tool used to set up Spring Boot projects.
+ [Maven](https://maven.apache.org) - Software project management and comprehension tool.
+ [Node.js](https://nodejs.org/en) - JavaScript runtime environment.
+ [npm](https://www.npmjs.com) - Software package manager and installer.
+ [Docker](https://www.docker.com) - Accelerated container application development.

### Version

1.0

### Author

[Juan Pablo Sánchez Bermúdez](https://github.com/JuanPablo70)
