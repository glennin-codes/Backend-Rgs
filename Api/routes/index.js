import { Router } from 'express';
import { CreateMasterAdmin } from '../Controllers/User/Admin/CreateMasterAdmin.js';
import { getAllAdmins } from '../Controllers/User/Admin/GetAllAdmin.js';
import { CreateAdmin } from '../Controllers/User/Admin/CreateAdmin.js';
import { CreateEmployee } from '../Controllers/User/Employee/CreateEmployee.js';

const router = Router();

/* GET index page. */
router.get('/', (req, res) => {
  res.json({
    title: 'RGS system Management Api',
    DevelopedBy: "glen Ayienda",
    Email:"ayiendaglen@gmail.com",
    Phone:"+254713322025",

  });
});
router.get('/api',(req,res)=>{
  res.send(
    "Welcome to RGS system Management Api"

  )
}
);
//Admin route
router.route('/api/master-admin').post(CreateMasterAdmin).get(getAllAdmins);
router.route('/api/admin').post(CreateAdmin).get(getAllAdmins);
router.route('/api/employees').post(CreateEmployee).get(getAllAdmins);

export default router;
