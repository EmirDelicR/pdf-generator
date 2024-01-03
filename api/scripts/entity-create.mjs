#!/usr/bin/env node
import { execSync } from 'child_process';

const entityName = process.env.npm_config_entity;

if (entityName === undefined) {
  console.error(
    'Script aborted please provide argumnt --entity=YourEntityName'
  );
} else {
  const entityPath = `src/database/entities/${entityName}`;

  // Run the typeorm command
  execSync(`typeorm entity:create ${entityPath}`, { stdio: 'inherit' });
}
