import { execSync } from 'child_process';
import fs from 'fs';

const KONG_ADMIN_URL = 'http://localhost:8001';
const INPUT_FILE = 'config/kong.yml';

async function syncToDatabase() {
    try {
        console.log('Syncing configuration from YAML file to Kong database...');
        
        // Check if the input file exists
        if (!fs.existsSync(INPUT_FILE)) {
            console.log(`No configuration file found at ${INPUT_FILE}, skipping sync`);
            return;
        }
        
        // Use deck sync to push YAML to database
        execSync(`deck sync --kong-addr ${KONG_ADMIN_URL} --state ${INPUT_FILE}`, { stdio: 'inherit' });
        console.log('Configuration successfully synced to Kong database');
    } catch (error) {
        console.error('Failed to sync configuration to Kong database:', error.message);
        process.exit(1);
    }
}

// Run the sync
syncToDatabase();
