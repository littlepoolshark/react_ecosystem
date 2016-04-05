var path=require("path");
var node_modules=path.resolve(__dirname,"node_modules");
var pathToReact=path.resolve(node_modules,"react/dist/react.min.js");
var pathToReactDOM=path.resolve(node_modules,"react-dom/dist/react-dom.min.js");
module.exports={
    //entry:['webpack/hot/dev-server','webpack-dev-server/client?http://localhost:8080',path.resolve(__dirname,"view/index/index.js")],//对应要运行的命令是：npm run dev
    //entry:[path.resolve(__dirname,"view/index/index.js")],//对应要运行的命令是：webpack(一次性的编译)
    entry:{//对应要运行的命令是：webpack-dev-sever --inline --hot
        index:['webpack/hot/only-dev-server','webpack-dev-server/client?http://localhost:8080',path.resolve(__dirname,"view/index/index.js")],
        fixedLoan:['webpack/hot/only-dev-server','webpack-dev-server/client?http://localhost:8080',path.resolve(__dirname,"view/fixedLoan/fixedLoan.js")]
    },
    //entry:['webpack-dev-server/client?http://localhost:8080',path.resolve(__dirname,"view/index/index.js")],//对应要运行的命令是：webpack-dev-server --inline
   /* resolve:{
        alias:{
            "react":pathToReact,//每当“react”在代码中被引入，它会使用压缩后的react.min.js，而不是使用默认的react.js
            "react-dom":pathToReactDOM
        }
    },*/
    output:{
        path:path.resolve(__dirname,"build"),
        filename:"[name].bundle.js"
    },
    module:{
        loaders:[
            {
                test:/\.jsx$/,
                loader:"babel-loader",
                "query":{presets:["react","es2015"]},
            },
            {
                test:/\.js$/,
                loader:"babel-loader",
                "query":{presets:["react","es2015"]}
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
        noParse:[pathToReact,pathToReactDOM]//每当webpack尝试去解析那个压缩后的文件，我们阻止它，因为这不必要
    },
    watch: true,
    devServer:{
        contentBase:'./'
    }
}