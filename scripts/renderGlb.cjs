const fs = require('fs');
const zlib = require('zlib');

function crc32(buf) {
  let table = new Uint32Array(256);
  for (let i = 0; i < 256; i++) {
    let c = i;
    for (let k = 0; k < 8; k++) c = (c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1);
    table[i] = c;
  }
  let crc = -1;
  for (let i = 0; i < buf.length; i++) crc = (crc >>> 8) ^ table[(crc ^ buf[i]) & 0xFF];
  return (crc ^ (-1)) >>> 0;
}

function chunk(type, data) {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length, 0);
  const typeBuf = Buffer.from(type, 'ascii');
  const body = Buffer.concat([typeBuf, data]);
  const crcBuf = Buffer.alloc(4);
  crcBuf.writeUInt32BE(crc32(body), 0);
  return Buffer.concat([len, body, crcBuf]);
}

function writePNG(width, height, rgbaBuffer, outPath) {
  const sig = Buffer.from([0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A]);
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8;
  ihdr[9] = 6;
  ihdr[10] = 0;
  ihdr[11] = 0;
  ihdr[12] = 0;

  const rowSize = width * 4;
  const filtered = Buffer.alloc((rowSize + 1) * height);
  for (let y = 0; y < height; y++) {
    filtered[y * (rowSize + 1)] = 0;
    rgbaBuffer.copy(filtered, y * (rowSize + 1) + 1, y * rowSize, (y + 1) * rowSize);
  }

  const idatData = zlib.deflateSync(filtered);
  const png = Buffer.concat([sig, chunk('IHDR', ihdr), chunk('IDAT', idatData), chunk('IEND', Buffer.alloc(0))]);
  fs.writeFileSync(outPath, png);
  console.log('Successfully saved PNG:', outPath, png.length, 'bytes');
}

