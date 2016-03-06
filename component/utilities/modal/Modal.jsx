require("./Modal.css");
var React=require("react");
var $=require("jquery");
var classNames=require("classnames");
var pubsub={};
var microEvent=require("../../../lib/microevent.js");
microEvent.mixin(pubsub);

var Modal=React.createClass({
    getInitialState:function(){
      return {
           hide:true
      }
    },
    _closeModal:function(){
        this.setState({
            hide:true
        })
    },
    _sureCallback:function(){
        this._closeModal();
        this.props.sureCallback.apply(null);
    },
    componentDidMount:function(){
        console.log("into didMount");
        var _self=this;
        pubsub.bind("open",function(){
            console.log("into bind open");
            _self.setState({
                hide:false
            });
        });
    },
    render:function() {
        var classnames=classNames({
            hide:this.state.hide,
            modalWrapper:true
        });
        var content=this.props.content;
        return (
            <div className={classnames} >
                <div className="mask" onClick={this._closeModal}></div>
                <div className="modal">
                    <div className="modal-header">{this.props.title}<span className="pull-right close-btn" onClick={this._closeModal}>&times;</span></div>
                    <div className="modal-body">{content}</div>
                    <div className="modal-footer">
                        <button className="sure-btn" onClick={this._sureCallback}>确定</button>
                        <button className="cancle-btn" onClick={this._closeModal}>取消</button>
                    </div>
                </div>
            </div>
        )
    }
});


Modal.open=function(){
    console.log("pubsub:",pubsub.trigger);
    pubsub.trigger("open");
}
module.exports=Modal;