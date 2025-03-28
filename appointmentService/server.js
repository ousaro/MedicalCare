const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('mongoose');

// Create express app
const app = express();

const appointmentRoutes = require('./Routes/appointmentRoutes');

// Constants
const PORT = process.env.PORT || 5001;
const DB_URL = 'mongodb://localhost:27018/appointmentDB';

// middleware

app.use(
    cors({
      origin: "http://localhost:5173", // Replace with your frontend URL
      methods: "GET,POST,PUT,PATCH,DELETE",
      credentials: true, // Allow cookies and auth headers
    })
  );

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded


// for tracking the requests
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});



app.use('/appointments', appointmentRoutes);

// Connect to MongoDB
db.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {
    app.listen(PORT, () => {
        console.log(`Database connected successfully`);
        console.log(`Server is running on port ${PORT}`);
      });
}).catch((err) => 
    console.log(err)
);
