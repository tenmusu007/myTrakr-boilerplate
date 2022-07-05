class Transfer extends Transaction {
    constructor(amount, account){
        super(account.accountIdFrom, account.accountIdTo)
    }
    // test(){
    //     super.test()
    //     console.log(this.account.accountIdFrom, this.account.accountIdTo);
    // }
}
