require("./Tab.css");
var React=require("react");

var TabPanel=React.createClass({
    render:function(){
        var tabPanels=this.props.tabPanels.map(function(item,index){
            if(index+1 === this.props.currIndex){
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
    _toggleTab:function(index){
        this.props.handleToggleTab(index);
    },
    render:function(){
        var tabHeaders=this.props.titles.map(function(item,index){
            return (
                index+1 === this.props.currIndex ?
                <li key={index+1} data-index={index+1} className="active" onClick={this._toggleTab.bind(this,index+1)} >{item.title}</li> :
                <li key={index+1} data-index={index+1} onClick={this._toggleTab.bind(this,index+1)} >{item.title}</li>
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
    getInitialState:function(){
        return {
            currIndex:1
        }
    },
    _handleToggleTab:function(index){
        this.setState({
            currIndex:index
        })
    },
    render:function(){
        return (
            <div className="tab-container">
                <TabHeader
                    titles={this.props.titles}
                    currIndex={this.state.currIndex}
                    handleToggleTab={this._handleToggleTab}
                />
                <TabPanel
                    tabPanels={this.props.children}
                    currIndex={this.state.currIndex}
                />
            </div>
        )
    }
});

module.exports=Tab;