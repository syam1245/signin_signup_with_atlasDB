# signin_signup_with_atlasDB
This project is a user authentication system built using Express.js, MongoDB, and the bcrypt library. It provides a secure and scalable solution for user registration, login, profile management, and session handling. The application uses bcrypt for password hashing and MongoDB as the database to store user information.


**Features:**

1. **User Registration:** Users can create accounts by providing their email and password. Passwords are securely hashed before storage in the database.

2. **User Login:** Registered users can log in by entering their email and password. The system verifies their credentials and establishes a session.

3. **Session Management:** User sessions are maintained using the `express-session` middleware, ensuring a seamless and secure user experience.

4. **Profile Page:** Authenticated users have access to a profile page where they can view and manage their account details.

5. **Sign Out:** Users can sign out to terminate their sessions and log out securely.

**Technology Stack:**

- **Express.js:** A Node.js framework for building web applications and RESTful APIs.
- **MongoDB:** A NoSQL database for storing user information securely.
- **bcrypt:** A library for password hashing and security.
- **EJS (Embedded JavaScript):** A templating engine for rendering dynamic content in views.

**Usage:**

1. Clone the repository to your local machine.
2. Run `npm install` to install the required dependencies.
3. Create a `.env` file and add your MongoDB Atlas connection string as `MONGO_URI`.
4. Start the server with `npm start`.
5. Access the application through a web browser at `http://localhost:3000`.

npm install express express-session mongoose bcrypt body-parser 


Feel free to use and modify this codebase for your own projects or as a foundation for building secure user authentication systems with Express.js and MongoDB.

**Author:** Syam Pushpan

**License:** MIT License
