var React=require("react");
var ReactDOM=require("react-dom");
var LoanHeader=require("../../component/fixedLoan/LoanHeader.jsx");

var App=React.createClass({
    render:function(){
        return (
            <div>
                <div className="card">
                    <LoanHeader loanTitle="好采投20160406"/>
                </div>
            </div>
        )
    }
});


ReactDOM.render(<App />,document.getElementById("appContainer"));