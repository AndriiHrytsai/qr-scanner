import { getCodeFromImage } from './getDeviceLoginCode.js';
import { getUrlFromImage } from './getDeviceLoginUrl.js';

const imgUrl = 'https://i.postimg.cc/y6GMLR0x/test.jpg';
const fileName = '/test.jpeg';

const main = async (fileNameOrUrl) => {
  return await getUrlFromImage(fileNameOrUrl) || getCodeFromImage(fileNameOrUrl);
}

main(fileName).then(console.log).catch(console.log);
main(imgUrl).then(console.log).catch(console.log);
