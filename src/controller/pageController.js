import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));



export const homePage = (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/index.html'));
};
export const mainPage = (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/home.html'));
};
export const chatPage = (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/chat.html'));
};
