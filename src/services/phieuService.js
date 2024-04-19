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

const confirmStatus = (phieuId, trangThai) => {
    return new Promise(async (resolve, reject) => {
        try {
            const phieu = await PhieuMuon.findById(phieuId);
            if (!phieu) {
                resolve({
                    errCode: 1,
                    errMessage: 'Phiếu not found'
                });
            } else {
                let actionStatus = { trangThai: trangThai };

                // Nếu trạng thái mới là "Đang mượn", cập nhật ngayMuon và ngayTra
                if (trangThai === 'Đang mượn') {
                    actionStatus.ngayMuon = new Date();
                    actionStatus.hanTra = new Date();
                    actionStatus.hanTra.setDate(actionStatus.ngayMuon.getDate() + 15);
                }
                // Nếu trạng thái mới là "Đã trả", cập nhật ngayTra
                if (trangThai === 'Đã trả') {
                    actionStatus.ngayTra = new Date();
                }


                await PhieuMuon.updateOne({ _id: phieuId }, actionStatus);
                resolve({
                    errCode: 0,
                    errMessage: 'Trạng thái đã được cập nhật',
                    phieu
                });
            }
        } catch (e) {
            reject(e);
        }
    });
}

const getAllPhieu = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const phieu = await PhieuMuon.find().sort({ createdAt: -1, updatedAt: -1 })
            resolve({
                errCode: 0,
                errMessage: 'ok',
                phieu
            });
        } catch (e) {
            reject(e)
        }
    })
}


module.exports = {
    checkOutPhieu,
    confirmStatus,
    getAllPhieu
}