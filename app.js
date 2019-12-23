const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 11119;
app.use(express.static('public'));
app.use(express.static('node_modules'));
app.use(bodyParser.json());


let currTime = new Date().getUTCMilliseconds();
let j = {};
j["pa"] = {}
j["pb"] = {}
j["pc"] = {}
for(i=0; i<10; i++){
    // j[currTime+i] = {pa: random_boolean = Math.random() >= 0.5, pb: random_boolean = Math.random() >= 0.5, pc: random_boolean = Math.random() >= 0.5}
    let t = currTime + i;
    j["pa"][t] = random_boolean = Math.random() >= 0.5;
    j["pb"][t] = random_boolean = Math.random()>= 0.5;
    j["pc"][t] = random_boolean = Math.random() >= 0.5;
}
// let arr = {pa: random_boolean = Math.random() >= 0.5, pb: random_boolean = Math.random() >= 0.5, pc: random_boolean = Math.random() >= 0.5}
app.get('/api/getIoc', (req, res) => res.send(j));

app.get('/api/startnewofflinesession', (req, res) => res.send("startnewofflinesession success"));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));