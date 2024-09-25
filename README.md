# Run migration in docker

`npm run migration:generate -- dist/db/migrations/test`
`npx typeorm-ts-node-commonjs migration:run -d dist/db/data-source.js`
`npm run seed`
