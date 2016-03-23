require("./index.css");
require("../../static/css/bootstrap.css");
var React=require("react");
var ReactDOM=require("react-dom");
var Dashboard=require("../../component/index/dashboard/Dashboard.jsx");
var CircleProcessBar=require("../../component/utilities/circleProcessBar/CircleProcessBar.jsx");
var InvestmentList=require("../../component/index/investmentList/InvestmentList.jsx");
var Modal=require("../../component/utilities/modal/Modal.jsx");
var HelloWorld=require("../../component/index/helloWorld/HelloWorld.jsx");
var FilterableProductTable=require("../../component/index/thinkInReact/FilterableProductTable.jsx");
var Tab=require("../../component/utilities/tab/Tab.jsx");
var Carousel=require("../../component/utilities/carousel/Carousel.jsx");


var testButton=document.getElementById("test");
var openAlertBtn=document.getElementById("openAlertBtn");
var openConfirmBtn=document.getElementById("openConfirmBtn");
var openDefaultBtn=document.getElementById("openDefaultBtn");
var investmentListContainer=document.getElementById("investmentListContainer");
var filterableProductTableContainer=document.getElementById("filterableProductTableContainer");
var carouselContainer=document.getElementById("carouselContainer");
var dashboardContainer=document.getElementById("dashboardContainer");


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
    {title:"tabHeader 2",beforeToggle:function(){return true;}},
    {title:"tabHeader 3"}
];
var bannerList=[
    {url:"../../static/img/banner1.jpg",index:1},
    {url:"../../static/img/banner2.jpg",index:2},
    {url:"../../static/img/banner3.jpg",index:3}
];
var investmentListHeaders=["项目名称","年化收益率","项目期限","项目金额","投资进度",""];



ReactDOM.render(<Carousel bannerList={bannerList}/>,document.getElementById("carouselContainer"));
ReactDOM.render(<Dashboard transactionAmount={16788888888} registeredUserAmount={77734567} />,dashboardContainer);
ReactDOM.render(<InvestmentList titles={investmentListHeaders}  />,investmentListContainer);






