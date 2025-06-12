"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.documentModel = void 0;
const mongoose_1 = require("mongoose");
const documentSchema = new mongoose_1.Schema({
    title: { type: String, required: true, default: 'Untitled Document' },
    content: { type: String, required: true, default: '' },
    owner: { type: String, required: true },
    sharedWith: [
        {
            user: { type: String, required: true },
            role: { type: String, enum: ['viewer', 'editor'], default: 'viewer' },
        }
    ]
}, { timestamps: true });
exports.documentModel = (0, mongoose_1.model)('document', documentSchema);
