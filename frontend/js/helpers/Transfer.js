class Transfer extends Transaction {
    constructor(amount, account){
        super(account.accountIdFrom, account.accountIdTo)
    }
}
