var React=require("react");
var ReactDOM=require("react-dom");
var Dashboard=require("../../component/index/dashboard/dashboard.jsx");
var CircleProcessBar=require("../../component/utilities/circleProcessBar/CircleProcessBar.jsx");
var InvestmentList=require("../../component/index/investmentList/InvestmentList.jsx");
var Modal=require("../../component/utilities/modal/Modal.jsx");
var testButton=document.getElementById("test");
var openAlertBtn=document.getElementById("openAlertBtn");
var openConfirmBtn=document.getElementById("openConfirmBtn");
var openDefaultBtn=document.getElementById("openDefaultBtn");
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

openAlertBtn.addEventListener("click",function(){
    //alert("sdfsda")
    Modal.alert("this text from alert method");
},false)

openConfirmBtn.addEventListener("click",function(){
    Modal.confirm("this text from confirm method",true,true);
},false)

openDefaultBtn.addEventListener("click",function(){
    alert("asdfsad");
    Modal.open({
        title:"",
        content:(
            <div><input/></div>
        ),
        buttons: {
            "btn1": true,
            "btn2": true,
            "btn3": function () {
                alert("你点击了btns");
                return true;
            }
        }

    })
},false)

