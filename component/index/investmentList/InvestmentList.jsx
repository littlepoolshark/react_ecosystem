require("./InvestmentList.css");
var React=require("react");
var Lifecycle=require("react-lifecycle");
var $=require("jquery");
var CircleProcessBar=require("../../utilities/circleProcessBar/CircleProcessBar.jsx");
var investmentListAction=require("../../../action/index/investmentListAction.js");
var investmentListStore=require("../../../store/index/investmentListStore.js");


var InvestmentList=React.createClass({
    mixins:[Lifecycle],
    //getDefaultProps:function(){
    //    console.log("into getDefaultProps");
    //},
    getInitialState:function(){
        return {
          items:[]
        }
    },
    //componentWillMount:function(){
    //    console.log("into componentWillMount");
    //},
    componentDidMount:function(){
        investmentListAction.getData();
        investmentListStore.bind("change",this._onChange);
    },
    //componentWillReceiveProps:function(){
    //    console.log("into componentWillReceiveProps");
    //},
    //shouldComponentUpdate:function(){
    //    console.log("into shouldComponentUpdate");
    //    return true;
    //},
    //componentWillUpdate:function(){
    //    console.log("into componentWillUpdate");
    //},
    //componentDidUpdate:function(){
    //    console.log("into componentDidUpdate");
    //},
    _delete:function(id){
        investmentListAction.deleteItem(id);
    },
    _onChange:function(){
        this.setState({
            items:investmentListStore.getAll()
        })
    },
    render:function(){
        console.log("render");
        var _self=this;
        var li_str="";
        li_str=this.state.items.map(function(item,index){
            return (
                <li key={item.id} >
                    <span>{item.id}</span>
                    <span>{item.title}</span>
                    <span>{item.yearRate}%</span>
                    <span>{item.remainAmount}</span>
                    <span>{item.totalAmount}</span>
                    <CircleProcessBar  />
                    <button onClick={_self._delete.bind(this,index)}>删除</button>
                </li>
            )
        });
        return (
            <ul className="investmentList">{li_str}</ul>
        )
    }
});

module.exports=InvestmentList;