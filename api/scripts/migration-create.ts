#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-var-requires */

const yargs = require('yargs');
const { execSync } = require('child_process');

// Parse the command-line arguments
const {
  _: [name]
} = yargs.argv;

// Construct the migration path
const migrationPath = `src/database/migrations/${name}`;

// Run the typeorm command
execSync(`typeorm migration:create ${migrationPath}`, { stdio: 'inherit' });
