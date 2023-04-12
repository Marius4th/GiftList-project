const express = require('express');
const verifyProof = require('../utils/verifyProof');

const port = 1225;

const app = express();
app.use(express.json());

// Hardcode a merkle root here representing the whole nice list
// paste the hex string in here, without the 0x prefix
const MERKLE_ROOT = '8efe0cedafbe56339f340cacca9c49ee3759627dd0088ab055f134e51c0993ff';

app.post('/gift', (req, res) => {
  // grab the parameters from the front-end here
  const body = req.body;
  
  // DONE! Prove that a name is in the list 
  const isInTheList = verifyProof(body.proof, body.name, MERKLE_ROOT);

  if(isInTheList) {
    res.send("You got a toy robot!");
  }
  else {
    res.send("You are not on the list :(");
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});
