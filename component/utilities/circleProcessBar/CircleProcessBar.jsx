require("./CircleProcessBar.css");
var React=require("react");

var CircleProcessBar=React.createClass({
    getDefaultProps:function(){
        return {
            percentage:50
        }
    },
    propTypes:{
        percentage:function(props, propName, componentName) {
            if (props[propName] < 0 || props[propName] > 100) {
                return new Error('the percentage prop is illegal');
            }
        },
        percentage:React.PropTypes.number

    },
    getInitialState:function(){
        return {
            percentage:0,
            offsetX:5
        }
    },
    tick:function(){
        if(this.props.percentage > this.state.percentage){
            this.setState({
                percentage:this.state.percentage+1,
                offsetX:this.state.offsetX+58
            })
        }else {
            clearInterval(this.timeId);
        }
    },
    componentDidMount:function(){
        this.timeId=setInterval(this.tick,20);
    },
    componentWillUnmount:function(){
        clearInterval(this.timeId);
    },
    render:function(){
        return (
            <span className="circleProcessBar-wrapper" style={{backgroundPosition:-this.state.offsetX+"px 0"}}>{this.state.percentage}%</span>
        )
    }
});

module.exports=CircleProcessBar;