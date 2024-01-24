const express = require('express');
const app = express();
const path = require('path');
const port = 3000;
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', './public/views');

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    // Render the 'index.html' file from the 'public/views' directory
    res.sendFile(path.join(__dirname, 'public', 'views', 'home','index.html'));
  });

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
