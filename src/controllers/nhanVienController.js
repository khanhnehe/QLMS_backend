import nhanVienService from '../services/nhanVienService'

// đăng ký
let createNhanVien = async (req, res) => {
    try {
        let data = req.body;
        let response = await nhanVienService.createNhanVien(data);
        // Trả về kết quả
        return res.status(200).json({
            errCode: response.errCode,
            errMessage: response.errMessage,
            nhanVien: response.nhanVien
        });
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server!'
        })
    }
};

let loginAdmin = async (req, res) => {
    try {
        let data = req.body;
        let response = await nhanVienService.loginAdmin(data);
        // Trả về kết quả
        return res.status(200).json({
            errCode: response.errCode,
            errMessage: response.errMessage,
            nhanVien: response.nhanVien
        });
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server!'
        })
    }
};
let editNhanVien = async (req, res) => {
    try {
        let data = req.body;
        let response = await nhanVienService.editNhanVien(data);
        return res.status(200).json({
            errCode: response.errCode,
            errMessage: response.errMessage,
            nhanVien: response.nhanVien
        });
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server!'
        })
    }

}

const deleteNhanVien = async (req, res) => {
    try {
        let nhanVienId = req.params.nhanVienId;
        let response = await nhanVienService.deleteNhanVien(nhanVienId);
        return res.status(200).json({
            errCode: response.errCode,
            errMessage: response.errMessage,
            // nhanVien: response.nhanVien
        });
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server!'
        })
    }
}

const getAllNhanVien = async (req, res) => {
    try {
        let response = await nhanVienService.getAllNhanVien();
        return res.status(200).json({
            errCode: response.errCode,
            errMessage: response.errMessage,
            nhanVien: response.nhanVien
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
    createNhanVien,
    editNhanVien,
    deleteNhanVien,
    getAllNhanVien,
    loginAdmin
}