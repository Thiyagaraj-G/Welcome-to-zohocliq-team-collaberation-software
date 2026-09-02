const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Simulated database
let userAccount = { balance: 1000, email: "user@example.com" };

// Middleware to simulate login session
app.use((req, res, next) => {
    // In a real app, this cookie is set after validating credentials
    res.cookie('session_id', 'valid_mock_session_123', { httpOnly: true });
    next();
});

// Vulnerable endpoint to update account details
app.post('/update-email', (req, res) => {
    // Check if the user is authenticated via cookie
    if (req.cookies.session_id === 'valid_mock_session_123') {
        userAccount.email = req.body.email;
        return res.send(`Email successfully updated to: ${userAccount.email}`);
    }
    res.status(401).send('Unauthorized');
});

app.listen(3000, () => console.log('Vulnerable server running on port 3000'));
