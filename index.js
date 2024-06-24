const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const ContactModel = require('./models/Contacts'); // Assuming your model is defined in a file called Contact.js
const DepositModel = require('./models/Deposit')
const LoanModel = require('./models/Loan')
const JobProfileModel = require('./models/JobProfile')
require('dotenv').config()

const app = express();
const PORT = process.env.PORT ;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URL);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Route for handling form submissions
app.post('/contact', async (req, res) => {
  try {
    const { name, mobile, email, address, type } = req.body;

    // Create a new contact document using the Contact model
    const newContact = await ContactModel.create({ name, mobile, email, address, type });

    res.status(201).json({ message: 'Contact form submitted successfully' ,newContact});
  } catch (error) {
    console.error('Error submitting contact form:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.post('/deposit', async (req, res) => {
  try {
    const { name, mobile, email, address, accountType } = req.body;

    // Create a new contact document using the Contact model
    const newDeposit = await DepositModel.create({ name, mobile, email, address, accountType });

    res.status(201).json({ message: 'Contact form submitted successfully' ,newDeposit});
  } catch (error) {
    console.error('Error submitting contact form:', error);
    res.status(500).json({ message: 'Server error' });
  }
});


app.post('/loan', async (req, res) => {
  try {
    const { name, mobile, email, address, loanType } = req.body;

    // Create a new contact document using the Contact model
    const newLoan = await LoanModel.create({ name, mobile, email, address, loanType });

    res.status(201).json({ message: 'Contact form submitted successfully' ,newLoan});
  } catch (error) {
    console.error('Error submitting contact form:', error);
    res.status(500).json({ message: 'Server error' });
  }
});



app.post('/jobProfile', async (req, res) => {
  try {
    const { name, mobile, address, email, tenthPercentage, twelfthPercentage,graduationGrade, postGraduationGrade,experience, jobProfile } = req.body;

    // Create a new contact document using the Contact model
    const newJobProfile = await JobProfileModel.create({ name, mobile, address, email, tenthPercentage, twelfthPercentage,graduationGrade, postGraduationGrade,experience, jobProfile });

    res.status(201).json({ message: 'Contact form submitted successfully' ,newJobProfile});
  } catch (error) {
    console.error('Error submitting contact form:', error);
    res.status(500).json({ message: 'Server error' });
  }
});





// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
