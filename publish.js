const path = require('path');
const child = require('child_process');

const packages = ['reforge-cli', 'reforge'];

for (p of packages) {
  const spawn = child.spawnSync('npm', ['publish'], {
    cwd: path.join(__dirname, p)
  });

  const errorText = spawn.stderr.toString().trim();
  if (errorText) {
    console.log(errorText);
    if (p === 'reforge-cli') {
      child.spawnSync('./scripts/postpublish.js', [], {
        cwd: path.join(__dirname, p)
      });
    }
  }
}
