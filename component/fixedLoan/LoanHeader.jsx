require("./LoanHeader.css");

var React=require("react");

var LoanHeader=React.createClass({
    render:function(){
        return (
            <h5 className="loan-header">{this.props.loanTitle}</h5>
        )
    }
});

module.exports=LoanHeader;