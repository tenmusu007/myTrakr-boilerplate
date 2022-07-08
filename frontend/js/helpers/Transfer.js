class Transfer extends Transaction {
    constructor(amount, account, accountIdFrom, accountIdTo){
        super(amount, account)
        this.accountIdFrom = accountIdFrom;
        this.accountIdTo = accountIdTo;
    }
    get value(){
        if(this.accountIdFrom === this.account){
            console.log(this.accountIdFrom);
            console.log(this.account);
            return -this.amount
        }else if(this.accountIdTo == this.account){
            return this.amount
        }
        // return "this account " + this.account
        // return [this.amount, this.account]
    }
}

