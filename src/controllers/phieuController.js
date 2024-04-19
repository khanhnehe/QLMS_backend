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
        const { trangThai } = req.body;
        let response = await phieuService.confirmStatus(phieuId, trangThai);
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
    confirmStatus
}