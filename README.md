# StressAway

A simple web application that integrates Google Meet for chat, voice, and video call sessions. Users can create/join sessions and have scheduled communication through Google Meet for chat, call, or video call

## YouTube Link

Link to Youtube where I have explained the project. It contains the walkthrough of the project
[YouTube Link](https://youtu.be/mIa7glIovfE)

## Features

- **Session Creation:** Users can schedule sessions as well as join them.
- **Upcoming Sessions:** Users can view their upcoming sessions and also join using the provided link.
- **Google Calendar:** A Session/Meet is created in the user's google calendar.
- **Storing Sessions:** Each session is stored in the respective user's database whenever it is created.

## Technologies Used

- **Frontend:** React.js (with basic design)
- **Backend:** Node.js, Express.js (with microservice architecture)
- **Database:** MongoDB (for storing user information and session information)
- **GoogleAPIs:** Google APIs (Google calendar API to create google meets) from google cloud console

## API Routes

### 1. `/login`
- **Method:** POST
- **Description:** Allows existing users to log in to their account.

### 2. `/add-session`
- **Method:** POST
- **Description:** Adds created session to the user's database.

### 3. `/get-session`
- **Method:** POST
- **Description:** Fetches all the sessions created by the user or we can say upcoming sessions.

### 4. `/auth`
- **Method:** GET
- **Description:** To authorize Google calendar.

### 5. `/oauth2callback`
- **Method:** GET
- **Description:** For updating refresh token.

## Project

### Prerequisites

- Node.js and npm installed on your machine.
- A MongoDB database set up.
- Google account
- Note: For this project, I am using only two gmail acc to authorize, once google verifies the API, anyone can log into it
- IMPORTANT: For testing purpose, I have granted access to your email id, you can use this email id -> rankush@stressaway.in

### Environmental Variables

- CLIENT_ID = client-id
- CLIENT_SECRET = client-secret
- REDIRECT_URI = redirect-uri
- REFRESH_TOKEN = refresh-token
- MONGOOSE_URL = mongodb-url

**You can find these in Google Cloud Console**


### Accessing the Application

- Clone this repository
- Set up the environmental variables
- Install all the dependencies using **npm install**
- Navigate to the client folder **cd client**
- Run the react file on port other than 3000 using **npm start**
- Navigate to the server folder **cd server**
- Run the express project using **nodemon server.js** or **node server.js**
- Open your browser and navigate to `http://localhost:3001` to access the application.

## Folder Structure

```plaintext
├── client   
│    |──src # Frontend React.js code 
|        |─pages
|            |─schedule # schedule/create a session
|            |─login # login user
|            |─home # introduction
|            |─upcoming # join or share session using link
            
├── server                  # Backend Node.js/Express.js code
│   ├── API            # API route handlers
│   └── Schema            # Mongoose models for MongoDB
└── README.md               # Project documentation
```
## Schema for User

**user :**
- name: String
- sessions: [session]

**sessions :** 
- session_topic: String
- session_start: String
- session_end: String
- session_link: String

