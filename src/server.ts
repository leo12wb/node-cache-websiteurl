const express = require('express');
const bodyParser = require('body-parser');
import { Request, Response } from 'express';

require('dotenv').config()

import { Caches } from './cache/cache.service';

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())

app.get('/', (req: Request, res: Response) => {
  const c = new Caches()
  c.actionCache(req,res)
});

module.exports = app

