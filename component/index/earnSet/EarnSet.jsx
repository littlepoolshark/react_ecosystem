require("./EarnSet.css");
var React=require("react");
var classNames=require("classnames");

var EarnSetButton=React.createClass({
    _jump:function(){
        window.location.href="/view/fixedLoan/fixedLoan.html";
    },
    render:function(){
        var buttonClass="",
            buttonText="";
        switch (this.props.status){
            case "already_full":
            case "success":
            case "null":
                this.props.type === "ttz" ? buttonText="预约" : buttonText= "已结束" ;
                this.props.type === "ttz" ? buttonClass="default" : buttonClass= "disabled" ;
                break;
            case "pre_publish" :
                this.props.type === "ttz" ? buttonText="预约" : buttonText= "预发布" ;
                this.props.type === "ttz" ? buttonClass="default" : buttonClass= "disabled" ;
                break;
            case "already_publish" :
                buttonText="立即抢购";
                buttonClass= "default";
                break;
            default:
                break;
        };

        return (
            <div className="earnSet-footer text-center">
                <a className={classNames(["nt-button","lg"],{"default": buttonClass === "default","disabled":buttonClass === "disabled"})}
                    href="/view/fixedLoan/fixedLoan.html" target="_blank">
                    {buttonText}
                </a>
            </div>
        )
    }
});

var EarnSetBody=React.createClass({
    render:function(){
        var classes=classNames({
            "earnSet-body-tag":true,
            "dailyEarn":this.props.type === "dailyEarn",
            "monthlyEarn":this.props.type === "monthlyEarn",
            "quarterlyEarn":this.props.type === "quarterlyEarn"
        });
        return (
            <div className="earnSet-body text-center">
                <h5 className="yearRate">{this.props.yearRate}<span className="unit">%</span></h5>
                <h6 className="subtitle">年化收益率</h6>
                <i className={classes}></i>
            </div>
        )
    }
});

var EarnSet=React.createClass({
    render:function(){
        var earnSetItems=this.props.earnSetItems.map(function(item,index){
            return(
                <div className="col-xs-4">
                    <EarnSetBody type={item.type} yearRate={item.yearRate} />
                    <EarnSetButton type={item.type} status={item.status}/>
                </div>
            )
        }.bind(this));
        return (
            <div className="row">
                {earnSetItems}
            </div>
        )
    }
});

module.exports=EarnSet;