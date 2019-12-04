const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 11119;
app.use(express.static('public'));
app.use(express.static('node_modules'));
app.use(bodyParser.json());

app.get('/api/getIoc', (req, res) => res.send({pa: random_boolean = Math.random() >= 0.5, pb: random_boolean = Math.random() >= 0.5, pc: random_boolean = Math.random() >= 0.5}));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));