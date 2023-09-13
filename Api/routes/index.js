import { Router } from 'express';
import { CreateMasterAdmin } from '../Controllers/User/Admin/CreateMasterAdmin.js';
import { CreateAdmin } from '../Controllers/User/Admin/CreateAdmin.js';
import { CreateEmployee } from '../Controllers/User/Employee/CreateEmployee.js';
import { getAllemployees } from '../Controllers/User/Employee/GetAllEmployees.js';
import { DeleteEmployee } from '../Controllers/User/Employee/DeleteEmployee.js';
import { UpdateEmployee } from '../Controllers/User/Employee/UpdateEmployee.js';
import { MasterAdminMiddleware } from '../Controllers/User/Admin/MasterMiddleware.js';
import { authenticateJWT } from '../Controllers/Auth/AuthMiddleware.js';
import { Login } from '../Controllers/Auth/Login.js';
import multer from 'multer';

const router = Router();

/* GET index page. */
//Configure multer to handle file uploads
const storage = multer.memoryStorage(); // Store files in memory
const upload = multer({ storage });

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
router.route('/api/master-admin').post(upload.single('photo'),CreateMasterAdmin);
router.route('/api/admin').post(MasterAdminMiddleware,upload.single('photo'),CreateAdmin)
router.route('/api/employees').post( MasterAdminMiddleware,upload.single('photo'),CreateEmployee).get(MasterAdminMiddleware,getAllemployees);
router.route('/api/employees/:id').delete(MasterAdminMiddleware,DeleteEmployee).put(authenticateJWT,UpdateEmployee);
router.route('/api/login').post(Login)

export default router;
