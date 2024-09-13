const http = require('http');
const dotenv = require('dotenv');

const mongoose = require('mongoose');

dotenv.config({ path: './config.env' });

const app = require('./app');

const database = process.env.DATABASE.replace('<db_password>', process.env.DATABASE_PASSWORD);

mongoose.connect(database, {}).then(() => console.log('Database has successfully connected!'));

const PORT = process.env.PORT || 8000;

const server = http.createServer(app);

server.listen(PORT, () => console.log(`Listening on port ${PORT}...`));
