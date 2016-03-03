var MicroEvent = require('../../lib/microevent');

var investmentListStore={
        items:[],
        getAll:function(){
            return this.items;
        },
        setAll:function(data){
            this.items=this.processData(data);
        },
        deleteItem:function(id){
            var currIndex;
            for(var i=0;i<this.items.length;i++){
                if(this.items[i].id === id){
                    currIndex=this.items.indexOf(this.items[i]);
                    this.items.splice(currIndex,1);
                }
            }
        },
        processData:function(data){
            var newData=data;
            if(newData.length){
                for(var i=0;i<newData.length;i++){
                    newData[i].id=i+1;
                    newData[i].yearRate *=100;
                    newData[i].percentage=parseInt((newData[i].totalAmount-newData[i].remainAmount)/newData[i].totalAmount*100);
                }
            }
            return newData;
        }
}
MicroEvent.mixin(investmentListStore);

module.exports=investmentListStore;