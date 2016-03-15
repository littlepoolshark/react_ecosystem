require("./bootstrap.css");
var React=require("react");
var ReactDOM=require("react-dom");
var Dashboard=require("../../component/index/dashboard/Dashboard.jsx");
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

var Button = require('react-bootstrap/lib/Button');
var Tabs=require('react-bootstrap/lib/Tabs');
var Tab=require('react-bootstrap/lib/Tab');
var tabsInstance = (
    <Tabs defaultActiveKey={2}>
      <Tab eventKey={1} title="Tab 1">
          <div>line1</div>
          <div>line2</div>
          <div>line3</div>
          <div>line4</div>
      </Tab>
      <Tab eventKey={2} title="Tab 2"><CircleProcessBar percentage={60}/></Tab>
      <Tab eventKey={3} title="Tab 3">Tab 3 content</Tab>
    </Tabs>
  );



/*
ReactDOM.render(<Dashboard/>,document.getElementById("dashboardContainer"));
ReactDOM.render(<CircleProcessBar percentage={100} />,document.getElementById("circleProcessBarContainer"));*/
ReactDOM.render(<InvestmentList />,document.getElementById("investmentListContainer"));
ReactDOM.render(tabsInstance,document.getElementById("helloWorldContainer"));


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
    Modal.alert("atom编辑器即使酷帅！fasd");
},false)

//打开一个confirm框
openConfirmBtn.addEventListener("click",function(){
    Modal.confirm("你确定要删除这条记录嘛？",function(){alert("你点击了取消按钮");return true;},function(){alert("你点击了确定按钮");return true;});
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
},false);
