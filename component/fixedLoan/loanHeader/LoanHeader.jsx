require("./LoanHeader.css");

var React=require("react");

var LoanHeader=React.createClass({
    render:function(){
        var loanObject=this.props.loanObject;
        console.log(loanObject);
        return (
            <h5 className="loan-header">{loanObject.title}</h5>
        )
    }
});

module.exports=LoanHeader;