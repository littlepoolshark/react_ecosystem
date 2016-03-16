
var React=require("react");
var ReactDOM=require("react-dom");

//显示分类的表头
var ProductCategoryRow=React.createClass({
  render:function(){
    return (<tr><th colSpan="2">{this.props.category}</th></tr>)
  }
});

//列表每一行
var ProductRow=React.createClass({
  render:function(){
    var name=this.props.product.stocked ?
      this.props.product.name :
      <span style={{color:"red"}}>{this.props.product.name}</span>;

    return (
      <tr>
        <td>{name}</td>
        <td>{this.props.product.price}</td>
      </tr>
    )

  }
});

//整一个产品列表
var ProductTabel=React.createClass({
  render:function(){
    var rows=[];
    var lastCategory=null;
    this.props.products.forEach(function(product){
      if(product.name.indexOf(this.props.filterText) === -1 || (!product.stocked && this.props.inStockOnly)){
        return;
      }
      if(product.category !== lastCategory){
        rows.push(<ProductCategoryRow category={product.category} key={product.category} />)
      }
      rows.push(<ProductRow product={product} key={product.name} />);
      lastCategory=product.category;
    }.bind(this));

    return (
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    )

  }
});

//搜索栏
var SearchBar=React.createClass({
  handleChange:function(){
    this.props.onUserInput(this.refs.filterTextInput.value,this.refs.inStockOnlyInput.checked);
  },
  render:function(){
    return (
      <form>
        <input type="text" placeholder="请输入关键字" value={this.props.filterText} ref="filterTextInput" onChange={this.handleChange}/>
        <p>
          <input type="checkbox" checked={this.props.inStockOnly} ref="inStockOnlyInput" onChange={this.handleChange}/>
          {" "}
          only show products in stock
        </p>
      </form>
    )
  }
});

//整个应用
var FilterableProductTable=React.createClass({
  getInitialState:function(){
    return {
      filterText:"",
      inStockOnly:false
    }
  },
  handleUserInput:function(filterText,inStockOnly){
    this.setState({
      filterText:filterText,
      inStockOnly:inStockOnly
    })
  },
  render:function(){
    return (
      <div style={{width:"500px",margin:"0 auto"}}>
        <SearchBar  filterText={this.state.filterText}  inStockOnly={this.state.inStockOnly} onUserInput={this.handleUserInput}/>
        <ProductTabel products={this.props.products} filterText={this.state.filterText} inStockOnly={this.state.inStockOnly} />
      </div>
    )

  }
});

module.exports=FilterableProductTable;