function renderGlb(glbPath, outPngPath, options = {}) {
  const buf = fs.readFileSync(glbPath);
  const jsonLen = buf.readUInt32LE(12);
  const jsonStr = buf.toString('utf8', 20, 20 + jsonLen);
  const gltf = JSON.parse(jsonStr);

  const binDataOffset = 20 + jsonLen + 8;

  function getAccessorData(accIdx) {
    const acc = gltf.accessors[accIdx];
    const bv = gltf.bufferViews[acc.bufferView];
    const offset = binDataOffset + (bv.byteOffset || 0) + (acc.byteOffset || 0);
    const count = acc.count;

    if (acc.componentType === 5126) { // FLOAT
      const floatCount = count * (acc.type === 'VEC3' ? 3 : acc.type === 'VEC2' ? 2 : 1);
      return new Float32Array(buf.buffer, buf.byteOffset + offset, floatCount);
    } else if (acc.componentType === 5123) { // UNSIGNED_SHORT
      return new Uint16Array(buf.buffer, buf.byteOffset + offset, count);
    } else if (acc.componentType === 5125) { // UNSIGNED_INT
      return new Uint32Array(buf.buffer, buf.byteOffset + offset, count);
    }
    return null;
  }

  const W = options.width || 700;
  const H = options.height || 700;
  const imgBuf = Buffer.alloc(W * H * 4);
  const depthBuf = new Float32Array(W * H).fill(1e9);

  // Background radial gradient (cream/warm ivory)
  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      const dx = (x - W / 2) / (W * 0.5);
      const dy = (y - H * 0.46) / (H * 0.5);
      const dist = Math.min(1, Math.sqrt(dx * dx + dy * dy));
      const r = Math.round(255 * (1 - dist) + 235 * dist);
      const g = Math.round(252 * (1 - dist) + 228 * dist);
      const b = Math.round(247 * (1 - dist) + 215 * dist);
      const idx = (y * W + x) * 4;
      imgBuf[idx] = r;
      imgBuf[idx + 1] = g;
      imgBuf[idx + 2] = b;
      imgBuf[idx + 3] = 255;
    }
  }

  // Iterate over all primitives in all meshes
  const allMeshes = gltf.meshes || [];
  let minX = 1e9, maxX = -1e9, minY = 1e9, maxY = -1e9, minZ = 1e9, maxZ = -1e9;

  // First find global bounds
  for (const mesh of allMeshes) {
    for (const prim of mesh.primitives) {
      const pos = getAccessorData(prim.attributes.POSITION);
      for (let i = 0; i < pos.length; i += 3) {
        const x = pos[i], y = pos[i + 1], z = pos[i + 2];
        if (x < minX) minX = x; if (x > maxX) maxX = x;
        if (y < minY) minY = y; if (y > maxY) maxY = y;
        if (z < minZ) minZ = z; if (z > maxZ) maxZ = z;
      }
    }
  }

  // Check up-axis: usually Z is up for FBX/Scaniverse, or Y is up
  const isZUp = (maxZ - minZ) > (maxY - minY);
  const cx = (minX + maxX) / 2;
  const cy = (minY + maxY) / 2;
  const cz = (minZ + maxZ) / 2;
  const maxDim = Math.max(maxX - minX, maxY - minY, maxZ - minZ);
  const scale = (Math.min(W, H) * (options.scaleMultiplier || 0.68)) / maxDim;

  const yaw = options.yaw || 0.45;
  const pitch = options.pitch || 0.28;
  const cosY = Math.cos(yaw), sinY = Math.sin(yaw);
  const cosP = Math.cos(pitch), sinP = Math.sin(pitch);

  const lightDir = { x: 0.5, y: 0.8, z: 0.6 };
  const llen = Math.hypot(lightDir.x, lightDir.y, lightDir.z);
  lightDir.x /= llen; lightDir.y /= llen; lightDir.z /= llen;

  // Ground shadow positioned right under the model base
  const shadowCy = options.shadowY !== undefined ? options.shadowY : (H * 0.78);
  const shadowRx = options.shadowRx || 150;
  const shadowRy = options.shadowRy || 28;
  for (let y = Math.floor(shadowCy - shadowRy); y < Math.floor(shadowCy + shadowRy); y++) {
    for (let x = Math.floor(W / 2 - shadowRx); x < Math.floor(W / 2 + shadowRx); x++) {
      if (x < 0 || x >= W || y < 0 || y >= H) continue;
      const dx = (x - W / 2) / shadowRx;
      const dy = (y - shadowCy) / shadowRy;
      const d = dx * dx + dy * dy;
      if (d < 1) {
        const alpha = (1 - Math.sqrt(d)) * 0.28;
        const idx = (y * W + x) * 4;
        imgBuf[idx] = Math.round(imgBuf[idx] * (1 - alpha) + 40 * alpha);
        imgBuf[idx + 1] = Math.round(imgBuf[idx + 1] * (1 - alpha) + 25 * alpha);
        imgBuf[idx + 2] = Math.round(imgBuf[idx + 2] * (1 - alpha) + 15 * alpha);
      }
    }
  }

  // Render each primitive
  for (const mesh of allMeshes) {
    for (const prim of mesh.primitives) {
      const pos = getAccessorData(prim.attributes.POSITION);
      const norm = prim.attributes.NORMAL !== undefined ? getAccessorData(prim.attributes.NORMAL) : null;
      const indices = prim.indices !== undefined ? getAccessorData(prim.indices) : null;

      const numTris = indices ? indices.length / 3 : pos.length / 9;

      for (let t = 0; t < numTris; t++) {
        const i0 = indices ? indices[t * 3] : t * 3;
        const i1 = indices ? indices[t * 3 + 1] : t * 3 + 1;
        const i2 = indices ? indices[t * 3 + 2] : t * 3 + 2;

        function transform(idx) {
          let rx, ry, rz;
          if (isZUp) {
            rx = pos[idx * 3] - cx;
            ry = pos[idx * 3 + 2] - cz;
            rz = -(pos[idx * 3 + 1] - cy);
          } else {
            rx = pos[idx * 3] - cx;
            ry = pos[idx * 3 + 1] - cy;
            rz = pos[idx * 3 + 2] - cz;
          }

          // Rotate Y (yaw)
          const x1 = rx * cosY + rz * sinY;
          const z1 = -rx * sinY + rz * cosY;
          // Rotate X (pitch)
          const y2 = ry * cosP - z1 * sinP;
          const z2 = ry * sinP + z1 * cosP;

          const dist = 3.5 * maxDim;
          const fov = dist / (dist + z2);
          const px = W / 2 + x1 * scale * fov;
          const py = (options.centerY || H * 0.46) - y2 * scale * fov;

          return { px, py, z: z2 };
        }

        const v0 = transform(i0);
        const v1 = transform(i1);
        const v2 = transform(i2);

        // 2D bounding box of triangle
        const minPx = Math.max(0, Math.floor(Math.min(v0.px, v1.px, v2.px)));
        const maxPx = Math.min(W - 1, Math.ceil(Math.max(v0.px, v1.px, v2.px)));
        const minPy = Math.max(0, Math.floor(Math.min(v0.py, v1.py, v2.py)));
        const maxPy = Math.min(H - 1, Math.ceil(Math.max(v0.py, v1.py, v2.py)));

        const area = (v1.px - v0.px) * (v2.py - v0.py) - (v1.py - v0.py) * (v2.px - v0.px);
        if (area <= 0) continue; // backface culling

        // Compute face normal in world/view space
        let fnx, fny, fnz;
        if (norm) {
          fnx = (norm[i0 * 3] + norm[i1 * 3] + norm[i2 * 3]) / 3;
          fny = (norm[i0 * 3 + 1] + norm[i1 * 3 + 1] + norm[i2 * 3 + 1]) / 3;
          fnz = (norm[i0 * 3 + 2] + norm[i1 * 3 + 2] + norm[i2 * 3 + 2]) / 3;
        } else {
          fnx = 0; fny = 1; fnz = 0;
        }
        const nlen = Math.hypot(fnx, fny, fnz) || 1;
        fnx /= nlen; fny /= nlen; fnz /= nlen;

        const dot = Math.max(0, fnx * lightDir.x + fny * lightDir.y + fnz * lightDir.z);
        const ambient = 0.45;
        const diffuse = 0.55 * dot;
        const shade = ambient + diffuse;

        // Base color based on model
        const baseR = options.baseColor ? options.baseColor[0] : 240;
        const baseG = options.baseColor ? options.baseColor[1] : 235;
        const baseB = options.baseColor ? options.baseColor[2] : 228;

        const r = Math.min(255, Math.floor(baseR * shade));
        const g = Math.min(255, Math.floor(baseG * shade));
        const b = Math.min(255, Math.floor(baseB * shade));

        // Scanline rasterizer
        for (let py = minPy; py <= maxPy; py++) {
          for (let px = minPx; px <= maxPx; px++) {
            const w0 = ((v1.px - px) * (v2.py - py) - (v1.py - py) * (v2.px - px)) / area;
            const w1 = ((v2.px - px) * (v0.py - py) - (v2.py - py) * (v0.px - px)) / area;
            const w2 = 1 - w0 - w1;

            if (w0 >= 0 && w1 >= 0 && w2 >= 0) {
              const z = w0 * v0.z + w1 * v1.z + w2 * v2.z;
              const pIdx = py * W + px;
              if (z < depthBuf[pIdx]) {
                depthBuf[pIdx] = z;
                const bufIdx = pIdx * 4;
                imgBuf[bufIdx] = r;
                imgBuf[bufIdx + 1] = g;
                imgBuf[bufIdx + 2] = b;
                imgBuf[bufIdx + 3] = 255;
              }
            }
          }
        }
      }
    }
  }

  writePNG(W, H, imgBuf, outPngPath);
}

// Render floral_vase.glb: white ceramic with terracotta/crimson flora
renderGlb('public/models/floral_vase.glb', 'public/images/products/3d/floral-vase-preview.png', {
  width: 700,
  height: 700,
  baseColor: [248, 245, 240], // pure glazed white ceramic
  scaleMultiplier: 0.65,
  centerY: 340,
  shadowY: 540,
  shadowRx: 100,
  shadowRy: 22,
  yaw: 0.35,
  pitch: 0.15,
});

// Render flowers_in_vase.glb: stoneware vase with floral blossoms
renderGlb('public/models/flowers_in_vase.glb', 'public/images/products/3d/flowers-vase-preview.png', {
  width: 700,
  height: 700,
  baseColor: [220, 185, 150], // stoneware warm earthenware
  scaleMultiplier: 0.72,
  centerY: 320,
  shadowY: 535,
  shadowRx: 115,
  shadowRy: 25,
  yaw: 0.5,
  pitch: 0.22,
});
