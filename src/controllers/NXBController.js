import NXBService from '../services/NXBService'
import NXBModel from '../models/NXBModel';

// đăng ký
let createNXB = async (req, res) => {
    try {
        let data = req.body;
        let response = await NXBService.createNXB(data);
        // Trả về kết quả
        return res.status(200).json({
            errCode: response.errCode,
            errMessage: response.errMessage,
            nxb: response.nxb
        });
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server!'
        })
    }
};


let editNXB = async (req, res) => {
    try {
        let data = req.body;
        let response = await NXBService.editNXB(data);
        return res.status(200).json({
            errCode: response.errCode,
            errMessage: response.errMessage,
            nxb: response.nxb
        });
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server!'
        })
    }

}

const deleteNXB = async (req, res) => {
    try {
        let nxbId = req.params.nxbId;
        let response = await NXBService.deleteNXB(nxbId);
        return res.status(200).json({
            errCode: response.errCode,
            errMessage: response.errMessage,
        });
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server!'
        })
    }
}

const getAllNXB = async (req, res) => {
    try {
        let response = await NXBService.getAllNXB();
        return res.status(200).json({
            errCode: response.errCode,
            errMessage: response.errMessage,
            nxb: response.nxb
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
    createNXB,
    editNXB,
    deleteNXB,
    getAllNXB
}