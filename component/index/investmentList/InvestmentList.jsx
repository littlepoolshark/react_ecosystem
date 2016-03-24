require("./InvestmentList.css");
var React=require("react");

var $=require("jquery");
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


var InvestmentList=React.createClass({

    getInitialState:function(){
        return {
          items:[]
        }
    },
    componentDidMount:function(){
        investmentListAction.getData();
        investmentListStore.bind("change",this._onChange);
    },
    _delete:function(id){
        investmentListAction.deleteItem(id);
    },
    _onChange:function(){
        this.setState({
            items:investmentListStore.getAll()
        })
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
                    <td><button className="nt-button default sm">立即抢购</button></td>
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
    }
});

module.exports=InvestmentList;