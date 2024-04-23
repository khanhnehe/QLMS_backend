import phieuService from "../services/phieuService";


const checkOutPhieu = async (req, res) => {
    try {
        let data = req.body;
        let response = await phieuService.checkOutPhieu(data);
        return res.status(200).json({
            errCode: response.errCode,
            errMessage: response.errMessage,
            phieu: response.phieu
        });
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server!'
        })
    }
};

const confirmStatus = async (req, res) => {
    try {
        const phieuId = req.params.phieuId;
        let actionStatus = req.body.actionStatus;
        let response = await phieuService.confirmStatus(phieuId, actionStatus);
        return res.status(200).json({
            errCode: response.errCode,
            errMessage: response.errMessage,
            phieu: response.phieu
        });
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server!'
        })
    }
}

const getAllPhieu = async (req, res) => {
    try {
        let response = await phieuService.getAllPhieu();
        return res.status(200).json({
            errCode: response.errCode,
            errMessage: response.errMessage,
            phieu: response.phieu
        });
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server!'
        })
    }
}

const getPhieuById = async (req, res) => {
    try {
        const docgiaId = req.params.docgiaId;
        let response = await phieuService.getPhieuById(docgiaId);
        return res.status(200).json({
            errCode: response.errCode,
            errMessage: response.errMessage,
            phieu: response.phieu
        });
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server!'
        })
    }
}

const getPhieuByStatus = async (req, res) => {
    try {
        const status = req.query.status;
        let response = await phieuService.getPhieuByStatus(status);
        return res.status(200).json({
            errCode: response.errCode,
            errMessage: response.errMessage,
            phieu: response.phieu
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
    checkOutPhieu,
    confirmStatus,
    getAllPhieu,
    getPhieuById,
    getPhieuByStatus
}