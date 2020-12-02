const fs = window.fs.promises;
const fileHelper = {
    readFile: (path) => {
        return fs.readFile(path, {encoding: 'utf8'})
    },
    writeFile: (path, content, cb) => {
        return fs.writeFile(path, content, {encoding: 'utf8'}, (err) => {
            if(err) {
                return console.log(err);
            }
            cb && cb()
            console.log("File saved successfully!");
        })
    },
    renameFile: (path, newPath) => {
        return fs.rename(path, newPath)
    },
    deleteFile: (path) => {
        return fs.unlink(path)
    }
}

export default fileHelper