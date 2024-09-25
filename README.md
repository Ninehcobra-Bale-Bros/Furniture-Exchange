# Run migration in docker

`npm run migration:generate -- dist/db/migrations/test`
`npx typeorm-ts-node-commonjs migration:run -d dist/db/data-source.js`
`npm run seed`
`docker-compose --env-file ./.env.development down -v`
`docker-compose --env-file ./.env.development up -d --build`
