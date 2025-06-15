import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

const mainConfigPath = 'config/template.yml';
const servicesDir = 'config/services';
const consumersFile = 'config/consumers.yml';
const outFile = 'output/kong.yml';

const mainConfig = yaml.load(fs.readFileSync(mainConfigPath, 'utf8'));

const serviceFiles = fs.readdirSync(servicesDir)
  .filter(f => f.endsWith('.yml'))
  .map(f => path.join(servicesDir, f));
const services = serviceFiles.map(f => yaml.load(fs.readFileSync(f, 'utf8')));

const consumers = yaml.load(fs.readFileSync(consumersFile, 'utf8'));

mainConfig.services = services;
mainConfig.consumers = consumers;

const yamlConfig = yaml.dump(mainConfig, { lineWidth: -1 });
fs.writeFileSync(outFile, yamlConfig, 'utf8');

console.log(`Combined config written to ${outFile}`);
