require("./Carousel.css");
var React=require("react");
var classNames=require("classnames");
//var $=require("jquery");

var CarouselItem=React.createClass({
    render:function(){
        var inOrOutClass=classNames({
            "in":this.props.index === this.props.currIndex,//不用直接使用in作为对象关键字，否则在ie8会报错
            out:this.props.index === this.props.prevIndex
        });
        var totalClasses=inOrOutClass ? inOrOutClass+" banner-item" : "banner-item" ;
        return (
            <img
                src={this.props.url}
                className={totalClasses}
                ref="bannerItem"
                />
        )
    }
});

var RightNav=React.createClass({
    _handleClick:function(){
        var currIndex,prevIndex;
        currIndex= this.props.currIndex+1 > this.props.totalLength ? 1 : this.props.currIndex+1 ;
        prevIndex=this.props.currIndex;
        this.props.handleNextToggle(prevIndex,currIndex);
    },
    render:function(){
        return (
            <div className="carousel-nav right">
                <button onClick={this._handleClick}>下一张</button>
            </div>
        )
    }
});

var LeftNav=React.createClass({
    _handleClick:function(){
        var currIndex,prevIndex;
        currIndex=this.props.currIndex-1 < 1 ? this.props.totalLength : this.props.currIndex-1 ;
        prevIndex=this.props.currIndex;
        this.props.handlePrevToggle(prevIndex,currIndex);
    },
    render:function(){
        return (
            <div className="carousel-nav left">
                <button onClick={this._handleClick}>上一张</button>
            </div>
        )
    }
});

var BottomNav=React.createClass({
    _handleClick:function(event){
        var prevIndex=this.props.currIndex;
        var currIndex=this.props.index;
        this.props.handleToggle(prevIndex,currIndex);
    },
    render:function(){
        var activeClass=classNames({
            active: this.props.currIndex === this.props.index
        });
        return (
            <li className={activeClass} onClick={this._handleClick}></li>
        )
    }
});

var Carousel=React.createClass({
    getInitialState:function(){
        return {
            currIndex:1,
            prevIndex:2
        }
    },
    _handleMouseOver:function(){
        this._autoToggle(false);
    },
    _handleMouseOut:function(){
        this._autoToggle(true);
    },
    _autoToggle:function(signal){
        if(signal){
            this.timer=setInterval(function(){
                var prevIndex,currIndex;
                currIndex=this.state.currIndex+1 > this.props.bannerList.length ? 1 : this.state.currIndex+1 ;
                prevIndex=this.state.currIndex;
                this._handleToggle(prevIndex,currIndex);
            }.bind(this),2000);
        }else {
           clearInterval(this.timer)
        }
    },
    _handleToggle:function(prevIndex,currIndex){
        this.setState({
            prevIndex:prevIndex,
            currIndex:currIndex
        })
    },
    render:function(){
        var totalLength=this.props.bannerList.length;

        var carouselItems=this.props.bannerList.map(function(item,index){
            return (
                <CarouselItem
                    key={index}
                    url={item.url}
                    index={index+1}
                    currIndex={this.state.currIndex}
                    prevIndex={this.state.prevIndex}
                    autoToggle={this._autoToggle}
                    />
            )
        }.bind(this));

        var bottomNavItems=this.props.bannerList.map(function(item,index){
            return (
                <BottomNav
                    key={index}
                    currIndex={this.state.currIndex}
                    index={index+1}
                    handleToggle={this._handleToggle}/>
            )
        }.bind(this));
        return (
            <div className="banner-container" onMouseOver={this._handleMouseOver} onMouseOut={this._handleMouseOut} ref="bannerContainer">
                <ul className="carousel-nav bottom clearfix" ref="bottomNavContainer">
                    {bottomNavItems}
                </ul>
                {carouselItems}
                <RightNav
                    currIndex={this.state.currIndex}
                    prevIndex={this.state.prevIndex}
                    handleNextToggle={this._handleToggle}
                    totalLength={totalLength}
                    />
                <LeftNav
                    currIndex={this.state.currIndex}
                    prevIndex={this.state.prevIndex}
                    handlePrevToggle={this._handleToggle}
                    totalLength={totalLength}
                    />
            </div>
        )
    },
    componentDidMount:function(){
        this._autoToggle(true);//启动自动轮播
        var bannerContainer=this.refs.bannerContainer;
        var img=bannerContainer.getElementsByTagName("img")[0];
        var bottomNavContainer=this.refs.bottomNavContainer;
        window.onload=function(){//必须监听等图片加载完成之后才能去获取它的高度，否则，高度为零。到这里我们可以联想到onloan事件和DOMContentLoaded事件的区别
            bannerContainer.style.height=img.height+"px";//设置banner图片容器的高度，以便使得子元素的绝对定位生效。
        };
        bottomNavContainer.style.marginLeft=-(bottomNavContainer.offsetWidth-20)/2+"px";//矫正底部导航条的水平居中


    }
});
module.exports=Carousel;