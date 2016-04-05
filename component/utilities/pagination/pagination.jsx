require("./Pagination.css");
var React=require("react");
var classNames=require("classnames");

var Pagination=React.createClass({
    getInitialState:function(){
        return {
            currPage:1
        }
    },
    _toggle:function(index){
        var currPage=parseInt(index);
        this.setState({
            currPage:currPage
        });
    },
    render:function(){
        var pageBtns=[];
        var currPage=this.state.currPage;
        var totalPages=this.props.totalPages;
        for(var i=4;i>0;i--){
            if(currPage-i > 1){
                i === 4 ?
                pageBtns.push({index:currPage-4,text:"..."}) :
                pageBtns.push({index:currPage-i,text:currPage-i}) ;
            }
        };
        pageBtns.push({index:currPage,text:currPage});
        for(var j=1;j<5;j++){
            if(currPage+j < totalPages){
                j === 4 ?
                pageBtns.push({index:currPage+4,text:"..."}) :
                pageBtns.push({index:currPage+j,text:currPage+j}) ;
            }
        };

        pageBtns[0].index !== 1 && pageBtns.unshift({index:1,text:1});
        pageBtns[pageBtns.length-1].index !== totalPages && pageBtns.push({index:totalPages,text:totalPages});
        var items=pageBtns.map(function(item,index){
            var classes=classNames({
                "nt-pagination-btn":true,
                "active":item.index === currPage
            });
            return (
                <span className={classes}
                      onClick={this._toggle.bind(this,item.index)}>
                    {item.text}
                </span>
            )
        }.bind(this));

        return (
            <div className="text-center">{items}</div>
        )

    }
});

module.exports=Pagination;