const fs = require('fs');
const path = require('path');
const https = require('https');

const PEXELS = 'https://images.pexels.com/photos';
const UNSPLASH = 'https://images.unsplash.com';

const categories = {
  terracotta: [
    `${PEXELS}/34545851/pexels-photo-34545851.jpeg?auto=compress&cs=tinysrgb&w=800`,
    `${PEXELS}/5789179/pexels-photo-5789179.jpeg?auto=compress&cs=tinysrgb&w=800`,
    `${PEXELS}/37808898/pexels-photo-37808898.jpeg?auto=compress&cs=tinysrgb&w=800`,
    `${PEXELS}/10066332/pexels-photo-10066332.jpeg?auto=compress&cs=tinysrgb&w=800`,
    `${PEXELS}/27403385/pexels-photo-27403385.jpeg?auto=compress&cs=tinysrgb&w=800`,
    `${PEXELS}/28264830/pexels-photo-28264830.jpeg?auto=compress&cs=tinysrgb&w=800`,
    `${UNSPLASH}/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=800&q=80`,
    `${UNSPLASH}/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=800&q=80`,
  ],
  pottery: [
    `${UNSPLASH}/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=800&q=80`,
    `${UNSPLASH}/photo-1592150621744-aca64f48394a?auto=format&fit=crop&w=800&q=80`,
    `${UNSPLASH}/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=800&q=80`,
    `${UNSPLASH}/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80`,
    `${PEXELS}/20239419/pexels-photo-20239419.jpeg?auto=compress&cs=tinysrgb&w=800`,
    `${PEXELS}/10526670/pexels-photo-10526670.jpeg?auto=compress&cs=tinysrgb&w=800`,
    `${PEXELS}/38108950/pexels-photo-38108950.jpeg?auto=compress&cs=tinysrgb&w=800`,
    `${PEXELS}/20239423/pexels-photo-20239423.jpeg?auto=compress&cs=tinysrgb&w=800`,
  ],
  sarees: [
    `${PEXELS}/6167463/pexels-photo-6167463.jpeg?auto=compress&cs=tinysrgb&w=800`,
    `${PEXELS}/10317113/pexels-photo-10317113.jpeg?auto=compress&cs=tinysrgb&w=800`,
    `${UNSPLASH}/photo-1604871000636-074fa5117945?auto=format&fit=crop&w=800&q=80`,
    `${UNSPLASH}/photo-1615529182904-14819c35db37?auto=format&fit=crop&w=800&q=80`,
    `${UNSPLASH}/photo-1606760227091-3dd870d97f1d?auto=format&fit=crop&w=800&q=80`,
    `${UNSPLASH}/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=800&q=80`,
    `${UNSPLASH}/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=800&q=80`,
    `${UNSPLASH}/photo-1528459801416-a9e53bbf4e17?auto=format&fit=crop&w=800&q=80`,
  ],
  jute: [
    `${PEXELS}/36005348/pexels-photo-36005348.jpeg?auto=compress&cs=tinysrgb&w=800`,
    `${PEXELS}/7717489/pexels-photo-7717489.jpeg?auto=compress&cs=tinysrgb&w=800`,
    `${PEXELS}/34667125/pexels-photo-34667125.jpeg?auto=compress&cs=tinysrgb&w=800`,
    `${PEXELS}/239777/pexels-photo-239777.jpeg?auto=compress&cs=tinysrgb&w=800`,
    `${PEXELS}/36319624/pexels-photo-36319624.jpeg?auto=compress&cs=tinysrgb&w=800`,
    `${PEXELS}/276514/pexels-photo-276514.jpeg?auto=compress&cs=tinysrgb&w=800`,
  ],
  woodcraft: [
    `${PEXELS}/20130576/pexels-photo-20130576.jpeg?auto=compress&cs=tinysrgb&w=800`,
    `${PEXELS}/20130599/pexels-photo-20130599.jpeg?auto=compress&cs=tinysrgb&w=800`,
    `${PEXELS}/34599378/pexels-photo-34599378.jpeg?auto=compress&cs=tinysrgb&w=800`,
    `${PEXELS}/12896827/pexels-photo-12896827.jpeg?auto=compress&cs=tinysrgb&w=800`,
    `${UNSPLASH}/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800&q=80`,
    `${UNSPLASH}/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=800&q=80`,
    `${UNSPLASH}/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80`,
    `${PEXELS}/39468207/pexels-photo-39468207.jpeg?auto=compress&cs=tinysrgb&w=800`,
  ],
  metalcraft: [
    `${PEXELS}/15755947/pexels-photo-15755947.jpeg?auto=compress&cs=tinysrgb&w=800`,
    `${PEXELS}/26792961/pexels-photo-26792961.jpeg?auto=compress&cs=tinysrgb&w=800`,
    `${PEXELS}/32662216/pexels-photo-32662216.jpeg?auto=compress&cs=tinysrgb&w=800`,
    `${PEXELS}/33311196/pexels-photo-33311196.jpeg?auto=compress&cs=tinysrgb&w=800`,
    `${PEXELS}/34504204/pexels-photo-34504204.jpeg?auto=compress&cs=tinysrgb&w=800`,
    `${PEXELS}/1047051/pexels-photo-1047051.jpeg?auto=compress&cs=tinysrgb&w=800`,
    `${PEXELS}/248077/pexels-photo-248077.jpeg?auto=compress&cs=tinysrgb&w=800`,
    `${UNSPLASH}/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=800&q=80`,
  ],
  textiles: [
    `${PEXELS}/34161635/pexels-photo-34161635.jpeg?auto=compress&cs=tinysrgb&w=800`,
    `${PEXELS}/34161636/pexels-photo-34161636.jpeg?auto=compress&cs=tinysrgb&w=800`,
    `${PEXELS}/5865305/pexels-photo-5865305.jpeg?auto=compress&cs=tinysrgb&w=800`,
    `${UNSPLASH}/photo-1582738411706-bfc8e691d1c2?auto=format&fit=crop&w=800&q=80`,
    `${PEXELS}/2885940/pexels-photo-2885940.jpeg?auto=compress&cs=tinysrgb&w=800`,
    `${PEXELS}/1183992/pexels-photo-1183992.jpeg?auto=compress&cs=tinysrgb&w=800`,
  ],
  'folk-art': [
    `${PEXELS}/30969805/pexels-photo-30969805.jpeg?auto=compress&cs=tinysrgb&w=800`,
    `${PEXELS}/36774467/pexels-photo-36774467.jpeg?auto=compress&cs=tinysrgb&w=800`,
    `${PEXELS}/10066334/pexels-photo-10066334.jpeg?auto=compress&cs=tinysrgb&w=800`,
    `${PEXELS}/19867571/pexels-photo-19867571.jpeg?auto=compress&cs=tinysrgb&w=800`,
    `${PEXELS}/368727/pexels-photo-368727.jpeg?auto=compress&cs=tinysrgb&w=800`,
    `${UNSPLASH}/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&q=80`,
  ],
  bamboo: [
    `${PEXELS}/36005348/pexels-photo-36005348.jpeg?auto=compress&cs=tinysrgb&w=800`,
    `${PEXELS}/7717489/pexels-photo-7717489.jpeg?auto=compress&cs=tinysrgb&w=800`,
    `${PEXELS}/34667125/pexels-photo-34667125.jpeg?auto=compress&cs=tinysrgb&w=800`,
    `${UNSPLASH}/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800&q=80`,
    `${UNSPLASH}/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80`,
    `${PEXELS}/239777/pexels-photo-239777.jpeg?auto=compress&cs=tinysrgb&w=800`,
  ],
};

