const path = require('path');
const fs = require('fs');

module.exports = loadGQLFile = (type) => {
    const filePath = path.join(__dirname, '../api', type)
    return fs.readFileSync(filePath, 'utf-8')
}