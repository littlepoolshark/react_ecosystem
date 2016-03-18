require("./bootstrap.css");
var React=require("react");
var ReactDOM=require("react-dom");
var Dashboard=require("../../component/index/dashboard/Dashboard.jsx");
var CircleProcessBar=require("../../component/utilities/circleProcessBar/CircleProcessBar.jsx");
var InvestmentList=require("../../component/index/investmentList/InvestmentList.jsx");
var Modal=require("../../component/utilities/modal/Modal.jsx");
var HelloWorld=require("../../component/index/helloWorld/HelloWorld.jsx");
var FilterableProductTable=require("../../component/index/thinkInReact/FilterableProductTable.jsx");
var Tab=require("../../component/utilities/tab/Tab.jsx");

var testButton=document.getElementById("test");
var openAlertBtn=document.getElementById("openAlertBtn");
var openConfirmBtn=document.getElementById("openConfirmBtn");
var openDefaultBtn=document.getElementById("openDefaultBtn");
var investmentListContainer=document.getElementById("investmentListContainer");
var filterableProductTableContainer=document.getElementById("filterableProductTableContainer");
//var modalContainer=document.getElementById("modalContainer");


var PRODUCTS = [
    {category: 'Sporting Goods', price: '$49.99', stocked: true, name: 'Football'},
    {category: 'Sporting Goods', price: '$9.99', stocked: true, name: 'Baseball'},
    {category: 'Sporting Goods', price: '$29.99', stocked: false, name: 'Basketball'},
    {category: 'Electronics', price: '$99.99', stocked: true, name: 'iPod Touch'},
    {category: 'Electronics', price: '$399.99', stocked: false, name: 'iPhone 5'},
    {category: 'Electronics', price: '$199.99', stocked: true, name: 'Nexus 7'},
    {category: 'Electronics', price: '$599.99', stocked: true, name: 'galaxy s4'},
    {category: '书籍', price: '$6.99', stocked: true, name: '你不知道的javascript'}
];
var titles=[
    {title:"tabHeader 1"},
    {title:"tabHeader 2",handleClick:function(){return false;}},
    {title:"tabHeader 3"}
]

var Button = require('react-bootstrap/lib/Button');
/*var Tabs=require('react-bootstrap/lib/Tabs');
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
 */
var tabInstance=(
    <Tab titles={titles}>
        <FilterableProductTable products={PRODUCTS} />
        <InvestmentList />
        <div style={{color:'orange'}}>tabPanel3</div>
    </Tab>
);

/*
ReactDOM.render(<Dashboard/>,document.getElementById("dashboardContainer"));
ReactDOM.render(<CircleProcessBar percentage={100} />,document.getElementById("circleProcessBarContainer"));*/
//ReactDOM.render(<InvestmentList />,document.getElementById("investmentListContainer"));
ReactDOM.render(tabInstance,document.getElementById("helloWorldContainer"));
//ReactDOM.render(<FilterableProductTable products={PRODUCTS} />,filterableProductTableContainer);


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
    Modal.alert("atom编辑器工商法规帝国时代");
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
