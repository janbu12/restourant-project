require('dotenv').config();
const express = require('express');
const supabase = require('./supabaseClient');
const cors = require('cors');
const bcrypt = require('bcrypt');
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

app.get('/',(req, res) => {
  res.send('Hello This Is Database Restourant')
  console.log('Hello This Is Database Restourant')
})

app.post('/signup', async (req, res) => {
  const { email, password, name } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  // Simpan data pengguna di tabel pending_users
  const { data, error } = await supabase
    .from('pending_users')
    .insert([{ email, password:hashedPassword, name }]);

  if (error) {
    return res.status(400).json({ error: error.message });
  }

  res.status(200).json({ message: 'Pendaftaran berhasil, menunggu persetujuan.' });
});

app.post('/signin', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Authenticate the user
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    // Return the user data and session token
    return res.status(200).json({
      message: 'Sign-in successful',
      accessToken: data.session.access_token,
      refreshToken: data.session.refresh_token,
    });
  } catch (error) {
    return res.status(500).json({ error: 'Server error' });
  }
});

app.post('/approve_user', async (req, res) => {
  const { email } = req.body;

  // Ambil data dari pending_users
  const { data: pendingUser, error } = await supabase
    .from('pending_users')
    .select('*')
    .eq('email', email)
    .single();

  if (error || !pendingUser) {
    return res.status(400).json({ error: 'Pengguna tidak ditemukan' });
  }

  // Menggunakan hashed password dari tabel pending_users
  const { user, error: signUpError } = await supabase.auth.signUp({
    email: pendingUser.email,
    password: pendingUser.password, // Hash password sudah aman untuk digunakan
  });

  if (signUpError) {
    return res.status(400).json({ error: signUpError.message });
  }

  // Hapus dari pending_users
  await supabase
    .from('pending_users')
    .delete()
    .eq('email', email);

  res.status(200).json({ message: 'Pengguna berhasil disetujui.' });
});
  
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    // setInterval(cleanBlacklist, 24 * 60 * 60 * 1000);
  });


