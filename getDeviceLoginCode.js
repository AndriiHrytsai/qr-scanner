import fs from 'fs';
import nodeFetch from "node-fetch";
import path from 'path';
import Tesseract from 'tesseract.js';
import { fileExists, isValidURL } from "./helpers.js";

const __dirname = path.resolve();

const readCodeFromImage = (buffer, lang) => {
  return new Promise(async (resolve, reject) => {
    Tesseract.recognize(
      buffer,
      lang,
    ).then(({data: {text}}) => {
      text = text.split("\n");
      const result = text.find(word => /^[A-Z]{4}[-][A-Z]{4}$/.test(word));
      if (result) {
        resolve(result);
      } else {
        reject('Code not found！');
      }
    });
  });
};

const getCodeFromImage = async (fileNameOrUrl) => {
      const fileExist = await fileExists(__dirname + fileNameOrUrl);
      const isURL = isValidURL(fileNameOrUrl);
      if (fileExist) {
        const buffer = fs.readFileSync(__dirname + fileNameOrUrl);
        return readCodeFromImage(buffer, 'eng');
      } else if (isURL) {
        return nodeFetch(fileNameOrUrl).then(res => res.buffer()).then(buffer => {
          return readCodeFromImage(buffer, 'eng');
        });
      } else {
        return Promise.reject(`File or URL not found! ${fileNameOrUrl}`);
      }
};

export { getCodeFromImage };
