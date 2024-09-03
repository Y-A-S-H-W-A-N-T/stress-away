require('dotenv').config();
const express = require('express');
const { google } = require('googleapis');
const cors = require('cors')
const mongoose = require('mongoose')
const app = express();

// Routes

const userRoute = require('./API/sessionRoutes')

//Middlewares

app.use(express.json());
app.use(cors())
app.use('/user',userRoute)

mongoose.connect(process.env.MONGOOSE_URL).then(()=>{
  console.log("Connected")
})

const oauth2Client = new google.auth.OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  process.env.REDIRECT_URI
);

const scopes = ['https://www.googleapis.com/auth/calendar'];

// Route to initiate OAuth 2.0 flow
app.get('/auth', (req, res) => {
  const url = oauth2Client.generateAuthUrl({
    access_type: 'online',
    scope: scopes,
  });
  res.redirect(url)
});

// Route to handle OAuth 2.0 callback
app.get('/oauth2callback', async (req, res) => {
  const code = req.query.code;
  try {
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);
    res.redirect('http://localhost:3001/schedule');
  }catch(error){
    console.error('Error retrieving access token:', error);
    res.status(500).send('Error retrieving access token.');
  }
});

// Route to create Google Meet link
app.post('/api/create-meet', async (req, res) => {
  const { summary, startTime, endTime } = req.body;

  console.log(req.body)

  try {
    const calendar = google.calendar({ version: 'v3', auth: oauth2Client })
    const date = new Date()
    const event = {
        summary: summary,
        description: 'This is a test meeting created for debugging purposes.',
        start: { dateTime: date.toISOString(startTime), timeZone: 'UTC' }, // requires a specific type of date-time input
        end: { dateTime: date.toISOString(endTime), timeZone: 'UTC' },
        conferenceData: {
          createRequest: {
            requestId: 'meet-' + Math.random().toString(36).substring(2),
            conferenceSolutionKey: { type: 'hangoutsMeet' },
          },
        },
    };

    const response = await calendar.events.insert({
      calendarId: 'primary',
      requestBody: event,
      conferenceDataVersion: 1,
    });

    res.json({ meetLink: response.data.hangoutLink });
  }catch(error){
    console.error('Error creating Google Meet link:', error);
    res.status(500).json({ error: 'Failed to create Google Meet link' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
