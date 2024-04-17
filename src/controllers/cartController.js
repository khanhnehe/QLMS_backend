import cartService from "../services/cartService";


//thêm vào cart
const addCart = async (req, res) => {
    try {
        const data = req.body;
        const response = await cartService.addCart(data);

        return res.status(200).json({
            errCode: response.errCode,
            errMessage: response.errMessage,
            cart: response.cart
        });

    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server!'
        })
    }
}
//láy ra giỏ hàng của dg
const getCartByUseId = async (req, res) => {
    try {
        const docgiaId = req.params.docgiaId;
        const data = await cartService.getCartByUseId(docgiaId);

        return res.status(200).json({
            errCode: data.errCode,
            errMessage: data.errMessage,
            cart: data.cart
        });
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server!'
        });
    }
};

// xóa 1 sản phẩm ra khỏi cart
const deleteSachCart = async (req, res) => {
    try {
        let sachId = req.params.sachId;
        const data = await cartService.deleteSachCart(sachId);
        return res.status(200).json({
            errCode: data.errCode,
            errMessage: data.errMessage,
            cart: data.cart
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
    getCartByUseId,
    addCart,
    deleteSachCart,
}