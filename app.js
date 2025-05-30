const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const PAIRS = [
  "EURUSD","GBPUSD","AUDUSD","NZDUSD","USDCAD","USDCHF","USDNOK","USDSEK","USDMXN","USDHKD","USDSGD","USDTRY","USDZAR","USDPLN",
  "EURGBP","EURCAD","EURCHF","EURNZD","EURTRY","EURHUF","EURPLN","EURZAR",
  "GBPAUD","GBPCAD","GBPCHF","GBPNZD","GBPSGD","GBPZAR","GBPHKD",
  "AUDNZD","AUDCAD","AUDCHF","AUDSGD",
  "NZDCAD","NZDCHF","NZDSGD",
  "USDJPY","EURJPY","GBPJPY","AUDJPY","NZDJPY","CADJPY","CHFJPY","SGDJPY","ZARJPY",
  "USDMYR","USDTHB","USDIDR","USDCNH",
  "EURAUD","EURSGD","EURMXN",
  "AUDMXN","AUDPLN","AUDNOK",
  "CHFSGD","CHFPLN",
  "XAUUSD","XAGUSD","XAUEUR","XPTUSD","XPDUSD",
  "WTI","OIL","BRENT",
  "BTCUSD","ETHUSD","LTCUSD"
];

const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

const SIGNALS_FILE = path.join(__dirname, 'signals.json');

// Load signals
function loadSignals() {
  if (!fs.existsSync(SIGNALS_FILE)) return [];
  return JSON.parse(fs.readFileSync(SIGNALS_FILE, 'utf8'));
}

// Save signals
function saveSignals(signals) {
  fs.writeFileSync(SIGNALS_FILE, JSON.stringify(signals, null, 2));
}

// Halaman utama
app.get('/', (req, res) => {
  const signals = loadSignals();
  res.render('index', { pairs: PAIRS, signals });
});

// Proses form
app.post('/signal', (req, res) => {
  const { pair, action, price } = req.body;
  if (!pair || !action || !price) {
    return res.redirect('/');
  }
  const signals = loadSignals();
  signals.unshift({
    pair,
    action,
    price,
    time: new Date().toISOString()
  });
  saveSignals(signals.slice(0, 20)); // Simpan max 20 sinyal terakhir
  res.redirect('/');
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
