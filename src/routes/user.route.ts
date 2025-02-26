import { Router} from "express";
import { loginUser, registerUser, adminLogin } from "../controllers/user.controller";
const   router = Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/adminLogin', adminLogin);


export default router;














