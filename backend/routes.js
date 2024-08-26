const express = require('express');
const router = express.Router();
const supabase = require('./supabaseClient');


module.exports = () =>{
    router.get('/partner', async (req, res) => {
        const token = req.headers['authorization'];

        if(!token){
            return res.status(401).json({message: 'Unauthorized'});
        }

        const data = await supabase.from("partner").select();
        res.json(data);
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
    router.post("/menu", async (req, res)=>{
        const {name, price, description, category} = req.body
        const data = await supabase.from("menu").insert({name, price, description, category});
        if(!data){
            res.status(400).json({message: 'Failed to create menu' });
        }
        res.status(200).json({message:"Success to create Menu!"});
    });

    router.put("/menu/:id", async (req, res) => {
        const id = req.params.id
        const {name, price, description, category} = req.body
        const data = await supabase.from("menu").update({name, price, description, category}).eq("id", id);

        if(!data){
            res.status(400).json({message: 'Failed to update menu' });
        }

        res.status(200).json({message:"Success to update Menu!"});
    })

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