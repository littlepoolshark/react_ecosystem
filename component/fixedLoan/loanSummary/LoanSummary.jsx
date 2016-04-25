require("./LoanSummary.css");

var React=require("react");

var LoanSummary=React.createClass({
    render:function(){
        var loanObject=this.props.loanObject;
        return (
            <div className="row clearfix">
                <div className="col-xs-4 text-center loanSummary-title-wrapper">
                    <div className="loanSummary-title">{loanObject.yearRate * 100}<span className="loanSummary-title-unit">%</span></div>
                    <div className="loanSummary-subtitle">年化利率</div>
                </div>
                <div className="col-xs-4 text-center loanSummary-title-wrapper">
                    <div className="loanSummary-title">{loanObject.deadline}<span className="loanSummary-title-unit">个月</span></div>
                    <div className="loanSummary-subtitle">项目期限</div>
                </div>
                <div className="col-xs-4 text-center loanSummary-title-wrapper last-child">
                    <div className="loanSummary-title"><span className="remainAmount">{loanObject.remainAmount}</span><span className="loanSummary-title-unit">元</span></div>
                    <div className="loanSummary-subtitle">剩余可购买额度</div>
                </div>
            </div>
        )
    }
});

module.exports=LoanSummary;