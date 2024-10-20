#!/bin/sh
npm run migration:generate -- dist/db/migrations/test
npm run migration:run
npm run seed
