import { documentModel, IDocument } from "./document.interface";

const createDocumentIntoDB = async (payload: IDocument) => {
    const result = await documentModel.create(payload)
    return result
}

const deleteDocumentFromDB = async (id: string) => {
    const result = await documentModel.deleteOne({_id: id })
    return result
}
export const documentServices = {
    createDocumentIntoDB,deleteDocumentFromDB
}