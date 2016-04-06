require("./LoanSummary.css");

var React=require("react");

var LoanSummary=React.createClass({
    render:function(){
        return (
            <div className="row clearfix">
                <div className="col-xs-4 text-center loanSummary-title-wrapper">
                    <div className="loanSummary-title">9.5<span className="loanSummary-title-unit">%</span></div>
                    <div className="loanSummary-subtitle">年化利率</div>
                </div>
                <div className="col-xs-4 text-center loanSummary-title-wrapper">
                    <div className="loanSummary-title">1<span className="loanSummary-title-unit">个月</span></div>
                    <div className="loanSummary-subtitle">项目期限</div>
                </div>
                <div className="col-xs-4 text-center loanSummary-title-wrapper last-child">
                    <div className="loanSummary-title"><span className="remainAmount">996700</span><span className="loanSummary-title-unit">元</span></div>
                    <div className="loanSummary-subtitle">剩余可购买额度</div>
                </div>
            </div>
        )
    }
});

module.exports=LoanSummary;