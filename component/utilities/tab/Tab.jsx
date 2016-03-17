require("./Tab.css");
var React=require("react");

var TabPanel=React.createClass({
    render:function(){
        var tabPanels=this.props.tabPanels.map(function(item,index){
            if(index === 0){
                return (
                    <div className="active">
                        {item}
                    </div>)
            }else {
                return (
                    <div >
                        {item}
                    </div>)
            }
        }.bind(this));
        return (
            <div className="tabPanelContainer">
                {tabPanels}
            </div>
        )
    }
});

var TabHeader=React.createClass({
    render:function(){
        var tabHeaders=this.props.titles.map(function(item,index){
            return (
                index === 0 ?
                <li key={index} className="active">{item.title}</li> :
                <li key={index}>{item.title}</li>
            )

        }.bind(this));

        return (
            <ul className="tab-header clearfix">
                {tabHeaders}
            </ul>
        )
    }
});

var Tab=React.createClass({
    render:function(){
        return (
            <div className="tab-container">
                <TabHeader titles={this.props.titles}/>
                <TabPanel tabPanels={this.props.children}/>
            </div>
        )
    }
});

module.exports=Tab;