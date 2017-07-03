


        var path = require('path');

        module.exports = 
        {
            entry: './src/main.js',
            output: 
            {
                path: path.resolve(__dirname, 'out'),
                filename: 'out.bundle.js'
            },
            devServer: 
            {
                contentBase: path.join(__dirname, "out"),
                port: 9000
            }
        };