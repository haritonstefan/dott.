import fs from 'fs';
import readline from 'readline';

async function fileReader(filePath: string) {
    if (!fs.existsSync(filePath)) {
        throw new Error(`Could not find ${filePath}`);
    }

    readline.createInterface({
        input: fs.createReadStream(filePath),
        
    })

}