const router = require('express').Router();
const {login,code} = require('../controller/auth');

router.get("/code",code)
router.post("/login",login)



module.exports = router;