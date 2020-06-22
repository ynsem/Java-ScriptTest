import fs from 'fs';
import path from 'path';

const parse = (invoicesPath) => {
  const data = fs.readFileSync(
    path.resolve(process.cwd(), '__tests__/fixtures/', invoicesPath),
    'utf8',
  );

  return JSON.parse(data);
};

export default parse;
