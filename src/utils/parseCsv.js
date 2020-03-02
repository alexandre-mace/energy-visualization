import fs from 'fs';
import path from 'path';
import csv from 'csv-parser';

const results = [];

fs.createReadStream(path.join(__dirname, '..', 'data', 'production.csv'))
  .pipe(csv())
  .on('data', data => {
      const {'': country, '2017 - 2018 (%) ': useless1, '2000 - 2018 (%/year) ': useless2, ...years}= data;

      return results.push(
      {
          country: data[''],
          years: years
      }
  )})
  .on('end', () => {
    const jsonPath = path.join(__dirname, '..', 'data', 'production.json');

    fs.writeFileSync(jsonPath, JSON.stringify(results));
    // console.log(results);
  });
