require("../../static/css/bootstrap.grid.css");
require("../../static/css/utilities.css");
require("./fixedLoan.css");
require("../../static/css/common.css");

var React=require("react");
var ReactDOM=require("react-dom");
var LoanHeader=require("../../component/fixedLoan/loanHeader/LoanHeader.jsx");
var LoanSummary=require("../../component/fixedLoan/loanSummary/LoanSummary.jsx");
var LoanBasicInfo=require("../../component/fixedLoan/loanBasicInfo/LoanBasicInfo.jsx");
var LoanProgressBar=require("../../component/fixedLoan/loanProgressBar/LoanProgressBar.jsx");
var LoanPurchaseZone=require("../../component/fixedLoan/loanPurchaseZone/LoanPurchaseZone.jsx");

var App=React.createClass({
    render:function(){
        return (
            <div className="container">
                <div className="card">
                    <LoanHeader loanTitle="好采投20160406"/>
                    <div className="row clearfix">
                        <div className="col-xs-7">
                            <LoanSummary />
                            <div className="halvingLine"></div>
                            <LoanBasicInfo />
                            <LoanProgressBar />
                        </div>
                        <div className="col-xs-4 col-xs-offset-1">
                            <LoanPurchaseZone />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
});


ReactDOM.render(<App />,document.getElementById("appContainer"));