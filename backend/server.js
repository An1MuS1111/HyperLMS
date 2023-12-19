const express = require('express')
const cors = require('cors')
const app = express()



app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send("Hello")
})

PORT = 4444;
app.listen(PORT, () => {
    console.log(`Server at http://localhost:${PORT}`);
})