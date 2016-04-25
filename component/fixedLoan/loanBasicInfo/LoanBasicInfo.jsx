require("./LoanBasicInfo.css");

var React=require("react");
var moment=require("moment");

var LoanBasicInfo=React.createClass({
    render:function(){
        var loanObject=this.props.loanObject;
        
        return (
           <div className="row clearfix">
               <div className="col-xs-6">
                   <div className="loanBasicInfo-wrapper">
                       <label  className="loanBasicInfo-subtitle">项目额度：</label>
                       <span className="loanBasicInfo-content">{loanObject.totalAmount}</span>
                   </div>
                   <div className="loanBasicInfo-wrapper">
                       <label  className="loanBasicInfo-subtitle">发布时间：</label>
                       <span className="loanBasicInfo-content">{moment(loanObject.publishTime).format("YYYY-MM-DD HH:mm:ss")}</span>
                   </div>
                   <div className="loanBasicInfo-wrapper">
                       <label  className="loanBasicInfo-subtitle">剩余时间：</label>
                       <span className="loanBasicInfo-content">06天20小时26分30秒</span>
                   </div>
               </div>
               <div className="col-xs-6">
                   <div className="loanBasicInfo-wrapper">
                       <label  className="loanBasicInfo-subtitle">还款方式：</label>
                       <span className="loanBasicInfo-content">按月结息到期还本</span>
                   </div>
                   <div className="loanBasicInfo-wrapper">
                       <label  className="loanBasicInfo-subtitle">起息时间：</label>
                       <span className="loanBasicInfo-content">放款后，第二天计息</span>
                   </div>
                   <div className="loanBasicInfo-wrapper">
                       <label  className="loanBasicInfo-subtitle">保障方式：</label>
                       <span className="loanBasicInfo-content">安全保障、阳光保险</span>
                   </div>
               </div>
           </div>
        )
    }
});

module.exports=LoanBasicInfo;