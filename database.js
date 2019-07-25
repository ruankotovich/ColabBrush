const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const db = mongoose.connection;

mongoose.connect('mongodb://localhost/insidious', { useNewUrlParser: true, useFindAndModify: true});

db.on('error', console.error.bind(console, '[MongoDB]: '));

const BrushPainter = new Schema({
    list: [{ x: Number, y: Number, color: String, stroke: Number }],
    fp: String,
    page: { type: String, unique: true }
});

module.exports = { BrushPainter: mongoose.model('BrushPainter', BrushPainter), db };