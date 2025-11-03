const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs-extra');
const path = require('path');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const DATA_FILE = path.join(__dirname, 'articles.json');
let articles = [];
let invertedIndex = {};

// Load preloaded articles
if(fs.existsSync(DATA_FILE)){
    articles = fs.readJsonSync(DATA_FILE);
} else {
    articles = [
        {"id":"1","title":"Breaking News","content":"AI beats human at chess"},
        {"id":"2","title":"Tech Update","content":"New iPhone released today"},
        {"id":"3","title":"Sports News","content":"Local team wins championship"},
        {"id":"4","title":"Weather Alert","content":"Heavy rain expected tomorrow"},
        {"id":"5","title":"Health Tips","content":"Drink water daily for better health"},
        {"id":"6","title":"Politics Today","content":"Government passes new law"},
        {"id":"7","title":"Education Update","content":"New syllabus released for schools"},
        {"id":"8","title":"Entertainment","content":"New movie breaks box office records"},
        {"id":"9","title":"Finance News","content":"Stock market hits new high"},
        {"id":"10","title":"Travel Tips","content":"Top 10 destinations for 2025"},
        {"id":"11","title":"Science","content":"New discovery in space exploration"},
        {"id":"12","title":"Health Alert","content":"Flu season is coming, get vaccinated"},
        {"id":"13","title":"Tech Review","content":"Latest smartphones compared"},
        {"id":"14","title":"Sports Update","content":"Olympics 2025 preparations start"},
        {"id":"15","title":"Weather Forecast","content":"Sunny weekend ahead"}
    ];
    fs.writeJsonSync(DATA_FILE, articles, {spaces:2});
}

// Build inverted index
function buildIndex(){
    invertedIndex = {};
    articles.forEach(article => {
        const tokens = article.content.toLowerCase().split(/\W+/);
        tokens.forEach(token => {
            if(!invertedIndex[token]) invertedIndex[token] = [];
            if(!invertedIndex[token].includes(article.id)) invertedIndex[token].push(article.id);
        });
    });
}
buildIndex();

// Add article
app.post('/articles', (req, res) => {
    const article = req.body;
    if(!article.id) article.id = (articles.length + 1).toString();
    article.date = new Date().toISOString();
    articles.push(article);
    fs.writeJsonSync(DATA_FILE, articles, {spaces:2});
    buildIndex();
    res.json({status:'ok', article});
});

// Get all articles
app.get('/articles', (req, res) => res.json(articles));

// Search
app.get('/search', (req, res) => {
    const query = (req.query.q || '').toLowerCase().trim();
    if (!query) return res.json([]);

    const tokens = query.split(/\s+/);
    let scores = {};  // articleId -> score

    tokens.forEach(token => {
        const ids = invertedIndex[token] || [];
        ids.forEach(id => {
            if (!scores[id]) scores[id] = 0;
            scores[id] += 1;  // +1 score for each matching word
        });
    });

    // Sort by score (higher first), then map to full article
    const results = Object.entries(scores)
        .sort((a, b) => b[1] - a[1])
        .map(([id]) => articles.find(a => a.id === id));

    res.json(results);
});



const PORT = 5000;
app.listen(PORT, ()=>console.log(`Backend running on http://localhost:${PORT}`));
