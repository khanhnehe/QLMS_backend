import docGiaService from '../services/docGiaService'
import docGiaModel from '../models/docGiaModel';

// đăng ký
let createDocGia = async (req, res) => {
    try {
        let data = req.body;
        let response = await docGiaService.createDocGia(data);
        // Trả về kết quả
        return res.status(200).json({
            errCode: response.errCode,
            errMessage: response.errMessage,
            docGia: response.docGia
        });
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server!'
        })
    }
};


let editDocGia = async (req, res) => {
    try {
        let docgiaId = req.params.docgiaId;
        let data = req.body;
        let response = await docGiaService.editDocGia(docgiaId, data);
        return res.status(200).json({
            errCode: response.errCode,
            errMessage: response.errMessage,
            docGia: response.docGia
        });
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server!'
        })
    }

}

const deleteDocGia = async (req, res) => {
    try {
        let docgiaId = req.params.docgiaId;
        let response = await docGiaService.deleteDocGia(docgiaId);
        return res.status(200).json({
            errCode: response.errCode,
            errMessage: response.errMessage,
            // docGia: response.docGia
        });
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server!'
        })
    }
}

const getAllDocGia = async (req, res) => {
    try {
        let response = await docGiaService.getAllDocGia();
        return res.status(200).json({
            errCode: response.errCode,
            errMessage: response.errMessage,
            docGia: response.docGia
        });
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server!'
        })
    }
}

module.exports = {
    createDocGia,
    editDocGia,
    deleteDocGia,
    getAllDocGia
}