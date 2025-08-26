# 📄 Professional Resume Builder

A modern, user-friendly resume builder web application built with React and Node.js. Perfect for beginners to learn full-stack development while creating beautiful resumes.

## ✨ Features

- **🎨 Professional UI**: Modern, clean design with smooth animations
- **📱 Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **💾 Auto-Save**: Automatically saves your progress to localStorage
- **🔄 MongoDB Integration**: Save and load resumes from database
- **📄 PDF Export**: Download your resume as a professional PDF
- **🛠️ Smart Skills**: Pre-defined skill suggestions organized by category
- **📝 Guided Forms**: Step-by-step form with helpful tips and examples
- **💡 Beginner-Friendly**: Extensive comments and documentation

## 🛠️ Technologies Used

### Frontend
- **React 19**: Modern JavaScript library for building user interfaces
- **CSS3**: Professional styling with gradients, animations, and responsive design
- **React-to-Print**: PDF generation functionality

### Backend
- **Node.js**: JavaScript runtime for server-side development
- **Express.js**: Web framework for building RESTful APIs
- **MongoDB**: NoSQL database for storing resume data
- **Mongoose**: MongoDB object modeling library

## 🚀 Quick Start

### Prerequisites

Make sure you have the following installed on your system:

1. **Node.js** (version 14 or higher)
   - Download from [nodejs.org](https://nodejs.org/)
   - Verify installation: `node --version`

2. **MongoDB** (for database functionality)
   - Download from [mongodb.com](https://www.mongodb.com/try/download/community)
   - OR use MongoDB Atlas (cloud database)
   - OR run with Docker: `docker run -d -p 27017:27017 mongo`

3. **Git** (optional, for cloning)
   - Download from [git-scm.com](https://git-scm.com/)

### Installation Steps

1. **Clone or Download the Project**
   ```bash
   # If you have Git installed
   git clone <repository-url>
   cd resume-builder

   # OR download ZIP and extract it
   ```

2. **Install Dependencies**
   ```bash
   # Install all required packages
   npm install
   ```

3. **Start MongoDB** (if using local installation)
   ```bash
   # On Windows
   mongod

   # On macOS/Linux
   sudo systemctl start mongod
   # OR
   brew services start mongodb-community
   ```

4. **Start the Backend Server**
   ```bash
   # In the project root directory
   node server.js
   ```
   You should see:
   ```
   🚀 Resume Builder Server running on port 5000
   ✅ Connected to MongoDB successfully
   ```

5. **Start the Frontend Development Server**
   ```bash
   # In a new terminal window/tab
   npm start
   ```
   This will open your browser to `http://localhost:3000`

## 📚 How to Use

### 1. **Basic Details**
- Fill in your personal information (name, email, phone, etc.)
- Required fields are marked with *

### 2. **Professional Summary**
- Write a 2-3 sentence summary highlighting your strengths
- Use the provided examples for inspiration
- Character counter helps keep it concise

### 3. **Work Experience**
- Add your work history with company, position, and duration
- List key responsibilities and achievements
- Use action verbs (managed, developed, led, etc.)

### 4. **Education**
- Add your educational background
- Include institution, degree, and graduation year

### 5. **Skills**
- Add relevant technical and soft skills
- Use skill suggestions organized by category
- Mix technical skills with soft skills

### 6. **Preview & Export**
- Review your complete resume
- Save to database (requires MongoDB connection)
- Download as PDF for job applications

## 🔧 Configuration

### Database Configuration

The app is configured to connect to MongoDB on `localhost:27017` by default. To change this:

1. Open `server.js`
2. Find the MongoDB connection string:
   ```javascript
   mongoose.connect('mongodb://localhost:27017/resume-builder', {
     useNewUrlParser: true,
     useUnifiedTopology: true
   });
   ```
3. Replace with your MongoDB connection string

### Port Configuration

- **Backend**: Runs on port 5000 (configurable via PORT environment variable)
- **Frontend**: Runs on port 3000 (default Create React App port)

## 📁 Project Structure

```
resume-builder/
├── public/                 # Static files
├── src/                   # Frontend source code
│   ├── components/        # React components
│   │   ├── BasicDetails.jsx
│   │   ├── Summary.jsx
│   │   ├── Experience.jsx
│   │   ├── Education.jsx
│   │   ├── Skills.jsx
│   │   └── Preview.jsx
│   ├── services/         # API service layer
│   │   └── resumeService.js
│   ├── App.js           # Main app component
│   ├── App.css          # Styling
│   └── index.js         # App entry point
├── server.js            # Backend server
├── package.json         # Dependencies and scripts
└── README.md           # This file
```

## 🎯 Learning Objectives

This project is designed to teach:

### Frontend Concepts
- **React Hooks**: useState, useEffect, useRef
- **Component Communication**: Props, state lifting
- **Event Handling**: Forms, user interactions
- **Conditional Rendering**: Dynamic UI based on data
- **CSS Layout**: Flexbox, Grid, responsive design

### Backend Concepts
- **REST API Design**: GET, POST, PUT endpoints
- **Database Operations**: CRUD with MongoDB
- **Error Handling**: Try-catch, middleware
- **CORS**: Cross-origin request handling

### Full-Stack Integration
- **API Communication**: Fetch requests, async/await
- **State Management**: Frontend-backend data sync
- **Local Storage**: Browser storage as backup

## 🚨 Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   ```
   Error: connect ECONNREFUSED 127.0.0.1:27017
   ```
   **Solution**: Make sure MongoDB is running locally or check your connection string.

2. **Port Already in Use**
   ```
   Error: listen EADDRINUSE :::5000
   ```
   **Solution**: Stop other services using port 5000 or change the port in `server.js`.

3. **Module Not Found**
   ```
   Error: Cannot find module 'express'
   ```
   **Solution**: Run `npm install` to install all dependencies.

4. **CORS Error in Browser**
   ```
   Access to fetch at 'http://localhost:5000/api/resumes' from origin 'http://localhost:3000' has been blocked by CORS policy
   ```
   **Solution**: The server.js already includes CORS middleware. Restart the backend server.

### Development Tips

1. **Check Browser Console**: Open Developer Tools (F12) to see any JavaScript errors
2. **Check Server Logs**: Look at the terminal where you started `node server.js`
3. **Verify MongoDB**: Use MongoDB Compass or `mongo` shell to check database
4. **Network Tab**: Use browser dev tools to inspect API requests

## 🔄 Available Scripts

In the project directory, you can run:

- `npm start` - Runs the React app in development mode
- `npm run build` - Builds the app for production
- `npm test` - Launches the test runner
- `node server.js` - Starts the backend server

## 🚀 Deployment

### Frontend (Netlify/Vercel)
1. Run `npm run build` to create production build
2. Deploy the `build` folder to your hosting service
3. Update API URLs in `resumeService.js` to point to your deployed backend

### Backend (Heroku/Railway)
1. Push your code to a Git repository
2. Connect to your deployment platform
3. Set environment variables for MongoDB connection
4. Deploy and note the API URL

### Database (MongoDB Atlas)
1. Create account at [mongodb.com](https://www.mongodb.com/atlas/database)
2. Create a cluster and get connection string
3. Update connection string in `server.js`

## 🤝 Contributing

This project is perfect for learning! Feel free to:

1. **Add Features**: More resume templates, themes, sections
2. **Improve UI**: Better animations, mobile experience
3. **Enhance Backend**: User authentication, resume sharing
4. **Add Tests**: Unit tests, integration tests
5. **Documentation**: More tutorials, code comments

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- **React Team**: For the amazing React library
- **MongoDB**: For the excellent database solution
- **Express.js**: For the simple and flexible web framework
- **Open Source Community**: For inspiration and best practices

---

**Happy Resume Building! 🎉**

If you have any questions or need help, feel free to open an issue or reach out to the community.
