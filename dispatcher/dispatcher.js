var Dispatcher = require('flux').Dispatcher;
var appDispatcher = new Dispatcher();
var $=require("jquery");
var investmentListStore = require('../store/index/investmentListStore.js');

appDispatcher.register( function( payload ) {
    switch( payload.actionName ) {
        case 'investmentList.getData':
            $.ajax({
                url:"/mock/investmentList.json",
                type:"get",
                dataType:"json",
                success:function(rs){
                    investmentListStore.setAll(rs.data);
                    investmentListStore.trigger("change");
                }
            })
            break;
        case 'investmentList.deleteItem':
            investmentListStore.deleteItem(payload.id);
            investmentListStore.trigger("change");
            break;
        default :
            break;
    }
    return true; // Needed for Flux promise resolution
});

module.exports = appDispatcher;
