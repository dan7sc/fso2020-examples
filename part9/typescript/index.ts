import { calculator } from './src/calculator';
import express from 'express';
const app = express();

app.get('/ping', (_req, res) => {
    res.send('pong');
});

app.get('/calculate', (req, res) => {
    const { value1, value2, op } = req.query;

    const a = Number(value1);
    const b = Number(value2);

    const result = calculator(a, b, op);
    res.send(result.toString());
});

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
