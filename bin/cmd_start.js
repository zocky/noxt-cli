#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import { startServer } from 'noxt-server';
//import 'console-with-location';

const __dirname = path.dirname(new URL(import.meta.url).pathname);

export async function execute([recipe], options) {
  // read deafault config
  let config = yaml.load(fs.readFileSync(path.resolve(__dirname, '../default.config.yaml'), 'utf8'));

  // read local config if exists
  const configPath = 'noxt.config.yaml';
  const configFullPath = path.resolve(process.cwd(), configPath);

  if (fs.existsSync(configFullPath)) {
    console.log(`Using config file: ${configFullPath}`);
    try {
      const localConfig = yaml.load(fs.readFileSync(configFullPath, 'utf8'));
      Object.assign(config, localConfig);
    } catch (e) {
      die(`Error loading config file: ${e.message}`);
    }
    recipe ??= config.recipe;
  } else {
    throw new Error(`Config file not found: ${configPath}`);
  }
  
  // override config with command line options
  for (const key in options) {
    if (!(key in config)) {
      warn(`Unknown config option: ${key}`);
    }
    config[key] = options[key] ?? config[key];
  }

  startServer({ config, recipe }).catch(err => {
    console.error(`[noxt-server] Error starting server: ${err.message}`);
    console.log(`[noxt-server]`, err.stack);
    process.exit(1);
  });
}
