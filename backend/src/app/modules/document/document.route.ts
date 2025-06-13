import express from 'express'
import { documentController } from './document.controller'
import authMiddleware from '../../middleware/auth'

const router=express.Router()

router.post('/create', authMiddleware, documentController.createDocument)
router.get('/',authMiddleware,documentController.getAlldocument)
router.get('/:id',authMiddleware,documentController.getSingleDocument)
router.put('/:id',authMiddleware,documentController.updateDocument)
router.delete('/:id',authMiddleware, documentController.deleteDocument)
router.post('/:id/share',authMiddleware,documentController.shareDocument)

export const documentRoutes=router