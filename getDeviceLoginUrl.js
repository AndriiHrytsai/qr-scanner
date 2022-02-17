import fs from 'fs';
import path from 'path';
import Jimp from 'jimp';
import jsQR from "jsqr";
import { fileExists, isValidURL } from "./helpers.js";

const __dirname = path.resolve();

const getDataFromQRCode = async (bufferOrUrl) => {
  return new Promise(async (resolve, reject) => {
    await Jimp.read(bufferOrUrl, (err, image) => {
      if (err) reject(err.message);
      const qrCodeImageArray = new Uint8ClampedArray(image.bitmap.data.buffer);
      const qrCodeResult = jsQR(
        qrCodeImageArray,
        image.bitmap.width,
        image.bitmap.height
      );
      if (qrCodeResult) {
        resolve(qrCodeResult.data);
      } else {
        reject('QR Code not found！');
      }
    });
  });
};

const getUrlFromImage = async (fileNameOrUrl) => {
  const fileExist = await fileExists(__dirname + fileNameOrUrl);
  const isURL = isValidURL(fileNameOrUrl);
  if (fileExist) {
    const buffer = fs.readFileSync(__dirname + fileNameOrUrl);
    return getDataFromQRCode(buffer);
  } else if (isURL) {
    return getDataFromQRCode(fileNameOrUrl);
  } else {
    return Promise.reject(`File or URL not found! ${fileNameOrUrl}`);
  }
}

export { getUrlFromImage };
