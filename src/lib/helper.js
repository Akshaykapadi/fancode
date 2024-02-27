const fs = require('fs');
const path = require('path');

const fileList = function(dir) {
	return fs.readdirSync(dir).reduce((list, file) => {
		const name = path.join(dir, file);
		const isDir = fs.statSync(name).isDirectory();
		return list.concat(isDir ? fileList(name) : [name]);
	}, []);
};

const getDateFormat = function(date) {
	const dateObj = new Date(date);
    
    // Check if the dateObj is a valid date
    if (isNaN(dateObj.getTime())) {
        throw new Error('Invalid date');
    }

    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, '0');
    const day = String(dateObj.getDate()).padStart(2, '0');
    const hours = String(dateObj.getHours()).padStart(2, '0');
    const minutes = String(dateObj.getMinutes()).padStart(2, '0');
    const seconds = String(dateObj.getSeconds()).padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

module.exports = {
	fileList,
	getDateFormat
};
