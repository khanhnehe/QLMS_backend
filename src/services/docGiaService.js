import DocGia from '../models/docGiaModel';
import bcrypt from "bcryptjs";


const checkSDT = async (sodt) => {
    return new Promise(async (resolve, reject) => {
        try {
            let soDienThoai = await DocGia.findOne({ dienThoai: sodt });
            // Nếu giá trị == undefined chạy vào false
            if (soDienThoai) {
                resolve(true);
            } else {
                resolve(false);
            }
        } catch (e) {
            reject(e);
        }
    })

};
const createDocGia = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {

            let isSDTExists = await checkSDT(data.dienThoai)
            if (isSDTExists === true) {
                resolve({
                    errCode: 1,
                    errMessage: 'số điện thoại đã tồn tại!'
                });
            }
            if (!data.hoLot || !data.ten || !data.ngaySinh ||
                !data.diaChi || !data.dienThoai || !data.password) {
                resolve({
                    errCode: 1,
                    errMessage: 'missing require parameter'
                })
            }

            let hashedPassword = await bcrypt.hash(data.password, 10);

            let docGia = await DocGia.create({
                hoLot: data.hoLot,
                password: hashedPassword,
                ten: data.ten,
                ngaySinh: data.ngaySinh,
                phai: data.phai,
                anh: data.anh,
                diaChi: data.diaChi,
                dienThoai: data.dienThoai,
                role: data.role
            })
            resolve({
                errCode: 0,
                message: 'OK',
                docGia
            });


        } catch (e) {
            reject(e)
        }
    })
}

const editDocGia = (docgiaId, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let checkDocGia = await DocGia.findById({ _id: docgiaId });

            if (!checkDocGia) {
                resolve({
                    errCode: 1,
                    errMessage: 'doc gia not found'
                });
            } else {
                if (!data.hoLot || !data.ten || !data.ngaySinh || !data.phai ||
                    !data.diaChi || !data.dienThoai || !data.password) {
                    resolve({
                        errCode: 2,
                        errMessage: 'missing require parameter'
                    });
                } else {
                    // Mã hóa password
                    let hashedPassword = await bcrypt.hash(data.password, 10);

                    checkDocGia.hoLot = data.hoLot;
                    checkDocGia.ten = data.ten;
                    checkDocGia.ngaySinh = data.ngaySinh;
                    checkDocGia.phai = data.phai;
                    checkDocGia.diaChi = data.diaChi;
                    checkDocGia.dienThoai = data.dienThoai;
                    checkDocGia.password = hashedPassword;

                    await checkDocGia.save();
                    resolve({
                        errCode: 0,
                        errMessage: 'edit ok',
                        docGia: checkDocGia
                    });
                }
            }
        } catch (e) {
            reject(e);
        }
    });
};

const deleteDocGia = (docgiaId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let checkDocGia = await DocGia.findById({
                _id: docgiaId
            })
            if (!checkDocGia) {
                resolve({
                    errCode: 1,
                    errMessage: 'doc gia not found'
                })
            } else {
                await DocGia.findByIdAndDelete({
                    _id: docgiaId
                })
                resolve({
                    errCode: 0,
                    errMessage: 'delete user success',
                    // checkDocGia: docGia
                })
            }

        } catch (e) {
            reject(e)
        }
    })

}

const getAllDocGia = () => {
    return new Promise(async (resolve, reject) => {
        try {

            let docGia = await DocGia.find().sort({ createdAt: -1, updatedAt: -1 })
            resolve({
                errCode: 0,
                errMessage: 'get all doc gia Success',
                docGia
            })
        } catch (e) {
            reject(e)
        }
    })
}

module.exports = {
    createDocGia,
    editDocGia,
    deleteDocGia,
    getAllDocGia
}