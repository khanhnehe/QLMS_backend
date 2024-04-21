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

//ogin
let handleLogin = async (req, res) => {
    let { dienThoai, password } = req.body;

    if (!dienThoai || !password) {
        return res.status(200).json({
            errCode: 1,
            message: 'Vui lòng nhập dienT hoai và password đầy đủ!'
        })
    }

    let userData = await docGiaService.handleLogin(dienThoai, password);
    return res.status(200).json({
        errCode: userData.errCode,
        errMessage: userData.errMessage,
        docGia: userData.docGia,

    })
}


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
    handleLogin,
    createDocGia,
    editDocGia,
    deleteDocGia,
    getAllDocGia
}