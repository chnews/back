const mongoose = require('mongoose');

const aboutSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            trim: true,
            required: true
        },
        slug: {
            type: String,
        },
        body: {
            type: {},
            required: false
        },
        footermenu: {
            type: String
        },
        topmenu: {
            type: String
        },
        mainmenu: {
            type: String
        },
        none: {
            type: String
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model('Page', aboutSchema);