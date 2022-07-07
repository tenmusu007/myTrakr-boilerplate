class Transfer extends Transaction {
    constructor(accountIdFrom, accountIdTo){
        super(account, amount)
        this.accountIdFrom = accountIdFrom;
        this.accountIdTo = accountIdTo;
    }
    get value(){
        // if(this.accountIdFrom === this.account.id){
        //     return -this.amount
        // }else if(this.accountIdTo === this.account.id){
        //     return this.amount
        // }
        return this.amount
    }
}

