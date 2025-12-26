const express = require('express');
const fs = require('fs');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static('public')); // serve index.html e assets

const DB_FILE = './notizie.json';

// Legge le notizie
app.get('/api/notizie', (req, res) => {
  const data = JSON.parse(fs.readFileSync(DB_FILE));
  res.json(data);
});

// Aggiunge una notizia
app.post('/api/notizie', (req, res) => {
  const data = JSON.parse(fs.readFileSync(DB_FILE));
  data.push(req.body);
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
  res.json({status:'ok'});
});

// Modifica una notizia
app.put('/api/notizie/:id', (req, res) => {
  const data = JSON.parse(fs.readFileSync(DB_FILE));
  const id = parseInt(req.params.id);
  if(data[id]){
    data[id] = req.body;
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
    res.json({status:'ok'});
  } else res.status(404).json({error:'notizia non trovata'});
});

// Elimina una notizia
app.delete('/api/notizie/:id', (req, res) => {
  const data = JSON.parse(fs.readFileSync(DB_FILE));
  const id = parseInt(req.params.id);
  if(data[id]){
    data.splice(id, 1);
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
    res.json({status:'ok'});
  } else res.status(404).json({error:'notizia non trovata'});
});

app.listen(PORT, () => console.log(`Server avviato su http://localhost:${PORT}`));
