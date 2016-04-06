require("./LoanBasicInfo.css");

var React=require("react");

var LoanBasicInfo=React.createClass({
    render:function(){
        return (
           <div className="row clearfix">
               <div className="col-xs-6">
                   <div className="loanBasicInfo-wrapper">
                       <label  className="loanBasicInfo-subtitle">项目额度：</label>
                       <span className="loanBasicInfo-content">10000000</span>
                   </div>
                   <div className="loanBasicInfo-wrapper">
                       <label  className="loanBasicInfo-subtitle">发布时间：</label>
                       <span className="loanBasicInfo-content">2016-04-06 10:02:15</span>
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