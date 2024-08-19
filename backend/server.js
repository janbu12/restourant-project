require('dotenv').config();
const express = require('express');
const supabase = require('./supabaseClient');
const cors = require('cors');
// const blacklist = require('BlacklistToken.js');

const routes = require('./routes');

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use((req, res, next) => {
//   const authHeader = req.headers.authorization;
//   if (authHeader) {
//       const token = authHeader.split(' ')[1];
//       if (blacklist.has(token)) {
//           return res.status(401).json({ message: 'Token is blacklisted' });
//       }
//   }
//   next();
// });

app.use('/api', routes());

app.get('/',() => {
  res.send('Hello This Is Database')
  console.log('Hello This Is Database')
})
  
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    // setInterval(cleanBlacklist, 24 * 60 * 60 * 1000);
  });