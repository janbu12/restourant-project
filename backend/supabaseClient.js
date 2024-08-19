require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

// Inisialisasi koneksi ke Supabase
const supabase = createClient(supabaseUrl, supabaseKey);

// Uji koneksi (misalnya dengan melakukan request sederhana)
supabase
  .from('partner')  // Ganti dengan nama tabel di Supabase Anda
  .select('*')
  .then(response => {
    if (response.error) {
      console.error('Supabase connection error:', response.error);
    } else {
      console.log('Supabase connected');
    }
  });

module.exports = supabase;
