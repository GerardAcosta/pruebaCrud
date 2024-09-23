import mongoose from 'mongoose';

const songSchema = new mongoose.Schema({
    title: String,
    artist: String,
    genre: String,
    album: String,
    duration: Number,
    year: Number,
    trackNumber: Number,
    isExplicit: Boolean
});
export const songModel = mongoose.model('songs', songSchema);
// export const songModel = model('music', songSchema);