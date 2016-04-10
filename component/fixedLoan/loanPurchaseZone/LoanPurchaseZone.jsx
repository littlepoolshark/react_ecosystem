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
                <span className="amount">{this.props.userBalance}</span>元
            </div>
        )
    }
});

//余额全部购买
var UsingAllBalanceButton=React.createClass({
    _figureOutUsableAmount:function(userBalance,loanRemainAmount){
        var userBalance=parseInt(userBalance),
            loanRemainAmount=parseInt(loanRemainAmount);
        var UsableAmount=userBalance >= loanRemainAmount ?
                         loanRemainAmount :
                         userBalance ;
        return UsableAmount;
    },
    _handleClick:function(){
        if(!this.props.didLogin){
            console.log("是时候弹出登陆框了！");
        }else {
            //console.log("this._figureOutUsableAmount():",this._figureOutUsableAmount());
            this.props.handleChange(this._figureOutUsableAmount(this.props.userBalance,this.props.loanRemainAmount));
        }
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
        if(!this.props.didLogin){
            console.log("是时候弹出登陆框了！");
        }else {
            console.log("使用window.location.href跳转");
        }
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
        var purchase=this.refs.purchaseAmount.value === "" ? "" : parseFloat(this.refs.purchaseAmount.value);
        this.props.handleChange(purchase);
    },
    componentWillMount:function(){
        this.isFirstRender=true;
    },
    render:function(){
        var purchaseAmount=this.isFirstRender ? "" : this.props.purchaseAmount ;
        return (
            <div style={{marginBottom:"0"}}>
                <input type="text"
                       className="nt-input block"
                       value={purchaseAmount}
                       placeholder="100元起投，100的整数倍追加"
                       onChange={this._handlePurchaseAmountChange}
                       ref="purchaseAmount"
                />
            </div>
        )
    },
    componentDidMount:function(){
        this.isFirstRender=false;
    }
});

//对用户所输入的金额进行验证
var CheckPurchaseAmount=React.createClass({
    componentWillMount:function(){
        this.isFirstRender=true;
    },
    render:function(){
        var classes=classNames({
            "loan-purchaseZone-errorMessage":true,
            "invisible":this.isFirstRender ? true : this.props.didPassValidation //第一次渲染的时候，隐藏错误信息
        });

        return (
            <p className={classes} style={{marginBottom:"20px"}}>
                {this.props.validationMessage}
            </p>
        )
    },
    componentDidMount:function(){
        this.isFirstRender=false;
    }

});

//计算预期收益
var FigureOutExpectedReturn=React.createClass({
    _calculate:function(purchaseAmount,loanYearRate,loanDeadline){
        var expectedReturn=purchaseAmount === "" ? 0.00 : ((purchaseAmount * loanYearRate)/12 * loanDeadline).toFixed(2);
        return expectedReturn;
    },
    render:function(){
        return (
            <div style={{marginTop:"10px"}}>
                <label className="loan-purchaseZone-subtitle">预期收益：</label>
                <span className="amount">{this._calculate(this.props.purchaseAmount,this.props.loanYearRate,this.props.loanDeadline)}</span>元
            </div>
        )
    }
});


//匹配红包并且计算出实际的支付金额
var FigureOutActualPayment=React.createClass({
    _calculateActualPayment:function(redPackageAmount,purchaseAmount){
        var actualPayment=(purchaseAmount-redPackageAmount).toFixed(0);
        return actualPayment;
    },
    _redPackageMatch:function(redPackageList,purchaseAmount){
        var redPackageAmount=0;
        for(var key in redPackageList){
            if(parseInt(purchaseAmount) === parseInt(key)) {
                redPackageAmount=redPackageList[key];
                break;
            }
        }
        return redPackageAmount;
    },
    render:function(){
        var redPackageAmount=this._redPackageMatch(this.props.redPackageList,this.props.purchaseAmount);
        var actualPayment=this._calculateActualPayment(redPackageAmount,this.props.purchaseAmount);

        var classes=classNames({
            "clearfix":true,
            "hide":redPackageAmount ? false : true
        });

        return (
            <div className={classes}>
                <label  className="loan-purchaseZone-subtitle pull-left">使用<span className="amount">{redPackageAmount}</span>元红包</label>
                <label  className="loan-purchaseZone-subtitle pull-right">支付金额：<span className="amount">{actualPayment}</span>元</label>
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
            purchaseAmount:0
        }
    },
    _handleChange:function(purchaseAmount){
        this.setState({
            purchaseAmount:purchaseAmount
        });
    },
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
    componentWillMount:function(){
        var _self=this;
        loanPurchaseZoneAction.getData();
        loanPurchaseZoneStore.bind("change",function(){
            _self.isLogin=loanPurchaseZoneStore.getIsLogin();
            _self.userBalance=loanPurchaseZoneStore.getUserBalance();
            _self.loanObject=loanPurchaseZoneStore.getLoanObject();
        });
    },
    render:function(){
        var validation=this._validate(this.props.loanRemainAmount,this.props.userBalance,this.state.purchaseAmount)

        return (
            <div className="loan-purchaseZone">
                <UserUsableBalance userBalance={this.userBalance}/>
                <div className="clearfix loan-purchaseAll-and-recharge">
                    <UsingAllBalanceButton
                        didLogin={this.isLogin}
                        userBalance={this.userBalance}
                        loanRemainAmount={this.loanObject.remainAmount}
                        handleChange={this._handleChange}
                    />
                    <RechargeButton didLogin={this.isLogin} />
                </div>
                <GetPurchaseAmount handleChange={this._handleChange} purchaseAmount={this.state.purchaseAmount}/>
                <CheckPurchaseAmount
                    didPassValidation={validation.success}
                    validationMessage={validation.message}
                />
                <FigureOutExpectedReturn loanYearRate={this.loanObject.yearRate} loanDeadline={this.loanObject.deadline} purchaseAmount={this.state.purchaseAmount}/>
                <FigureOutActualPayment redPackageList={this.loanObject.redPackageList} purchaseAmount={this.state.purchaseAmount}/>
                <PurchaseButton  didPassValidation={validation.success} didLogin={this.isLogin} />
            </div>
        )
    },
    componentDidMount:function(){

    }
});

module.exports=LoanPurchaseZone;