"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.documentController = void 0;
const document_services_1 = require("./document.services");
const document_interface_1 = require("./document.interface");
const createDocument = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const documentData = req.body;
        const result = yield document_services_1.documentServices.createDocumentIntoDB(documentData);
        res.status(201).json(result);
    }
    catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});
const getAlldocument = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const ownedDocs = yield document_interface_1.documentModel.find({ owner: req.user.email });
        const sharedDocs = yield document_interface_1.documentModel.find({ 'sharedWith.user': req.user.email });
        res.json({ ownedDocs, sharedDocs });
    }
    catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});
const getSingleDocument = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const doc = yield document_interface_1.documentModel.findById(req.params.id);
        if (!doc)
            res.status(404).json({ error: 'Document not found' });
        else {
            const isOwner = doc.owner === req.user.email;
            const sharedUser = doc.sharedWith.find(sw => sw.user === req.user.email);
            if (!isOwner && !sharedUser) {
                res.status(403).json({ error: 'Access denied' });
            }
            else {
                res.status(200).json({ document: doc, role: isOwner ? 'owner' : sharedUser.role });
            }
        }
    }
    catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});
const deleteDocument = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const result = yield document_services_1.documentServices.deleteDocumentFromDB(id);
        res.status(201).json(result);
    }
    catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});
const updateDocument = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const doc = yield document_interface_1.documentModel.findById(req.params.id);
        if (!doc)
            res.status(404).json({ error: 'Document not found' });
        else {
            const isOwner = doc.owner === req.user.email;
            const sharedUser = doc.sharedWith.find(sw => sw.user === req.user.email);
            if (!isOwner && (!sharedUser || sharedUser.role !== 'editor')) {
                res.status(403).json({ error: 'No permission to edit' });
            }
            else {
                const { content, title } = req.body;
                if (content !== undefined)
                    doc.content = content;
                if (title !== undefined)
                    doc.title = title;
                yield doc.save();
                res.status(200).json(doc);
            }
        }
    }
    catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});
const shareDocument = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, role } = req.body;
    const { id } = req.params;
    if (!email || !role) {
        res.status(400).json({ error: 'Email and role are required' });
    }
    else {
        if (!['viewer', 'editor'].includes(role)) {
            res.status(400).json({ error: 'Invalid role' });
        }
        else {
            try {
                const doc = yield document_interface_1.documentModel.findById(id);
                if (!doc)
                    res.status(404).json({ error: 'Document not found' });
                // Only owner can share
                else {
                    if (doc.owner !== req.user.email) {
                        res.status(403).json({ error: 'Only owner can share this document' });
                    }
                    // Check if already shared with this email
                    else {
                        const alreadyShared = doc.sharedWith.find(sw => sw.user === email);
                        if (alreadyShared) {
                            // Update role if needed
                            alreadyShared.role = role;
                        }
                        else {
                            // Add new shared user
                            doc.sharedWith.push({ user: email, role });
                        }
                        yield doc.save();
                        res.json({ message: 'Document shared successfully', sharedWith: doc.sharedWith });
                    }
                }
            }
            catch (err) {
                console.error(err);
                res.status(500).json({ error: 'Server error' });
            }
        }
    }
});
exports.documentController = {
    createDocument, deleteDocument,
    getAlldocument, getSingleDocument,
    updateDocument, shareDocument
};
