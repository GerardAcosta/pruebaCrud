import { Router } from "express";
import { songModel } from "../../models/songs.model.js";

export const songsRouter = Router();

songsRouter.get('/', async (req, res) => {
    try {
        const songs = await songModel.find();
        res.json(songs);
    } catch (error) {
        res.json({ error: error.message }); 
    }
    
});

songsRouter.get('/:songId', async (req, res) => {
    try {
        const { songId } = req.params;
        const song = await songModel.findById(songId);
        res.json({song});
    } catch (error) {
        res.json({ error: error.message }); 
    }
    
});

songsRouter.post('/', async (req, res) => {
    // TODO => Hacer las validaciones.
    try {
        const song = await songModel.create(req.body);
        res.json(song);
    } catch (error) {
        res.json({error: error.message});
    }
    
});

songsRouter.put('/:songId', async (req, res) => {
    try {
        const { songId } = req.params;
        const song = await songModel.findByIdAndUpdate(songId, req.body, { new: true });
        
        res.json(song);
    } catch (error) {
        res.json({ error: error.message }); 
    }
});

songsRouter.delete('/:songId', async (req, res) => {
    try {
        const { songId } = req.params;
        const song = await songModel.findByIdAndDelete(songId);
        
        res.json(song);
    } catch (error) {
        res.json({ error: error.message }); 
    }
})