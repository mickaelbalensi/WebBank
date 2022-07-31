const User = require("../models/user.model");
const transfer = require('../services/transfer');
const {
    loanID2Loan,
    updateLoanStatus,
    updateLoanDate,
    updateLoanDuration, 
    bankAccount2User} = require('../services/loan');

module.exports.TransferController = async (req,res) => {
    const userFrom = req.user;
    const {dest, amount} = req.body;
    const amount2Transfer = eval(amount);

    const destinataire = await User.findOne({numAccount : dest}).clone();
    if (destinataire === null)
        return res.status(404).json({error : 'This user don\'t exists'});

    if (transfer(userFrom, destinataire, amount2Transfer))
        return res.status(200).json({success : 'The transfer executed by success'});
    return res.status(409).json({amount : 'There are not enough in your bank account'})
}
module.exports.BorrowRequestController = async (req,res) =>{
    const borrower = req.user;
    const {numAccount, amountLoan} = req.body;
    
    if (borrower.soldAmount < 2 * amountLoan)
        return res.status(409).json({amountTooHigh : 'You can\'t request amount more than 50% of your sold account'});
    
    const lender = await User.findOne({numAccount : numAccount});
    if (lender === null)
        return res.status(409).json({notFound : 'This number doesn\'t associted with any account' });
        
    const dateRequest = new Date();
    const loan = {
        id : Date.now().toString(36),
        borrowerAccount : borrower.numAccount,
        lenderAccount : numAccount,
        amount : amountLoan,
        dateRequest : dateRequest
    }

    let loanListBorrower = borrower.loanList;
    let loanListLender = lender.loanList;
    loanListBorrower.push(loan);
    loanListLender.push(loan);

    await User.updateOne({numAccount: borrower.numAccount}, {loanList: loanListBorrower}, function(err) {
        if (err) {
          console.log(err);
        }
    }).clone();

    await User.updateOne({numAccount: lender.numAccount},{loanList:loanListLender}, function(err) {
        if (err) {
          console.log(err);
        }
    }).clone();

    res.status(200).json({status:'The borrow request sended with success'});
}
module.exports.LoanController = async(req,res)=>{
    const {accept, loanID, duration} = req.body;
    const lender = req.user;
    const loan = loanID2Loan(lender, loanID);

    let status = accept === false ? 'declined':
                   loan.amount > 0.6 * lender.soldAccount ? 'refused' : 'accepted';
    
    // update status loan request for lender 
    await updateLoanStatus(lender,loanID, status);

    // update status loan request for borrower 
    let borrower = await bankAccount2User(loan.borrowerAccount);
    await updateLoanStatus(borrower, loanID, status);
    
    if (status !== 'accepted')
        return res.status(200).json({message : `The loan request is ${status}`})     
    amount = loan.amount;
    await transfer(lender, borrower, amount);
    status = 'loaned';
    await updateLoanStatus(lender,loanID, status);
    await updateLoanStatus(borrower, loanID, status);
    await updateLoanDate(borrower, loanID, new Date());
    await updateLoanDate(borrower, loanID, new Date());
    await updateLoanDuration(borrower, loanID, duration);
    await updateLoanDuration(borrower, loanID, duration);


    return res.status(200).json({message : `The loan request is ${status}`})
}