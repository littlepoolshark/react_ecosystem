var React=require("react");
var ReactDOM=require("react-dom");
var Dashboard=require("../../component/index/dashboard/dashboard.jsx");
var CircleProcessBar=require("../../component/utilities/circleProcessBar/CircleProcessBar.jsx");
var InvestmentList=require("../../component/index/investmentList/InvestmentList.jsx");
var Modal=require("../../component/utilities/modal/Modal.jsx");
var testButton=document.getElementById("test");
var openModalBtn=document.getElementById("openModalBtn");
var closeModalBtn=document.getElementById("closeModalBtn");
var investmentListContainer=document.getElementById("investmentListContainer");
//var modalContainer=document.getElementById("modalContainer");


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

openModalBtn.addEventListener("click",function(){
    //alert("sdfsda")
    Modal.alert("hello,modal component!");
},false)
closeModalBtn.addEventListener("click",function(){
    Modal.close();
},false)