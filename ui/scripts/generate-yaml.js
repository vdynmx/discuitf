import { exec } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the root path

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
//const rootPath = '/root/discuit/';
//const rootPath = path.join(import.meta.dirname, '../../');
try {
  console.log('About to compute rootPath...');
  console.log('__filename:', __filename);
  console.log('__dirname:', __dirname);
} catch (err) {
  console.error('Error computing rootPath:', err);
}
const rootPath = path.resolve(__dirname, '../..');

  console.log('Root path:', rootPath);
  console.log('__filename:', __filename);
  console.log('__dirname:', __dirname);
 
// Run the command to get the config

(async () => {
  await exec('./discuit inject-config', { cwd: rootPath }, async (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return;
    }
    if (stderr) {
      console.error(`stderr: ${stderr}`);
      return;
    }

    // Make ui-config.yaml
    await fs.writeFile(path.join(rootPath, 'ui-config.yaml'), stdout, (err) => {
      if (err) {
        console.error(err);
      } else {
        console.log('ui-config.yaml has been written');
      }
    });
  });
})();
