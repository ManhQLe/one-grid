const path = require("path")
const {watch} = require("gulp")


const sassModules = [{
    input:""
}];
let srcPath = "./src/*.scss"
console.log(srcPath)

const watcher = new watch([srcPath]);

watcher.on('change', function (filePath) {
    console.log(path.resolve(filePath))
    console.log(`File ${filePath} was changed`);
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