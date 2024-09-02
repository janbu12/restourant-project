const express = require('express');
const router = express.Router();
const multer = require('multer');
const supabase = require('./supabaseClient');
const path = require('path');

// const upload = multer({ dest: 'uploads/' });
const storage = multer.memoryStorage();
const upload = multer({ storage });


module.exports = () =>{
    router.get('/partner', async (req, res) => {
        // const token = req.headers['authorization'];

        // if(!token){
        //     return res.status(401).json({message: 'Unauthorized'});
        // }

        const data = await supabase.from("partner").select();
        res.status(200).json(data);
        // res.send('Meja');
    });

    router.post('/partner', async (req, res) => {
        const {name, message, email, phone_number} = req.body
        const data = await supabase.from("partner").insert({name, message, email, phone_number});
        if(!data){
            res.status(400).json({message: 'Failed to create partner' });
        }
        res.status(200).json({message:"Success to create Partner!"});
    });

    router.get("/menu", async (req, res)=>{
        const data = await supabase.from("menu").select();
        res.json(data);
    });
    router.post('/menu', upload.single('photo'), async (req, res) => {
        try {
            const { name, description, price } = req.body;
            const photo = req.file;
    
            if (photo) {
                const filePath = `uploads/${Date.now()}_${photo.originalname}`;
                const { data, error } = await supabase
                  .storage
                  .from('menu') // Replace with your bucket name
                  .upload(filePath, photo.buffer, {
                    contentType: photo.mimetype,
                    upsert: false
                  });
    
                if (error) {
                  return res.status(500).json({ success: false, error: error.message });
                }
    
                const photoUrl = `${process.env.SUPABASE_URL}/storage/v1/object/public/${'menu'}/${filePath}`;
    
                const { data: menuData, error: dbError } = await supabase
                  .from('menu')
                  .insert([{ name, description, price, photo: photoUrl }]);
    
                if (dbError) {
                  return res.status(500).json({ success: false, error: dbError.message });
                }
    
                res.json({ success: true });
            } else {
                res.status(400).json({ success: false, error: 'No photo uploaded' });
            }
        } catch (err) {
            res.status(500).json({ success: false, error: err.message });
        }
    });
    
    router.put('/menu/:id', upload.single('photo'), async (req, res) => {
        const id = req.params.id;
        const { name, description, price } = req.body;
        const photo = req.file;
    
        try {
            let photoUrl = null;
            
            if (photo) {
                const filePath = `uploads/${Date.now()}_${photo.originalname}`;
                const { data, error } = await supabase
                  .storage
                  .from('menu') // Replace with your bucket name
                  .upload(filePath, photo.buffer, {
                    contentType: photo.mimetype,
                    upsert: false
                  });
    
                if (error) {
                  return res.status(500).json({ success: false, error: error.message });
                }
    
                photoUrl = `${process.env.SUPABASE_URL}/storage/v1/object/public/${'menu'}/${filePath}`;
            }
    
            const { data: menuData, error: dbError } = await supabase
              .from('menu')
              .update({ name, description, price, photo: photoUrl || undefined })
              .eq('id', id);
    
            if (dbError) {
              return res.status(500).json({ success: false, error: dbError.message });
            }
    
            res.json({ success: true });
        } catch (err) {
            res.status(500).json({ success: false, error: err.message });
        }
    });

    router.get("/article", async (req,res) => {
        const data = await supabase.from("article").select();
        res.json(data);
    });

    router.post("/article", async (req, res) => {
        const {title, description} = req.body;
        const data = await supabase.from("article").insert({title, description});
        if(!data){
            res.status(400).json({message: 'Failed to create article' });
        }
        res.status(200).json({message:"Success to create Article!"});
    });

    router.put("/article/:id", async (req, res) => {
        const id = req.params.id;
        const {title, description} = req.body;
        const data = await supabase.from("article").update({title, description}).eq('id', id);

        if(!data){
            res.status(400).json({message: 'Failed to update article' });
        }
        
        res.status(200).json({message:"Success to update Article!"});
    });

    return router;
}