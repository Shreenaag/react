const mongoose = require('mongoose');
const Question = require('./models/Question'); // Import the Question model

// MongoDB connection URI
const MONGO_URI = 'mongodb:/Shreenaag:Srinag.11%402003@127.0.0.1:27017/QuizApp'; // Adjust this as per your setup

// Connect to MongoDB
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

// Function to insert a question
async function insertQuestion() {
  try {
    const questionData = {
      question: "What is the capital of France?",
      options: [
        { text: "Paris", isCorrect: true },
        { text: "London", isCorrect: false },
        { text: "Berlin", isCorrect: false },
        { text: "Madrid", isCorrect: false }
      ]
    };

    const question = new Question(questionData);
    await question.save();

    console.log("Question inserted successfully:", question);
  } catch (err) {
    console.error("Error inserting question:", err);
  } finally {
    mongoose.connection.close(); // Close the database connection
  }
}

// Call the function to insert the question
insertQuestion();
