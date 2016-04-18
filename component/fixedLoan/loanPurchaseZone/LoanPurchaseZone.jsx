require("./LoanPurchaseZone.css");

var React=require("react");
var classNames=require("classnames");
var loanPurchaseZoneStore=require("../../../store/fixedLoan/loanPurchaseZoneStore.js");
var loanPurchaseZoneAction=require("../../../action/fixedLoan/loanPurchaseZoneAction.js");

//用户可用余额
var UserUsableBalance=React.createClass({
    render:function(){
        return (
            <div>
                <label className="loan-purchaseZone-subtitle">账户可用余额：</label>
                <span className="amount">{this.props.userBalance}</span>
            </div>
        )
    }
});

//余额全部购买
var UsingAllBalanceButton=React.createClass({
    _handleClick:function(){
        loanPurchaseZoneAction.useAllBalance();
    },
    render:function(){
        return (
            <a href="javascript:void(0)" className="pull-left" onClick={this._handleClick}>余额全部购买</a>
        )
    }
});

//充值
var RechargeButton=React.createClass({
    _handleClick:function(){
        loanPurchaseZoneAction.recharge();
    },
    render:function(){
        return (
            <a href="javascript:void(0)" className="pull-right" onClick={this._handleClick}>充值 》</a>
        )
    }
});

//接收用户所输入的购买金额
var GetPurchaseAmount=React.createClass({
    _handlePurchaseAmountChange:function(){
        loanPurchaseZoneAction.fillInPurchaseAmount(this.refs.purchaseAmount.value);
    },
    render:function(){
        return (
            <div style={{marginBottom:"0"}}>
                <input type="text"
                       className="nt-input block"
                       value={this.props.purchaseAmount}
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
    render:function(){
        var validationResult=this.props.validationResult;
        var classes=classNames({
            "loan-purchaseZone-errorMessage":true,
            "invisible":validationResult.success
        });

        return (
            <p className={classes} style={{marginBottom:"20px"}}>
                {validationResult.message}
            </p>
        )
    }

});

//计算预期收益
var FigureOutExpectedReturn=React.createClass({
    render:function(){
        return (
            <div style={{marginTop:"10px"}}>
                <label className="loan-purchaseZone-subtitle">预期收益：</label>
                <span className="amount">{this.props.expectReturnAmount}</span>元
            </div>
        )
    }
});


//匹配红包并且计算出实际的支付金额
var FigureOutActualPayment=React.createClass({
    render:function(){
        var classes=classNames({
            "clearfix":true,
            "hide":this.props.redPackageAmount ? false : true
        });

        return (
            <div className={classes}>
                <label  className="loan-purchaseZone-subtitle pull-left">使用<span className="amount">{this.props.redPackageAmount}</span>元红包</label>
                <label  className="loan-purchaseZone-subtitle pull-right">支付金额：<span className="amount">{this.props.actualPayment}</span>元</label>
            </div>
        )
    }
});

//购买
var PurchaseButton=React.createClass({
    _handleClick:function(){
        if(!this.props.didLogin){
            console.log("是时候弹出登录模态窗口了！")
        }else if(!this.props.didPassValidation){
            console.log("验证不通过！！")
        } else if(this.props.didLogin && this.props.didPassValidation){
            console.log("是时候弹出购买确定模态窗口了！")
        }
    },
    render:function(){
        var buttonText=this.props.didLogin ? "立即抢购" : "登录抢购" ;

        return (
            <div>
                <button className="nt-button block default" onClick={this._handleClick}>{buttonText}</button>
            </div>
        )
    }
});




//view controller
var LoanPurchaseZone=React.createClass({
    getInitialState:function(){
        return {
            purchaseAmount:''
        }
    },
    _handleChange:function(purchaseAmount){
        this.setState({
            purchaseAmount:purchaseAmount
        });
    },
    componentDidMount:function(){
        var _self=this;
        loanPurchaseZoneAction.getData();
        loanPurchaseZoneStore.bind("change",function(){
            _self.isLogin=loanPurchaseZoneStore.getIsLogin();
            _self.userBalance=loanPurchaseZoneStore.getUserBalance();
            _self.loanObject=loanPurchaseZoneStore.getLoanObject();
            _self.setState({
                purchaseAmount:""
            });
        });
    },
    render:function(){
        console.log(loanPurchaseZoneStore.getExpectReturnAmount());
        var validation={success:true,message:""};
        return (
            <div className="loan-purchaseZone">
                <UserUsableBalance userBalance={loanPurchaseZoneStore.getUserBalance()} />
                <div className="clearfix loan-purchaseAll-and-recharge">
                    <UsingAllBalanceButton/>
                    <RechargeButton didLogin={this.isLogin || false} />
                </div>
                <GetPurchaseAmount handleChange={this._handleChange} purchaseAmount={this.state.purchaseAmount} />
                <CheckPurchaseAmount validationResult={loanPurchaseZoneStore.getValidationResult()} />
                <FigureOutExpectedReturn expectReturnAmount={loanPurchaseZoneStore.getExpectReturnAmount()} />
                <FigureOutActualPayment redPackageAmount={loanPurchaseZoneStore.getRedPackageAmount()} actualPayment={loanPurchaseZoneStore.getActualPayment()}/>
                <PurchaseButton  didPassValidation={validation.success} didLogin={this.isLogin} />
            </div>
        )
    },
    componentDidMount:function(){
        loanPurchaseZoneStore.bind("purchaseAmountChange",function(){
            console.log("into purchaseAmountChange handler");
            this._handleChange(loanPurchaseZoneStore.getPurchaseAmount());
        }.bind(this));

        loanPurchaseZoneStore.bind("didNotLogin",function(){
            alert("您没有登录，请先登录!");
        });

        loanPurchaseZoneStore.bind("goToRecharge",function(){
            alert("it is the time to go to recharge page!");
        });

    }
});

module.exports=LoanPurchaseZone;