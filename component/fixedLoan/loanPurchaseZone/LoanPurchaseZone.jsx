require("./LoanPurchaseZone.css");

var React=require("react");
var classNames=require("classnames");

//用户可用余额
var UserUsableBalance=React.createClass({
    render:function(){
        return (
            <div>
                <label className="loan-purchaseZone-subtitle">账户可用余额：</label>
                <span className="amount">{this.props.userBalance}</span>元
            </div>
        )
    }
});

//余额全部购买
var UsingAllBalanceButton=React.createClass({
    render:function(){
        return (
            <a href="javascript:void(0)" className="pull-left">余额全部购买</a>
        )
    }
});

//充值
var RechargeButton=React.createClass({
    render:function(){
        return (
            <a href="javascript:void(0)" className="pull-right">充值 》</a>
        )
    }
});

//接收用户所输入的购买金额
var GetPurchaseAmount=React.createClass({
    _handlePurchaseAmountChange:function(){
        this.props.handleChange(parseFloat(this.refs.purchaseAmount.value));
    },
    render:function(){
        return (
            <div style={{marginBottom:"0"}}>
                <input type="text"
                       className="nt-input block"
                       placeholder="100元起投，100的整数倍追加"
                       onChange={this._handlePurchaseAmountChange}
                       ref="purchaseAmount"
                />
            </div>
        )
    }
});

//对用户所输入的金额进行验证
var CheckPurchaseAmount=React.createClass({
    _validate:function(loanRemainAmount,userBalance,purchaseAmount){
        var validation={};
        if(userBalance < 100){
            validation={
                success:false,
                message:"您的账户余额不足，请及时充值！"
            }
        }else if(purchaseAmount === ""){//必须使用全等到，不然的话会将0强制转化为""
            validation={
                success:false,
                message:"输入金额不能为空！"
            }
        }else if(purchaseAmount === 0){
            validation={
                success:false,
                message:"输入金额不能为0！"
            }
        }else if(purchaseAmount <100){
            validation={
                success:false,
                message:"输入金额不能小于100！"
            }
        }else if(purchaseAmount % 100 !== 0){
            validation={
                success:false,
                message:"输入金额必须为100的整数倍！"
            }
        }else if(purchaseAmount > loanRemainAmount){
            validation={
                success:false,
                message:"输入金额不能大于项目可购买余额！"
            }
        }else if(purchaseAmount > userBalance) {
            validation={
                success:false,
                message:"购买金额不能大于账户余额,请及时充值！"
            }
        }else {
            validation={
                success:true,
                message:""
            }
        }

        return validation;
    },
    render:function(){
        var validation=this._validate(this.props.loanRemainAmount,this.props.userBalance,this.props.purchaseAmount);
        var classes=classNames({
            "loan-purchaseZone-errorMessage":true,
            "hide":validation.success
        });

        return (
            <p className={classes} style={{marginBottom:"20px"}}>
                {validation.message}
            </p>
        )
    }
});

//计算预期收益
var FigureOutExpectedReturn=React.createClass({
    _calculate:function(purchaseAmount,loanYearRate,loanDeadline){
        console.log(typeof purchaseAmount,typeof loanYearRate,typeof loanDeadline);
        var expectedReturn=((purchaseAmount * loanYearRate)/12 * loanDeadline).toFixed(2);
        return expectedReturn;
    },
    render:function(){
        return (
            <div>
                <label className="loan-purchaseZone-subtitle">预期收益：</label>
                <span className="amount">{this._calculate(this.props.purchaseAmount,this.props.loanYearRate,this.props.loanDeadline)}</span>元
            </div>
        )
    }
});


//匹配红包并且计算出实际的支付金额
var FigureOutActualPayment=React.createClass({
    render:function(){
        return (
            <div className="clearfix">
                <label  className="loan-purchaseZone-subtitle pull-left">使用<span className="amount">0.00</span>元红包</label>
                <label  className="loan-purchaseZone-subtitle pull-right">支付金额：<span className="amount">0</span>元</label>
            </div>
        )
    }
});

//购买
var PurchaseButton=React.createClass({
    render:function(){
        return (
            <div>
                <button className="nt-button block default">立即抢购</button>
            </div>
        )
    }
});




//view controller
var LoanPurchaseZone=React.createClass({
    getInitialState:function(){
        return {
            purchaseAmount:""
        }
    },
    _handleChange:function(purchaseAmount){
        this.setState({
            purchaseAmount:purchaseAmount
        });
    },
    render:function(){
        return (
            <div className="loan-purchaseZone">
                <UserUsableBalance userBalance={10000}/>
                <div className="clearfix loan-purchaseAll-and-recharge">
                    <UsingAllBalanceButton />
                    <RechargeButton />
                </div>
                <GetPurchaseAmount handleChange={this._handleChange}/>
                <CheckPurchaseAmount
                    loanRemainAmount={10000}
                    userBalance={20000}
                    purchaseAmount={this.state.purchaseAmount}
                />
                <FigureOutExpectedReturn loanYearRate={0.095} loanDeadline={6} purchaseAmount={this.state.purchaseAmount}/>
                <FigureOutActualPayment />
                <PurchaseButton />
            </div>
        )
    }
});

module.exports=LoanPurchaseZone;