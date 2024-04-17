import Cart from '../models/cartModel';
import Sach from '../models/sachModel';

const addCart = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            // Tìm cart của docgia
            let cart = await Cart.findOne({ docgia: data.docgia });

            if (!cart) {
                cart = new Cart({
                    docgia: data.docgia,
                    cartItems: [],
                    totalPrice: 0
                });
            }

            // 
            for (let i = 0; i < data.cartItems.length; i++) {
                const item = data.cartItems[i];

                // Tìm sách trong db
                const sach = await Sach.findById(item.sach);

                // Xác định số lượng sách có sẵn
                const availableQuantity = sach.soQuyen;

                // Nếu số lượng sách muốn thêm vào giỏ hàng lớn hơn số lượng có sẵn, trả về lỗi
                if (item.amount > availableQuantity) {
                    resolve({
                        errCode: -3,
                        errMessage: `Sách này chỉ còn ${availableQuantity} quyển có sẵn!`
                    });
                    return;
                }

                // Kiểm tra xem sách đã exist trong cart chưa
                let isExistCartItem = cart.cartItems.find(cartItem =>
                    // ss id sách của cartItem với id sách của item đang xét
                    cartItem.sach.toString() === item.sach.toString()
                );

                if (isExistCartItem) {
                    isExistCartItem.amount += item.amount;
                    isExistCartItem.price += sach.donGia * item.amount;
                } else {
                    // Nếu sách chưa có trong giỏ hàng, thêm mới
                    isExistCartItem = {
                        sach: sach._id,
                        name: sach.tenSach,
                        image: sach.anhSach[0],
                        price: sach.donGia,
                        amount: item.amount,
                    };
                    cart.cartItems.push(isExistCartItem);
                }

                // Cập nhật tổng giá trị giỏ hàng
                cart.totalPrice += item.amount * sach.donGia;
            }

            await cart.save();

            resolve({
                errCode: 0,
                errMessage: 'ok',
                cart
            });

        } catch (e) {
            // Nếu có lỗi, trả về lỗi
            reject(e);
        }
    });
}

//lấy ra giỏ hàng của docgia
const getCartByUseId = async (docgiaId) => {
    try {
        // `cartItems.sach` là một trường tham chiếu đến model Sach
        const cart = await Cart.findOne({ docgia: docgiaId }).populate('cartItems.sach');
        if (!cart) {
            return {
                errCode: -1,
                errMessage: 'Không tìm thấy giỏ hàng'
            };
        }

        return {
            errCode: 0,
            errMessage: 'ok',
            cart
        };
    } catch (e) {
        console.log(e);
        return {
            errCode: -1,
            errMessage: 'Error from server!'
        };
    }
};

//xóa
const deleteSachCart = (itemId) => {
    return new Promise(async (resolve, reject) => {
        try {
            // Tìm giỏ hàng chứa mục cần xóa
            // Đk find là có ít nhất một đối tượng trong mảng 'cartItems' có '_id' bằng 'itemId'
            let cart = await Cart.findOne({ 'cartItems._id': itemId });
            if (!cart) {
                resolve({
                    errCode: 1,
                    errMessage: 'item in cart not found'
                });
            }
            else {
                //tìm sp cần xóa trong cart
                const itemToDelete = cart.cartItems.find(item => item._id.toString() === itemId);

                if (itemToDelete) {
                    cart.totalPrice -= itemToDelete.itemsPrice;
                }

                //  mục có _id khớp với itemId đã không còn trong mảng cartItems nữa
                // Xóa sản phẩm khỏi giỏ hàng
                cart.cartItems = cart.cartItems.filter(item => item._id.toString() !== itemId);

                await cart.save();
                resolve({
                    errCode: 0,
                    errMessage: 'Delete product success',
                    cart
                });
            }
        } catch (e) {
            reject(e);
        }
    });
}

module.exports = {
    getCartByUseId,
    addCart,
    deleteSachCart,
}