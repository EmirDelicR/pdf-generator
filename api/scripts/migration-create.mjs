#!/usr/bin/env node
import { execSync } from 'child_process';

const migrationName = process.env.npm_config_migration;

if (migrationName === undefined) {
  console.error(
    'Script aborted! Please provide argumnt --migration=YourMigrationName'
  );
} else {
  const migrationPath = `src/database/migrations/${migrationName}`;

  // Run the typeorm command
  execSync(`typeorm migration:create ${migrationPath}`, { stdio: 'inherit' });
}
