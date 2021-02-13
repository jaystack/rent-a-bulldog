// tslint:disable-next-line: no-var-requires
require('dotenv').config();
import express from 'express';
import bodyParser from 'body-parser';

// import { JsonDB } from 'node-json-db';
// import { Config } from 'node-json-db/dist/lib/JsonDBConfig';
import getContent from './utils/contentful';
import cors from 'cors';

export const app: express.Application = express();
const port = 3002;

// FOR LATER USE
// const db = new JsonDB(new Config('bulldogData', true, false, '/'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.get('/bulldogs', async (req: express.Request, res: express.Response) => {
  try {
    const data = await getContent('bulldogs');
    console.log(data);
    res.json(data);
  } catch {
    res.status(500);
  }
});

app.get('/bulldog/:id', async (req: express.Request, res: express.Response) => {
  const id = req.params.id;
  try {
    const data = await getContent('bulldogs', id);
    res.json(data[0]);
  } catch {
    res.status(500);
  }
});

export const listen = () => {
  app.listen(port, () => {
    console.log(`Server running at port ${port}`);
  });
};
