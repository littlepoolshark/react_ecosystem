require("./Dashboard.css");
var React=require("react");

var TransactionAmount = React.createClass({
    render:function(){
        return (
            <div className="col-xs-6 text-center">
                <span className="nt-dashboard-title">累计成交金额：</span><span dangerouslySetInnerHTML={{__html:this.props.transactionAmount}}></span><span className="nt-dashboard-unit">元</span>
            </div>
        )
    }
});

var RegisteredUserAmount=React.createClass({
    render:function(){
        return (
            <div className="col-xs-6 text-center">
                <span className="nt-dashboard-title">累计注册人数：</span><span dangerouslySetInnerHTML={{__html:this.props.registeredUserAmount}}></span><span className="nt-dashboard-unit">人</span>
            </div>
        )
    }
});

var Dashboard=React.createClass({
    _formatAmount:function(amount){
        var result = "";
        var yi = parseInt(amount / 100000000);
        if (yi != 0) {
            result += "<span class=\"nt-dashboard-digit\">" + yi + "</span><span class=\"nt-dashboard-unit\">亿</span>";
        }
        var qw = amount % 100000000;
        qw = parseInt(qw / 10000);
        if (qw != 0) {
            result += "<span class=\"nt-dashboard-digit\">" + qw + "</span><span class=\"nt-dashboard-unit\">万</span>";
        }
        var q = amount % 10000;
        if (q != 0) {
            result += "<span class=\"nt-dashboard-digit\">" + q + "</span><span class=\"nt-dashboard-unit\"></span>";
        }
        return result;
    },
    render:function(){
        var transactionAmount=this._formatAmount(this.props.transactionAmount);
        var registeredUserAmount=this._formatAmount(this.props.registeredUserAmount);
        return (
            <div className="nt-dashboard-wrapper clearfix">
                <div className="nt-dashboard">
                    <TransactionAmount transactionAmount={transactionAmount}/>
                    <RegisteredUserAmount registeredUserAmount={registeredUserAmount}/>
                </div>
            </div>
        )
    }
});

module.exports=Dashboard;