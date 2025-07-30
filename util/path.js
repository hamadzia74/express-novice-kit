const path = require("path");

module.exports = path.dirname(require.main.filename); // this will give us the absolute path to the directory that contains the main module (the entry point of the application). In this case, it will be the path to the root directory of the project. This is useful for constructing absolute paths to files and directories in your application. For example, you can use it to construct the path to a file in the views directory or the public directory.
