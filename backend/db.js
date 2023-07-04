const mongoose = require('mongoose');

// Connect to MongoDB Atlas
mongoose
  .connect('mongodb+srv://ajaykoka:Sathya%40123@test.ruqqm01.mongodb.net/users?retryWrites=true&w=majority', {
    useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

module.exports = db;