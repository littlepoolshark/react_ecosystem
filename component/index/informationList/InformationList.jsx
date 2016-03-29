require("./InformationList.css");
var React=require("react");
var classNames=require("classnames");

var InformationListHeader=React.createClass({
    render:function(){
        return (
            <h5 className="informationList-header">
                {this.props.title}
                <a href="###" className="pull-right">更多</a>
            </h5>

            )
    }
});

var InformationListTopic=React.createClass({
    render:function(){
        return (
            <div className="informationList-topic row clearfix">
                <div className="col-xs-5"><img src={this.props.topic.imgUrl} alt=""/></div>
                <div className="col-xs-7">
                    <h4 className="title">{this.props.topic.title}</h4>
                    <h6 className="content">{this.props.topic.content}</h6>
                </div>
            </div>
        )
    }
});

var InformationListItem=React.createClass({
    render:function(){
        return (
            <li>
                <a href="###">
                    {this.props.item.title}
                    <span className="pull-right">{this.props.item.date}</span>
                </a>
            </li>
        )
    }
});

var InformationList=React.createClass({
    render:function(){
        var items=this.props.items.map(function(item,index){
            return(
              <InformationListItem item={item}/>
            )
        }.bind(this));
        return (
            <div>
                <InformationListHeader title={this.props.title} />
                <InformationListTopic topic={this.props.topic}/>
                <ul className="informationListBody">
                    {items}
                </ul>
            </div>

        )
    }
});

module.exports=InformationList;