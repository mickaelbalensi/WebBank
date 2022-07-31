const router = require("express").Router();
const {Authorization} = require("../middleware/auth_middleware");
const {TransferController,BorrowRequestController,LoanController} = require("../controllers/bank.controller");

router.post('/transfer',Authorization, TransferController);
router.post('/borrow',Authorization, BorrowRequestController);
router.post('/loan',Authorization, LoanController);

module.exports = router;