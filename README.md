# DEV SETUP

1. Initialize cli tool in workspace
  - -> `npm i` in root
  - -> `npm run build --workspace=@cli/exe` in root
  - -> `npm run cli` ( --> `CTRL+C` for starters - setup DB and oauth first)

2. Start database, test database and admin tool (PgAdmin)
  - -> exetcutables/database/README.md

3. Start openID provider with database and database admin tool (PgAdmin)
  - -> exetcutables/oauth/README.md (uses different DB, and different PgAdmin!)


