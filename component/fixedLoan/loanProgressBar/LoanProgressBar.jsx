require("./LoanProgressBar.css");

var React=require("react");

var LoanProgressBar=React.createClass({
    render:function(){
        return (
            <div className="loan-progressbar clearfix">
                <label className="loan-progressbar-subtitle pull-left">投资进度</label>
                <div className="loan-progressbar-wrapper pull-left">
                    <div className="loan-progressbar-body" style={{width:"50%"}}></div>
                </div>
                <span className="rate pull-left">50%</span>
            </div>
        )
    }
});

module.exports=LoanProgressBar;