import PhieuMuon from '../models/phieuMuon';
import Cart from '../models/cartModel';




const checkOutPhieu = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.docgia) {
                resolve({
                    errCode: 1,
                    errMessage: 'doc gia not found'
                })
            }

            // Tìm giỏ hàng dựa trên docgia
            const cart = await Cart.findOne({ docgia: data.docgia });

            // Nếu không tìm thấy giỏ hàng, trả về lỗi
            if (!cart) {
                resolve({
                    errCode: 2,
                    errMessage: 'Cart not found!'
                })
            }

            const orderCode = 'MA-' + Date.now();

            let totalPrice = 0;
            cart.cartItems.forEach(item => {
                totalPrice += item.price;
            });

            // Tạo phiếu mượn mới
            const phieu = await PhieuMuon.create({
                docgia: data.docgia,
                PhieuMuonItems: cart.cartItems,
                totalPrice: totalPrice,
                orderCode: orderCode,

            });

            // Xóa giỏ hàng sau khi checkout
            await Cart.deleteOne({ _id: cart._id });
            resolve({
                errCode: 0,
                errMessage: 'ok',
                phieu
            });

        } catch (error) {
            reject(error);
        }
    });
}

module.exports = {
    checkOutPhieu
};

module.exports = {
    checkOutPhieu
}