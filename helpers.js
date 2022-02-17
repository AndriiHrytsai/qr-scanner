import fs from "fs";

const fileExists = async path => !!(await fs.promises.stat(path).catch(e => false));

const isValidURL = (url) => url.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);

export { fileExists, isValidURL };
