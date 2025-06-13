import { documentModel, IDocument } from "./document.interface";

const createDocumentIntoDB = async (payload: IDocument) => {
    console.log(payload)
    const result = await documentModel.create(payload)
    console.log("it is result",result)
    return result
}

const deleteDocumentFromDB = async (id: string) => {
    const result = await documentModel.deleteOne({_id: id })
    return result
}
export const documentServices = {
    createDocumentIntoDB,deleteDocumentFromDB
}