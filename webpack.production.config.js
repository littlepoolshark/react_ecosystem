var path=require("path");
var webpack=require("webpack");
var node_modules=path.resolve(__dirname,"node_modules");
var pathToReact=path.resolve(node_modules,"react/dist/react.min.js");
var pathToReactDOM=path.resolve(node_modules,"react-dom/dist/react-dom.min.js");
module.exports={
    //entry:[path.resolve(__dirname,"app/main.js")],
    entry:{
      app:path.resolve(__dirname,"app/main.js"),
      mobile:path.resolve(__dirname,"app/mobile.js"),
      vendors:["react"]
    },
    //resolve:{
    //    alias:{
    //        "react":pathToReact,//每当“react”在代码中被引入，它会使用压缩后的react.min.js，而不是使用默认的react.js
    //        "react-dom":pathToReactDOM
    //    }
    //},
    output:{
        path:path.resolve(__dirname,"dist"),
        filename:"[name].js"
    },
    module:{
        loaders:[
            {
                test:/\.jsx$/,
                loader:"babel-loader",
                "query":{presets:["react"]},
            },
            {
                test:/\.js$/,
                loader:"babel-loader",
                "query":{presets:["react"]},
                exclude:[node_modules]
            },
            {
                test:/\.css$/,
                loader:"style-loader!css-loader"
            },
            {
                test:/\.scss$/,
                loader:"style-loader!css-loader!sass-loader"
            },
            {
                test:/\.(png|jpg)$/,
                loader:"url?limit=25000"
            }
        ],
        //noParse:[pathToReact,pathToReactDOM]//每当webpack尝试去解析那个压缩后的文件，我们阻止它，因为这不必要
        plugins:[new webpack.optimize.CommonsChunkPlugin("vendors","vendors.js")]
    }
}