import fs from 'fs';
import path from 'path';

import Console from 'src/utils/logger';

export const createFileStream = (
  directory: string,
  fileName: string,
  flag = 'a'
) => {
  const createdPath = path.join(directory, fileName);
  const stream = fs.createWriteStream(createdPath, {
    flags: flag
  });

  return stream;
};

export const readFromFile = <T>(directory: string, fileName: string): T[] => {
  const filePath = path.join(__dirname, '..', '..', directory, fileName);
  const rawData = fs.readFileSync(filePath);
  return JSON.parse(rawData?.toString() || '[]');
};

export const writeErrorToFile = (text: string) => {
  const currentDate = new Date().toLocaleString();
  const dataToWrite = `#Error: <${currentDate}> ${text}`;
  const errorStream = createFileStream(
    path.join(__dirname, '..', 'logs'),
    'error.log'
  );

  errorStream.on('error', (e) => {
    Console.error(e.message);
  });
  errorStream.write(`${dataToWrite}\n`);
};
