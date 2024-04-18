import phieuService from "../services/phieuService";


let checkOutPhieu = async (req, res) => {
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

module.exports = {
    checkOutPhieu
}