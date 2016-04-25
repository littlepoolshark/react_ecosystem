require("./InvestmentList.css");
var React=require("react");

var $=require("jquery");
var classNames=require("classnames");
var moment=require("moment");
var CircleProcessBar=require("../../utilities/circleProcessBar/CircleProcessBar.jsx");
var investmentListAction=require("../../../action/index/investmentListAction.js");
var investmentListStore=require("../../../store/index/investmentListStore.js");

var InvestmentListHeader=React.createClass({

    render:function(){
        var titles=this.props.titles.map(function(item,indexe){
                return(
                    <th>{item}</th>
                )
        });
        return (
            <thead>
                <tr>
                    {titles}
                </tr>
            </thead>
        )
    }
});

var InvestmentButton=React.createClass({
    render:function(){
        var buttonClasses="nt-button sm",
            buttonText="立即抢购";
        switch(this.props.status){
            case "bidding":
                buttonClasses += " default";
                buttonText="立即抢购";
                break;
            case "full":
            case "deal":
            case "releasing":
                buttonClasses += " disabled";
                buttonText="已售罄";
                break;
            case "prepublish":
                buttonClasses += " disabled";
                buttonText="预发布" + moment(this.props.publishTime).format("HH:mm");
                break;
            default:
                break;
        }

        return (
            <button className={buttonClasses}>{buttonText}</button>
        )
    }
});

var InvestmentList=React.createClass({
    _getDataFromStore:function(){
        return {
            items:investmentListStore.getAll()
        }
    },
    getInitialState:function(){
        return this._getDataFromStore()
    },
    _onChange:function(){
        this.setState(this._getDataFromStore())
    },
    render:function(){

        var _self=this;
        var trs="";
        trs=this.state.items.map(function(item,index){
            return (
                <tr key={item.id} >
                    <td>{item.title}</td>
                    <td className="investment-yearRate">{item.yearRate}%</td>
                    <td>{item.remainAmount}</td>
                    <td>{item.totalAmount}</td>
                    <td><CircleProcessBar  percentage={item.percentage}/></td>
                    <td><InvestmentButton status={item.status} publishTime={item.publishTime && item.publishTime}/></td>
                </tr>
            )
        });
        return (
            <table>
                <InvestmentListHeader titles={this.props.titles}/>
                <tbody>
                {trs}
                </tbody>
            </table>
        )
    },
    componentDidMount:function(){
        investmentListStore.bind("change",this._onChange);
        investmentListAction.getData();
    }
});

module.exports=InvestmentList;