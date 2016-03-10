var React=require("react");
var ReactDOM=require("react-dom");
var Dashboard=require("../../component/index/dashboard/dashboard.jsx");
var CircleProcessBar=require("../../component/utilities/circleProcessBar/CircleProcessBar.jsx");
var InvestmentList=require("../../component/index/investmentList/InvestmentList.jsx");
var Modal=require("../../component/utilities/modal/Modal.jsx");
var HelloWorld=require("../../component/index/helloWorld/HelloWorld.jsx");

var testButton=document.getElementById("test");
var openAlertBtn=document.getElementById("openAlertBtn");
var openConfirmBtn=document.getElementById("openConfirmBtn");
var openDefaultBtn=document.getElementById("openDefaultBtn");
var investmentListContainer=document.getElementById("investmentListContainer");
//var modalContainer=document.getElementById("modalContainer");

/*
ReactDOM.render(<Dashboard/>,document.getElementById("dashboardContainer"));
ReactDOM.render(<CircleProcessBar percentage={100} />,document.getElementById("circleProcessBarContainer"));*/
ReactDOM.render(<InvestmentList />,document.getElementById("investmentListContainer"));
ReactDOM.render(<HelloWorld />,document.getElementById("helloWorldContainer"));


//装载或者卸载组件
testButton.addEventListener("click",function(){

    if(investmentListContainer.innerHTML){
        ReactDOM.unmountComponentAtNode(investmentListContainer);
    }else {
        ReactDOM.render(< InvestmentList/>,investmentListContainer);
    }

},false)

//打开一个alert框
openAlertBtn.addEventListener("click",function(){
    Modal.alert("this text from alert method");
},false)

//打开一个confirm框
openConfirmBtn.addEventListener("click",function(){
    Modal.confirm("this text from confirm method",function(){alert("你点击了取消按钮")},function(){alert("你点击了确定按钮")});
},false)

//打开一个模态窗口
openDefaultBtn.addEventListener("click",function(){
    Modal.open({
        title:"投资确认",
        content:(
            <div>
                <div><input/>这部分的html结构可以自己定制</div>
                <div><input/>这部分的html结构可以自己定制</div>
                <div><input/>这部分的html结构可以自己定制</div>
            </div>
        ),
        buttons: {
            "btn1": true,
            "btn2": true,
            "btn3": function () {
                alert("你点击了btn3");
                return true;
            }
        }

    })
},false)

