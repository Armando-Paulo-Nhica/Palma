// htmlLoader.js
const fs = require('fs');
const path = require('path');

function loadHTMLContent(filePath, selector, callback) {
  const content = fs.readFileSync(filePath, 'utf-8');
  callback(selector, content);
}

module.exports = {
  loadHTMLContent,
};
