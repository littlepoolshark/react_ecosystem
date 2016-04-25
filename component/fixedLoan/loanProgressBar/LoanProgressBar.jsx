require("./LoanProgressBar.css");

var React=require("react");

var LoanProgressBar=React.createClass({
    _figureOutProgressPercent:function(totalAmount,remainAmount){
        var progressPercent=(totalAmount - remainAmount) / (totalAmount ? totalAmount : 1 ) * 100 ;
        console.log(typeof progressPercent,"progressPercent:",progressPercent);
        return progressPercent.toFixed(1);
    },
    render:function(){
        var loanObject=this.props.loanObject;
        var progressPercent=this._figureOutProgressPercent(loanObject.totalAmount,loanObject.remainAmount);
        var styles={
            width:progressPercent + "%"
        }
        return (
            <div className="loan-progressbar clearfix">
                <label className="loan-progressbar-subtitle pull-left">投资进度</label>
                <div className="loan-progressbar-wrapper pull-left">
                    <div className="loan-progressbar-body" style={styles}></div>
                </div>
                <span className="rate pull-left">{progressPercent}%</span>
            </div>
        )
    }
});

module.exports=LoanProgressBar;