require("./Tab.css");
var React=require("react");
var classNames=require("classnames");

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
    /*
     * @desc 点击tabHeader,切换tabPanel
     * @param {number} index //tabHeader的索引值
     * @param {function || boolean} handleClick //切换tabPanel之前要执行的操作。返回true，切换tabPanel；否则，阻止切换。
     * @result void
     *
     * @author sam liu
     * @date 2016-03-18
    */
    _toggleTab:function(index,handleClick){
        if(handleClick && !handleClick()){
            return false;
        }else {
            this.props.handleToggleTab(index);
        }

    },
    render:function(){
        var tabHeaders=this.props.titles.map(function(item,index){
            var activeOrNot=classNames({
                active:index+1 === this.props.currIndex
            });
            return (
                <li key={index+1}  className={activeOrNot} onClick={this._toggleTab.bind(this,index+1,item.handleClick)} >{item.title}</li>
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
    /*
     * @desc 改变当前的tabPanel的索引值，重新渲染整个组件树
     * @param {number} index //tabHeader的索引值,对应于tabPanel的索引值
     * @result void
     *
     * @author sam liu
     * @date 2016-03-18
     */
    _handleToggleTab:function(index){
        this.setState({
            currIndex:index
        })
    },
    render:function(){
        return (
            <div className="tab-container">
                {/*测试，这是jsx语法的注释*/}
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