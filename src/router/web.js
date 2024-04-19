import express from "express";
import docGiaController from "../controllers/docGiaController";
import testHome from "../controllers/testHome";
import NXBController from "../controllers/NXBController";
import nhanVienController from "../controllers/nhanVienController";
import sachController from "../controllers/sachController";
import cartController from "../controllers/cartController";
import phieuController from "../controllers/phieuController";

let router = express.Router();



//khai báo all router trong đây
let initWebRouters = (app) => {
    router.get("/", testHome.getHome);
    //docgia
    router.post('/api/createDocGia', docGiaController.createDocGia)
    router.put('/api/editDocGia/:docgiaId', docGiaController.editDocGia)
    router.delete('/api/deleteDocGia/:docgiaId', docGiaController.deleteDocGia)
    router.get('/api/getAllDocGia', docGiaController.getAllDocGia)

    //nxb
    router.post('/createNXB', NXBController.createNXB)
    router.put('/editNXB', NXBController.editNXB)
    router.delete('/deleteNXB/:nxbId', NXBController.deleteNXB)
    router.get('/getAllNXB', NXBController.getAllNXB)

    //sách
    router.post('/createSach', sachController.createSach)
    router.put('/editSach', sachController.editSach)
    router.delete('/deleteSach/:sachId', sachController.deleteSach)
    router.get('/getAllSach', sachController.getAllSach)

    //nhân viên
    router.post('/createNhanVien', nhanVienController.createNhanVien)
    router.put('/editNhanVien', nhanVienController.editNhanVien)
    router.delete('/deleteNhanVien/:nhanVienId', nhanVienController.deleteNhanVien)
    router.get('/getAllNhanVien', nhanVienController.getAllNhanVien)

    //cart
    router.post('/addCart', cartController.addCart)
    router.get('/getCartByUseId/:docgiaId', cartController.getCartByUseId)
    router.delete('/deleteSachCart/:sachId', cartController.deleteSachCart)

    // phiếu mượn
    router.post('/checkOutPhieu', phieuController.checkOutPhieu)
    router.put('/confirmStatus/:phieuId', phieuController.confirmStatus)
    // router.get('/admin/filterStatus',  phieuController.filterStatus)




    return router;
}
module.exports = initWebRouters;
