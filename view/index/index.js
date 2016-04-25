require("./index.css");
require("../../static/css/bootstrap.css");
require("../../static/css/common.css");
var React=require("react");
var ReactDOM=require("react-dom");
var Dashboard=require("../../component/index/dashboard/Dashboard.jsx");
var CircleProcessBar=require("../../component/utilities/circleProcessBar/CircleProcessBar.jsx");
var InvestmentList=require("../../component/index/investmentList/InvestmentList.jsx");
var InformationList=require("../../component/index/informationList/InformationList.jsx");
var EarnSet=require("../../component/index/earnSet/EarnSet.jsx");
var Modal=require("../../component/utilities/modal/Modal.jsx");
var HelloWorld=require("../../component/index/helloWorld/HelloWorld.jsx");
var FilterableProductTable=require("../../component/index/thinkInReact/FilterableProductTable.jsx");
var Tab=require("../../component/utilities/tab/Tab.jsx");
var Carousel=require("../../component/utilities/carousel/Carousel.jsx");
var Pagination=require("../../component/utilities/pagination/pagination.jsx");

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
var earnSetItems=[
    {type:"ttz",yearRate:"8",status:"already_publish"},
    {type:"yyz",yearRate:"9.5",status:"already_full"},
    {type:"jjz",yearRate:"10.5",status:"success"}
    ];
var investmentListHeaders=["项目名称","年化收益率","项目期限","项目金额","投资进度",""];

var informationListTopic={
    imgUrl:"../../static/img/industryInfo-bg.png",
    title:"股市大数据：南京人最爱炒股 苏州股民最阔绰",
    content:"2015年A股波云诡谲，最终以9.41%的涨幅收官，振幅高达71.95%。记者从有关渠道获悉....."
};
var informationListItems=[
    {
        title:"电商下乡大潮加速了农村支付形态的变迁",
        date:"2016-03-29"
    },
    {
        title:"马云、王建林边打嘴仗边赚钱 如今几比几？",
        date:"2016-03-28"
    },
    {
        title:"博鳌互金论坛首次被P2P占领",
        date:"2016-03-27"
    },
    {
        title:"小小农资店日进500万，种植大户们如此疯狂为了啥？",
        date:"2016-03-26"
    }
];


var App=React.createClass({
    render:function(){
        return (
            <div className="nt-carouselContainer">
                <div id="carouselContainer">
                    <Carousel bannerList={bannerList}/>
                </div>
                <div id="dashboardContainer">
                    <Dashboard transactionAmount={16788888888} registeredUserAmount={77734567} />
                </div>
                <div className="card earnSet-bar clearfix">
                    <div className="earnSet-bar-left pull-left">
                        <img src="/static/img/earnSet-ad-img.jpg" alt=""/>
                    </div>
                    <div className="earnSet-bar-right pull-left" >
                        <div className="row clearfix earnSet-header" style={{margin:0}}>
                            <h5 className="col-xs-4 text-center title">天天赚 <span className="subtitle">当日计息，随时退出</span></h5>
                            <h5 className="col-xs-4 text-center title">月月赚 <span className="subtitle">省心省力，坐享其成</span></h5>
                            <h5 className="col-xs-4 text-center title">季季赚 <span className="subtitle">定期理财，稳健收入</span></h5>
                        </div>
                        <div className="row clearfix" id="earnSetContainer" style={{margin:0}}>
                            <EarnSet earnSetItems={earnSetItems}  />
                        </div>
                    </div>
                </div>
                <div className="card investmentList-bar clearfix">
                    <div className="investmentList-bar-left pull-left">
                        <img src="/static/img/investmentList-ad-img.jpg" alt=""/>
                    </div>
                    <div className="investmentList-bar-right pull-left" id="investmentListContainer">
                        <InvestmentList titles={investmentListHeaders}  />
                    </div>
                </div>
                <div className="card informationList-bar clearfix" style={{backgroundColor:"#f1f1f1"}}>
                    <div className="col-xs-5" id="industryInfoContainer">
                        <InformationList  items={informationListItems}  title="行业资讯" topic={informationListTopic} />
                    </div>
                    <div className="col-xs-5 col-xs-offset-2" id="mediaReportContainer">
                        <InformationList  items={informationListItems}  title="媒体报道" topic={informationListTopic} />
                    </div>
                </div>
                {/*<Pagination totalPages={20}/>*/}
            </div>

        )
    }
});

ReactDOM.render(<App />,document.getElementById("appContainer"));






