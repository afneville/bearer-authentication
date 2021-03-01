const mongoose = require('mongoose');

const AttachmentSchema = new mongoose.Schema({

    message: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    path: {
        type: String,
        required: true,
        unique: true
    }
}, {
    collection: 'attachment'
});
module.exports = mongoose.model('Attachment', AttachmentSchema);
