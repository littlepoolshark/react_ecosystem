require("./Tab.css");
var React=require("react");
var classNames=require("classnames");

var TabPanel=React.createClass({
    render:function(){
        var activeClass=classNames({
            active:this.props.activeOrNot

        });
        var totalClasses=activeClass ? activeClass+" tab-panel" : "tab-panel" ;//去掉空格
        return (
            <div className={totalClasses}>{this.props.children}</div>
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

        var activeClass=classNames({
            active:this.props.activeOrNot
        });
        var totalClasses=activeClass ? activeClass+" tab-header" : "tab-header"  ;
        return (
            <li className={totalClasses} onClick={this._toggleTab.bind(this,this.props.index,this.props.beforeToggle)} >{this.props.title}</li>
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
        var tabHeaders=this.props.titles.map(function(item,index){
            return (
                <TabHeader
                    key={index+1}
                    activeOrNot={this.state.currIndex === index+1}
                    title={item.title}
                    handleToggleTab={this._handleToggleTab}
                    index={index+1}
                    beforeToggle={item.beforeToggle}
                    />
            )
        }.bind(this));

        var tabPanels=this.props.children.map(function(item,index){
            return (
                <TabPanel
                    key={index+1}
                    activeOrNot={this.state.currIndex === index+1}
                    >
                    {item}
                </TabPanel>
            )
        }.bind(this));
        return (
            <div className="tab-container">
                {/*测试，这是jsx语法的注释*/}
                <ul className="tab-header-container clearfix">
                    {tabHeaders}
                </ul>
               <div className="tab-panel-container">
                   {tabPanels}
               </div>
            </div>
        )
    }
});

module.exports=Tab;