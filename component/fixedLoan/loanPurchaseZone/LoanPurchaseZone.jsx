require("./LoanPurchaseZone.css");

var React=require("react");

var LoanPurchaseZone=React.createClass({
    render:function(){
        return (
            <div className="loan-purchaseZone">
                <div>
                    <label className="loan-purchaseZone-subtitle">账户可用余额：</label>
                    <span className="amount">42000000</span>元
                </div>
                <div className="clearfix loan-purchaseAll-and-recharge">
                    <a href="javascript:void(0)" className="pull-left">余额全部购买</a>
                    <a href="javascript:void(0)" className="pull-right">充值 》</a>
                </div>
                <div style={{marginBottom:"0"}}><input type="text" className="nt-input block"/></div>
                <p className="loan-purchaseZone-errorMessage" style={{marginBottom:"20px"}}>输入金额必须为100的整数倍！</p>
                <div>
                    <label className="loan-purchaseZone-subtitle">预期收益：</label>
                    <span className="amount">0.00</span>元
                </div>
                <div className="clearfix">
                    <label  className="loan-purchaseZone-subtitle pull-left">使用<span className="amount">0.00</span>元红包</label>
                    <label  className="loan-purchaseZone-subtitle pull-right">支付金额：<span className="amount">0</span>元</label>
                </div>
                <div>
                    <button className="nt-button block default">立即抢购</button>
                </div>
            </div>
        )
    }
});

module.exports=LoanPurchaseZone;