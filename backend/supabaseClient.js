require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);


supabase
  .from('partner') 
  .select('*')
  .then(response => {
    if (response.error) {
      console.error('Supabase connection error:', response.error);
    } else {
      console.log('Supabase connected');
    }
  });

module.exports = supabase;
