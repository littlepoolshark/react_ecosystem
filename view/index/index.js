var React=require("react");
var ReactDOM=require("react-dom");
var Dashboard=require("../../component/index/dashboard/dashboard.jsx");
var CircleProcessBar=require("../../component/utilities/circleProcessBar/CircleProcessBar.jsx");
var InvestmentList=require("../../component/index/investmentList/InvestmentList.jsx");
var testButton=document.getElementById("test");
var investmentListContainer=document.getElementById("investmentListContainer");

ReactDOM.render(<Dashboard/>,document.getElementById("dashboardContainer"));
ReactDOM.render(<CircleProcessBar percentage={100} />,document.getElementById("circleProcessBarContainer"));
ReactDOM.render(<InvestmentList />,document.getElementById("investmentListContainer"));

testButton.addEventListener("click",function(){

    if(investmentListContainer.innerHTML){
        ReactDOM.unmountComponentAtNode(investmentListContainer);
    }else {
        ReactDOM.render(< InvestmentList/>,investmentListContainer);
    }

},false)