import sachService from '../services/sachService'

// đăng ký
let createSach = async (req, res) => {
    try {
        let data = req.body;
        let response = await sachService.createSach(data);
        // Trả về kết quả
        return res.status(200).json({
            errCode: response.errCode,
            errMessage: response.errMessage,
            sach: response.sach
        });
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server!'
        })
    }
};


let editSach = async (req, res) => {
    try {
        let sachId = req.params.sachId;
        let data = req.body;
        let response = await sachService.editSach(data, sachId);
        return res.status(200).json({
            errCode: response.errCode,
            errMessage: response.errMessage,
            sach: response.sach
        });
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server!'
        })
    }

}

const deleteSach = async (req, res) => {
    try {
        let sachId = req.params.sachId;
        let response = await sachService.deleteSach(sachId);
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

const getAllSach = async (req, res) => {
    try {
        let response = await sachService.getAllSach();
        return res.status(200).json({
            errCode: response.errCode,
            errMessage: response.errMessage,
            sach: response.sach
        });
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server!'
        })
    }
}

let getSachById = async (req, res) => {
    try {
        let sachId = req.params.sachId;
        let sach = await sachService.getSachById(sachId);
        return res.status(200).json({
            errCode: sach.errCode,
            errMessage: sach.errMessage,
            sach: sach.data
        });
    } catch (e) {
        return res.status(500).json({
            errCode: -1,
            errMessage: 'Error from server!'
        });
    }
}

module.exports = {
    createSach,
    editSach,
    deleteSach,
    getAllSach,
    getSachById
}