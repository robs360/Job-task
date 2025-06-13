import { model, Schema } from "mongoose";
interface SharedWith {
    user: string;
    role: 'viewer' | 'editor';
}

export interface IDocument {
    title: string;
    content: string;
    owner: string;
    sharedWith: SharedWith[];
}

const documentSchema = new Schema<IDocument>({
    title: { type: String, required: true, default: 'Untitled Document' },
    content: { type: String, required: true, default: 'Start Here...' },
    owner: { type: String, required: true },
    sharedWith: [
        {
            user: { type: String, required: true },
            role: { type: String, enum: ['viewer', 'editor'], default: 'viewer' },
        }
    ]
}, { timestamps: true });

export const documentModel = model<IDocument>('document', documentSchema)
