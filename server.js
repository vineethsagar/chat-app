const express = require('express');
const mongoose = require('mongoose');
const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://localhost/chat_app', { useNewUrlParser: true });

// Configure routes
app.use('/user', require('./routes/user'));
app.use('/group', require('./routes/group'));
app.use('/admin', require('./routes/admin'));
app.use('/auth', require('./routes/auth'));

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
