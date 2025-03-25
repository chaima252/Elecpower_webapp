const userController = require("../controllers/UserController");
const verifyToken =require("../utils/verifyUser")

module.exports = (app) => {
;
    app.post("/signout", userController.signout);
    app.patch('/update/:userId',userController.updateUser)
    app.delete('/delete/:userId', userController.deleteUser);
    app.get('/getusers', userController.getUsers);
    app.patch('/update-role/:userId', userController.updateAdminRole);
    
};
