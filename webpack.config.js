const path = require("path")
const { watch } = require("gulp")
const sass = require("sass")
const fs = require("fs");
const isProd = process.env.WEBPACK_MODE === 'production';

let watchPath = "src/*.scss"

const watcher = new watch([watchPath]);

function compileSass(filePath){
    let outPath = isProd
    ? "./build/onegrid.css"
    : "./public/onegrid/onegrid.css"

    sass.render({
        file: path.resolve("./src/index.scss"),
        outputStyle: isProd ? "compressed" : "expanded",        
    }, function (error, result) { 
        if(error)
            console.log(error);        
        else
            fs.writeFile(path.resolve(outPath),result.css,'utf8',(err)=>{
                if(err)
                    console.log(err)
            })
    })
}


watcher.on('change', function (filePath) {
    console.log(`${filePath} was changed`)
    compileSass(filePath);
})

const modules = process.env.WEBPACK_MODE === 'production' ?
    {
        'index.js': {
            input: './src/index.js',
            output: "./build/onegrid.js"
        }
    }
    :
    {
        'index.js': {
            input: './src/index.js',
            output: "./public/onegrid/onegrid.js"
        }
    }


let entry = {}
for (let key in modules) {
    entry[key] = modules[key].input;
}


module.exports = {
    context: path.resolve(__dirname),
    entry,
    output: {
        path: path.resolve(__dirname),
        filename: function (chunkData) {
            return modules[chunkData.chunk.name].output;
        },
        library: "OneGrid",
        libraryTarget: 'umd'
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            }
        ]
    },
    resolve: {
        extensions: ['*', '.js', '.jsx']
    }
}