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
    router.post('/login', docGiaController.handleLogin)
    router.post('/createDocGia', docGiaController.createDocGia)
    router.put('/editDocGia/:docgiaId', docGiaController.editDocGia)
    router.delete('/deleteDocGia/:docgiaId', docGiaController.deleteDocGia)
    router.get('/getAllDocGia', docGiaController.getAllDocGia)

    //nxb
    router.post('/createNXB', NXBController.createNXB)
    router.put('/editNXB', NXBController.editNXB)
    router.delete('/deleteNXB/:nxbId', NXBController.deleteNXB)
    router.get('/getAllNXB', NXBController.getAllNXB)

    //sách
    router.post('/createSach', sachController.createSach)
    router.put('/editSach/:sachId', sachController.editSach)
    router.delete('/deleteSach/:sachId', sachController.deleteSach)
    router.get('/getAllSach', sachController.getAllSach)
    router.get('/getSachById/:sachId', sachController.getSachById)


    //nhân viên
    router.post('/loginAdmin', nhanVienController.loginAdmin)
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
    router.get('/getAllPhieu', phieuController.getAllPhieu)
    router.get('/getPhieuById/:docgiaId', phieuController.getPhieuById)
    router.get('/getPhieuByStatus', phieuController.getPhieuByStatus)

    // router.get('/admin/filterStatus',  phieuController.filterStatus)




    return router;
}
module.exports = initWebRouters;
