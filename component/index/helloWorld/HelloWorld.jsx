"use strict";
var React=require("react");
var Lifecycle=require("react-lifecycle");
var HelloWorld=React.createClass({
    mixin:[Lifecycle],
    render:function(){
        console.log("render");
        return (
            <div>hello world</div>
        )
    }
});

module.exports=HelloWorld;