function download(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    const getReq = (u) => {
      https.get(u, (res) => {
        if (res.statusCode === 301 || res.statusCode === 302) {
          return getReq(res.headers.location);
        }
        if (res.statusCode !== 200) {
          file.close();
          fs.unlink(dest, () => {});
          return resolve(false);
        }
        res.pipe(file);
        file.on('finish', () => {
          file.close(() => resolve(true));
        });
      }).on('error', (err) => {
        file.close();
        fs.unlink(dest, () => {});
        resolve(false);
      });
    };
    getReq(url);
  });
}

async function run() {
  console.log('Downloading authentic craft imagery locally to public/images/products/ ...');
  for (const [folder, urls] of Object.entries(categories)) {
    const dir = path.join(__dirname, '..', 'public', 'images', 'products', folder);
    fs.mkdirSync(dir, { recursive: true });
    for (let i = 0; i < urls.length; i++) {
      const filename = `${folder}-${String(i + 1).padStart(2, '0')}.jpg`;
      const dest = path.join(dir, filename);
      if (fs.existsSync(dest) && fs.statSync(dest).size > 1000) {
        continue; // already downloaded
      }
      process.stdout.write(`Downloading ${folder}/${filename}... `);
      const ok = await download(urls[i], dest);
      console.log(ok ? 'OK' : 'FAILED');
    }
  }
  console.log('Finished downloading images!');
}

run();
