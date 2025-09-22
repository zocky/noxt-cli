#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import { startServer } from 'noxt-server';
//import 'console-with-location';

const __dirname = path.dirname(new URL(import.meta.url).pathname);

export function execute([recipe], options) {
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
function cmd_create() {
  // copy the starter pack from ./starter, but only if it is empty
  const starterPath = targetPath.resolve(__dirname, '../starter');
  const pathArg = args.shift();
  const targetPath = pathArg ? targetPath.resolve(process.cwd(), pathArg) : process.cwd();
  // if not exists, create recursively
  if (!fs.existsSync(targetPath)) {
    fs.mkdirSync(targetPath, { recursive: true });
  } else {
    // if not empty, except for node_modules, refuse to overwrite
    const files = fs.readdirSync(targetPath).filter(file => file !== 'node_modules');
    if (files.length) {
      die(`Directory ${targetPath} is not empty. Refusing to overwrite it.`);
    }
  }
  // recursively copy starterPath to targetPath
  fs.cpSync(starterPath, targetPath, { recursive: true });
  console.log(`Created noxt starter pack in ${targetPath}\ncd ${targetPath}\nnpx noxt-cli`);
  process.exit(0);
}