import { execSync } from 'child_process';
import fs from 'fs';

const KONG_ADMIN_URL = 'http://localhost:8001';
const INPUT_FILE = 'config/kong.yml';

async function waitForKong() {
    const maxRetries = 30;
    const retryDelay = 2000; // 2 seconds
    
    for (let i = 0; i < maxRetries; i++) {
        try {
            console.log(`Waiting for Kong to be ready... (attempt ${i + 1}/${maxRetries})`);
            execSync(`curl -s ${KONG_ADMIN_URL}/status`, { stdio: 'pipe' });
            console.log('Kong is ready!');
            return;
        } catch (error) {
            if (i === maxRetries - 1) {
                throw new Error(`Kong did not become ready after ${maxRetries} attempts`);
            }
            await new Promise(resolve => setTimeout(resolve, retryDelay));
        }
    }
}

async function syncToDatabase() {
    try {
        console.log('Syncing configuration from YAML file to Kong database...');
        
        // Check if the input file exists
        if (!fs.existsSync(INPUT_FILE)) {
            console.log(`No configuration file found at ${INPUT_FILE}, skipping sync`);
            return;
        }
        
        // Wait for Kong to be ready
        await waitForKong();
        
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
