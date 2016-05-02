require("./Table.css");
var React=require("react");

var TableHeader=React.createClass({
    render:function(){
        var ths=this.props.headers.map(function(item,index){
            return (<th>{item}</th>)
        }.bind(this));
        return (
            <thead className="nt-table-header">
                <tr>{ths}</tr>
            </thead>
        )
    }
});

var TableRow=React.createClass({
    render:function(){
        var tds=[];
        for(var key in this.props.rowObject){
            tds.push(this.props.rowObject[key]);
        }
        var row=tds.map(function(item,index){
            return (
                <td>{item}</td>
            )
        });
        return (
            <tr>
                {row}
            </tr>
        )
    }
});

var TableBody=React.createClass({
    render:function(){
        var rows=this.props.rows.map(function(item,index){
            return (
                <TableRow rowObject={item}/>
            )
        });
        return (
            <tbody className="nt-table-body">
                {rows}
            </tbody>
        )
    }
});

var Table=React.createClass({
    render:function(){
        return (
            <table className="nt-table">
                <TableHeader headers={this.props.headers}/>
                <TableBody rows={this.props.rows}/>
            </table>
        )
    }
});

module.exports=Table;

