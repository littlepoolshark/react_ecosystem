require("./Modal.css");
var React=require("react");
var ReactDOM=require("react-dom");
var $=require("jquery");
var classNames=require("classnames");
var Lifecycle=require("react-lifecycle");

var pubsub={};
var modalContainer=null;
//var this.props=null;
var microEvent=require("../../../lib/microevent.js");
microEvent.mixin(pubsub); //发布者-订阅者模式

var Modal=React.createClass({
    mixins:[Lifecycle],
    getDefaultProps:function(){
        return {
            type:"default",
            title:"",
            content:(
                <div>这是一个模态窗口！！</div>
            ),
            buttons:{
                "按钮1":function(){
                    alert("你点击了按钮1！！");
                    return true;
                },
                "按钮2":function(){
                    alert("你点击了按钮2！！");
                    return true;
                }
            }
        }
    },
    getInitialState:function(){
      return {
           hide:true
      }
    },
    _closeModal:function(){
        pubsub.trigger("modal.close");
    },
    _openModal:function(){
        pubsub.trigger("modal.open");
    },

    /*
     * @desc 根据配置项来生成modal框
     * @param {object} options 配置项对象
     * @param {string} options.title  //modal框的header部分的title
     * @param {string || ReactElement} options.content //modal框的body的内容部分
     * @param {string || ReactElement} options.buttons //modal框的footer部分的按钮组
     * @param {string || int} options.width //modal框的宽度，默认值为500
     * @param {string || int} options.top //modal框的距离浏览器顶部的距离，默认值为200
     *
     * @author sam liu
     * @date 2016-03-08
     */
    _createModal:function(){

        var style={
            width:this.props.width || 500,
            top:this.props.top || 100
        };
        var title,content,buttons;

        if (typeof style.width === 'number' || style.width.indexOf('px') > 0) {
            style.width = parseInt(style.width);
            style.marginLeft = 0 - style.width / 2;
        } else if (style.width.indexOf('%') > 0) {
            style.marginLeft = (0 - parseInt(style.width) / 2) + '%';
        }

        switch(this.props.type){
            case "default":
                title=this.props.title || "这是一个模态窗口" ;
                break;
            case "alert":
                title=this.props.title || "这是一个大幅度alert框";
                break;
            case "confirm":
                title=this.props.title || "这是一个confirm框";
                break;
            default:
                break;
        };

        content=this.props.content;

        buttons=Object.keys(this.props.buttons).map(function(item,index){

            var func=this.props.buttons[item];
            var buttonClassName=classNames({
                sureBtn: item === "确定" ? true : false ,
                cancleBtn: item === "取消" ? true : false ,
                defaultBtn : item !== "确定" && item !== "取消" ? true : false
            })
            var handler=function(){
                if(func === true){
                    this._closeModal();
                }else {
                   if(func()){
                       this._closeModal();
                   }
                }
            }.bind(this);

            return (
                <button key={index} onClick={handler} className={buttonClassName}>{item}</button>
            )
        }.bind(this));


        return (
            <div className="modal" style={style}>
                <div className="modal-header">{title}<span className="pull-right close-btn" onClick={this._closeModal}>&times;</span></div>
                <div className="modal-body">{content}</div>
                <div className="modal-footer">
                    {buttons}
                </div>
            </div>
        )

    },
    componentDidMount:function(){

        pubsub.bind("modal.init",function(options){
            ReactDOM.render(<Modal {...options}/>,modalContainer);
            this.setState({
                hide:false
            })
        }.bind(this));

        pubsub.bind("modal.open",function(){
            this.setState({
                hide:false
            });
        }.bind(this));

        pubsub.bind("modal.close",function(){
            this.setState({
                hide:true
            });
        }.bind(this));
    },
    render:function() {
        console.log("render");
        var classnames=classNames({
            hide:this.state.hide,
            modalWrapper:true
        });

        return (
            <div className={classnames} >
                <div className="mask" onClick={this._closeModal} ></div>
                {this._createModal()}
            </div>
        )
    }
});

//提供给外部使用的接口
Modal.open=function(options){
    options.type="default";
    if(!modalContainer){
        createContainer();
    }
    pubsub.trigger("modal.init",options);
};
Modal.close=function(){
    pubsub.trigger("modal.close");
};
Modal.alert=function(msg){
    var options={
        type:"alert",
        content:msg,
        buttons:{
            "确定":function(){
                return true;
            }
        }
    };
    if(!modalContainer){
        createContainer();
    }
    pubsub.trigger("modal.init",options);
};
Modal.confirm=function(msg,oncancle,onOk){
    var options={
        type:"confirm",
        content:msg,
        buttons:{
            "取消":oncancle,
            "确定":onOk
        }
    };
    if(!modalContainer){
        createContainer();
    }
    pubsub.trigger("modal.init",options);
}

function createContainer(){
    modalContainer=document.createElement("div");
    document.body.appendChild(modalContainer);
    ReactDOM.render(<Modal />,modalContainer);
}

module.exports=Modal;