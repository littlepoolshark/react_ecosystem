require("../../static/css/bootstrap.grid.css");
require("../../static/css/utilities.css");
require("./fixedLoan.css");
require("../../static/css/common.css");

var React=require("react");
var ReactDOM=require("react-dom");

var fixedLoanAction=require("../../action/fixedLoan/fixedLoanAction.js");
var fixedLoanStore=require("../../store/fixedLoan/fixedLoanStore.js");

var Tab=require("../../component/utilities/tab/Tab.jsx");
var LoanHeader=require("../../component/fixedLoan/loanHeader/LoanHeader.jsx");
var LoanSummary=require("../../component/fixedLoan/loanSummary/LoanSummary.jsx");
var LoanBasicInfo=require("../../component/fixedLoan/loanBasicInfo/LoanBasicInfo.jsx");
var LoanProgressBar=require("../../component/fixedLoan/loanProgressBar/LoanProgressBar.jsx");
var LoanPurchaseZone=require("../../component/fixedLoan/loanPurchaseZone/LoanPurchaseZone.jsx");
var Table=require("../../component/utilities/table/Table.jsx");


var App=React.createClass({
    _getFixedLoanState:function(){
        return {
            loanObject:fixedLoanStore.getLoanObject()
        }
    },
    getInitialState:function(){
        return this._getFixedLoanState();
    },
    render:function(){
        var loanObject=this.state.loanObject;
        return (
            <div className="container">
                <div className="card">
                    <LoanHeader loanObject={loanObject}/>
                    <div className="row clearfix">
                        <div className="col-xs-7">
                            <LoanSummary loanObject={loanObject} />
                            <div className="halvingLine"></div>
                            <LoanBasicInfo loanObject={loanObject} />
                            <LoanProgressBar loanObject={loanObject} />
                        </div>
                        <div className="col-xs-4 col-xs-offset-1">
                            <LoanPurchaseZone loanObject={loanObject}/>
                        </div>
                    </div>
                </div>

                <div className="card">
                    <Tab titles={
                                  [{index:1,title:"项目信息"},
                                  {index:2,title:"担保信息",beforeToggle:function(){return true;}},
                                  {index:3,title:"证件资料"},
                                  {index:4,title:"交易记录"},
                                  {index:5,title:"还款记录"}]
                                  }
                    >
                        <div>项目信息</div>
                        <div>担保信息</div>
                        <div>证件资料</div>
                        <Table
                            headers={["序号","购买人","购买金额","购买时间"]}
                            rows={[
                                {
                                    index:1,
                                    userName:"***",
                                    Amount:10000,
                                    time:"2016-05-03"
                                },
                                {
                                    index:2,
                                    userName:"***",
                                    Amount:10000,
                                    time:"2016-05-03"
                                }
                            ]}
                            />
                        <Table
                            headers={["序号","购买人","购买金额","购买时间"]}
                            rows={[
                                {
                                    index:1,
                                    userName:"***",
                                    Amount:10000,
                                    time:"2016-05-03"
                                },
                                {
                                    index:2,
                                    userName:"***",
                                    Amount:10000,
                                    time:"2016-05-03"
                                }
                            ]}
                        />
                    </Tab>
                </div>
            </div>
        )
    },
    // 注意，发送action的代码必须放在事件系统的bind方法后面，
    // 否则调用trigger的时候，会找不到这个事件对应的事件处理函数
    componentDidMount:function(){

        fixedLoanStore.bind("fixedLoan_change",function(){
            this.setState(this._getFixedLoanState());
        }.bind(this));

        fixedLoanAction.getData();
    }
});


ReactDOM.render(<App />,document.getElementById("appContainer"));