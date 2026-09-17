import React, { useEffect, useRef, useState, useCallback } from 'react';
import { RotateCw, Pause, Play, Box, Maximize2, Minimize2, ZoomIn, ZoomOut, Loader2 } from 'lucide-react';
import { resolveAssetUrl } from '@/utils/assets';

// Declare custom element for model-viewer in TypeScript
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'model-viewer': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          src?: string;
          poster?: string;
          alt?: string;
          'camera-controls'?: boolean | string;
          'auto-rotate'?: boolean | string;
          'rotation-per-second'?: string;
          'shadow-intensity'?: string | number;
          'shadow-softness'?: string | number;
          exposure?: string | number;
          'camera-orbit'?: string;
          'camera-target'?: string;
          'min-camera-orbit'?: string;
          'max-camera-orbit'?: string;
          'field-of-view'?: string;
          'min-field-of-view'?: string;
          'max-field-of-view'?: string;
          'interaction-prompt'?: string;
          'touch-action'?: string;
          bounds?: string;
          loading?: 'auto' | 'lazy' | 'eager';
          reveal?: 'auto' | 'interaction' | 'manual';
        },
        HTMLElement
      >;
    }
  }
}

interface Craft3DViewerProps {
  materialType?: string;
  productName?: string;
  modelPath?: string;
  poster?: string;
  className?: string;
  onClose?: () => void;
  autoRotate?: boolean;
}

interface Point3D {
  x: number;
  y: number;
  z: number;
}

interface Face {
  indices: [number, number, number, number];
  normal: Point3D;
  centerZ: number;
  color: string;
}

export const Craft3DViewer: React.FC<Craft3DViewerProps> = ({
  materialType = 'terracotta',
  productName = 'Handcrafted Vessel',
  modelPath,
  poster,
  className = '',
}) => {
  // If modelPath is provided, use the local model-viewer WebGL PBR engine
  if (modelPath) {
    return (
      <GlbModelViewer
        modelPath={resolveAssetUrl(modelPath)}
        poster={resolveAssetUrl(poster)}
        productName={productName}
        materialType={materialType}
        className={className}
      />
    );
  }

  // Fallback to high-performance procedural canvas renderer
  return (
    <ProceduralCanvasViewer
      materialType={materialType}
      className={className}
    />
  );
};

/**
 * GLB 3D Model Viewer using Google model-viewer (locally bundled)
 * Features automatic bounding box calculation, visual centering,
 * comfortable uncropped padding, soft studio lighting, and minimal controls.
 */
const GlbModelViewer: React.FC<{
  modelPath: string;
  poster?: string;
  productName: string;
  materialType: string;
  className?: string;
}> = ({ modelPath, poster, productName, materialType, className = '' }) => {
  const viewerRef = useRef<HTMLElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [isLoading, setIsLoading] = useState(true);
  const [loadProgress, setLoadProgress] = useState(0);
  const [isRotating, setIsRotating] = useState(false); // Default static product + user-controlled rotation
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Cached optimal framing reference so "Reset View" always restores the perfect framing
  const initialFramingRef = useRef<{ target: string; orbit: string; fov: string } | null>(null);

  // Ensure model-viewer script is loaded locally
  useEffect(() => {
    if (!customElements.get('model-viewer')) {
      const script = document.createElement('script');
      script.type = 'module';
      script.src = '/js/model-viewer.min.js';
      document.head.appendChild(script);
    }
  }, []);

  /**
   * Automatically calculate loaded GLB's actual bounding box, object center,
   * dimensions, and bounding sphere radius.
   * Dynamically positions OrbitControls cameraTarget to the true visual center
   * and computes camera distance to ensure 100% complete vertical & horizontal framing
   * with 10–15% comfortable visual breathing room.
   */
  const applyOptimalFraming = useCallback(() => {
    const viewer = viewerRef.current as any;
    const container = containerRef.current;
    if (!viewer) return;

    try {
      // 1. Calculate actual bounding box center and dimensions
      const center = viewer.getBoundingBoxCenter?.();
      const dims = viewer.getDimensions?.();

      if (dims && center && dims.x > 0 && dims.y > 0) {
        // 2. Calculate object sizes and half-extents
        const sizeX = Math.max(0.001, dims.x);
        const sizeY = Math.max(0.001, dims.y);
        const sizeZ = Math.max(0.001, dims.z);

        const halfX = sizeX / 2;
        const halfY = sizeY / 2;
        const halfZ = sizeZ / 2;

        // 3. Calculate bounding sphere radius
        const sphereRadius = Math.sqrt(halfX * halfX + halfY * halfY + halfZ * halfZ);

        // 4. Center the model: target actual object center (OrbitControls rotates around this)
        const targetStr = `${center.x.toFixed(4)}m ${center.y.toFixed(4)}m ${center.z.toFixed(4)}m`;
        viewer.cameraTarget = targetStr;

        // 5. Viewport container dimensions & aspect ratio
        const containerWidth = container?.clientWidth || 800;
        const containerHeight = container?.clientHeight || 560;

        // Account for overlay controls (top badge ~36px, bottom controls ~42px)
        const overlayPaddingY = containerHeight <= 260 ? 76 : 64;
        const usableHeight = Math.max(60, containerHeight - overlayPaddingY);
        const aspect = containerWidth / usableHeight;

        // 6. Camera field of view (30deg gives a natural, undistorted craft perspective)
        const fovDeg = 30;
        const fovRad = (fovDeg * Math.PI) / 180;
        const tanHalfFovY = Math.tan(fovRad / 2);
        const tanHalfFovX = tanHalfFovY * aspect;

        // 7. Calculate camera distance based on bounding sphere, FOV, and aspect ratio:
        // - Vertical distance ensuring top AND bottom/base of the model are fully visible
        const distVertical = (halfY / tanHalfFovY) * (containerHeight / usableHeight);
        const distSphereVertical = (sphereRadius / Math.sin(fovRad / 2)) * (containerHeight / usableHeight);

        // - Horizontal distance ensuring left/right edges have breathing room during 360-degree rotation
        const maxHorizRadius = Math.hypot(halfX, halfZ);
        const distHorizontal = maxHorizRadius / tanHalfFovX;
        const distSphereHorizontal = sphereRadius / Math.sin(Math.atan(tanHalfFovX));

        // Base distance is the maximum requirement across all view planes
        const baseDistance = Math.max(distVertical, distHorizontal, distSphereVertical, distSphereHorizontal);

        // Add 12–15% visual breathing room
        const framingMargin = 1.15;
        const optimalDist = baseDistance * framingMargin;

        // Polar angle 75deg gives an authentic, appealing slight top-down view; azimuth 20deg
        const orbitStr = `20deg 75deg ${optimalDist.toFixed(3)}m`;
        viewer.cameraOrbit = orbitStr;
        viewer.fieldOfView = `${fovDeg}deg`;
        viewer.minCameraOrbit = `auto auto ${(optimalDist * 0.35).toFixed(3)}m`;
        viewer.maxCameraOrbit = `auto auto ${(optimalDist * 2.8).toFixed(3)}m`;

        initialFramingRef.current = {
          target: targetStr,
          orbit: orbitStr,
          fov: `${fovDeg}deg`,
        };

        if (typeof viewer.jumpCameraToGoal === 'function') {
          viewer.jumpCameraToGoal();
        }
      }
    } catch (err) {
      console.warn('Auto-framing calculation fallback:', err);
    }
  }, []);

  // Event listeners for model load & progress
  useEffect(() => {
    const viewer = viewerRef.current;
    if (!viewer) return;

    const handleLoad = () => {
      // Apply initial framing immediately
      applyOptimalFraming();
      // Second tick ensures geometry has settled on GPU
      setTimeout(() => {
        applyOptimalFraming();
        setIsLoading(false);
      }, 60);
    };

    const handleProgress = (e: any) => {
      const p = Math.round((e.detail?.totalProgress || 0) * 100);
      setLoadProgress(p);
      if (p >= 100) {
        setIsLoading(false);
      }
    };

    if ((viewer as any).loaded) {
      handleLoad();
    }

    viewer.addEventListener('load', handleLoad);
    viewer.addEventListener('model-visibility', handleLoad);
    viewer.addEventListener('progress', handleProgress);

    return () => {
      viewer.removeEventListener('load', handleLoad);
      viewer.removeEventListener('model-visibility', handleLoad);
      viewer.removeEventListener('progress', handleProgress);
      // Clean up WebGL resources on unmount
      try {
        (viewer as any).src = '';
      } catch {}
    };
  }, [modelPath, applyOptimalFraming]);

  // Window / container resize observer to recalculate framing when viewport changes
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let resizeTimer: any;
    const resizeObserver = new ResizeObserver(() => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        const viewer = viewerRef.current as any;
        if (viewer?.loaded || viewer?.modelIsVisible) {
          applyOptimalFraming();
        }
      }, 50);
    });

    resizeObserver.observe(container);
    return () => {
      clearTimeout(resizeTimer);
      resizeObserver.disconnect();
    };
  }, [applyOptimalFraming]);

  // Subtle auto-rotate toggle
  const toggleRotate = () => {
    const next = !isRotating;
    setIsRotating(next);
    if (viewerRef.current) {
      const viewer = viewerRef.current as any;
      viewer.autoRotate = next;
    }
  };

  // Zoom controls
  const handleZoomIn = () => {
    if (viewerRef.current) {
      const viewer = viewerRef.current as any;
      if (typeof viewer.zoom === 'function') {
        viewer.zoom(0.25);
      }
    }
  };

  const handleZoomOut = () => {
    if (viewerRef.current) {
      const viewer = viewerRef.current as any;
      if (typeof viewer.zoom === 'function') {
        viewer.zoom(-0.25);
      }
    }
  };

  // Reset view to original optimal framing
  const handleReset = () => {
    const viewer = viewerRef.current as any;
    if (!viewer) return;

    if (initialFramingRef.current) {
      viewer.cameraTarget = initialFramingRef.current.target;
      viewer.cameraOrbit = initialFramingRef.current.orbit;
      viewer.fieldOfView = initialFramingRef.current.fov;
    } else {
      applyOptimalFraming();
    }

    if (typeof viewer.resetTurntableRotation === 'function') {
      viewer.resetTurntableRotation();
    }
    if (typeof viewer.jumpCameraToGoal === 'function') {
      viewer.jumpCameraToGoal();
    }
    setIsRotating(false);
    viewer.autoRotate = false;
  };

  // Fullscreen toggle
  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen?.().then(() => setIsFullscreen(true)).catch(() => {});
    } else {
      document.exitFullscreen?.().then(() => setIsFullscreen(false)).catch(() => {});
    }
  };

  // Use custom height if provided in className (e.g. h-full in cards), otherwise default to standard viewer dimensions
  const hasCustomHeight = className.includes('h-');
  const heightClasses = hasCustomHeight ? '' : 'h-[440px] sm:h-[500px] lg:h-[560px]';

  return (
    <div
      ref={containerRef}
      className={`relative w-full ${heightClasses} bg-[#FAF8F5] rounded-2xl overflow-hidden select-none border border-stone-200/80 shadow-xs group ${className}`}
      style={{
        background: 'radial-gradient(circle at 50% 48%, #FFFFFF 0%, #F8F5EE 65%, #ECE5D8 100%)',
      }}
    >
      {/* 3D GLB Model Viewer Custom Element */}
      <model-viewer
        ref={viewerRef}
        src={modelPath}
        poster={poster}
        alt={productName}
        camera-controls
        auto-rotate={isRotating ? true : undefined}
        rotation-per-second="10deg"
        bounds="tight"
        camera-target="auto auto auto"
        camera-orbit="20deg 75deg auto"
        field-of-view="30deg"
        interaction-prompt="none"
        shadow-intensity="0.85"
        shadow-softness="0.85"
        exposure="1.05"
        touch-action="pan-y"
        min-camera-orbit="auto auto 40%"
        max-camera-orbit="auto auto 300%"
        style={{
          width: '100%',
          height: '100%',
          outline: 'none',
          '--poster-color': 'transparent',
          cursor: 'grab',
        } as React.CSSProperties}
      />

      {/* Loading Progress State */}
      {isLoading && (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-[#FAF8F5]/90 backdrop-blur-xs transition-opacity duration-300">
          <div className="flex flex-col items-center gap-3 p-6 rounded-2xl bg-white/95 shadow-md border border-stone-200/80">
            <Loader2 className="w-7 h-7 text-[#8C3B1E] animate-spin" />
            <div className="text-center">
              <p className="text-xs font-semibold uppercase tracking-wider text-stone-800 font-sans">
                Loading 3D Craft Model
              </p>
              <p className="text-[11px] text-stone-500 mt-0.5">
                {loadProgress > 0 ? `${loadProgress}% downloaded` : 'Centering 3D geometry...'}
              </p>
            </div>
            <div className="w-36 h-1.5 bg-stone-100 rounded-full overflow-hidden border border-stone-200">
              <div
                className="h-full bg-[#8C3B1E] transition-all duration-300 rounded-full"
                style={{ width: `${Math.max(8, loadProgress)}%` }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Top Header Overlay: Minimalist and Non-intrusive */}
      <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between pointer-events-none z-10">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-stone-200/80 shadow-xs text-xs font-medium text-stone-800">
          <Box className="w-3.5 h-3.5 text-[#8C3B1E]" />
          <span>Interactive 3D Craft</span>
          <span className="w-1 h-1 rounded-full bg-stone-300" />
          <span className="text-stone-500 hidden sm:inline">Drag to rotate • Pinch to zoom</span>
        </div>

        <div className="px-2.5 py-1 rounded-full bg-stone-900/80 backdrop-blur-xs text-[11px] font-mono text-stone-200 uppercase tracking-wider">
          {materialType}
        </div>
      </div>

      {/* Bottom Clean Ecommerce Controls Bar: No Developer Clutter */}
      <div className="absolute bottom-3.5 left-3 right-3 flex items-center justify-center z-10">
        <div className="flex items-center gap-1.5 p-1.5 rounded-full bg-white/95 backdrop-blur-md border border-stone-200/90 shadow-md">
          {/* Auto-rotate Toggle */}
          <button
            type="button"
            onClick={toggleRotate}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
              isRotating
                ? 'bg-stone-900 text-white shadow-xs'
                : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
            }`}
            title="Toggle Subtle Auto-Rotation"
          >
            {isRotating ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline">{isRotating ? 'Pause' : 'Auto Rotate'}</span>
          </button>

          <div className="h-4 w-px bg-stone-200 mx-0.5" />

          {/* Zoom Controls */}
          <button
            type="button"
            onClick={handleZoomOut}
            className="p-1.5 rounded-full bg-stone-100 text-stone-700 hover:bg-stone-200 transition-all"
            title="Zoom Out"
            aria-label="Zoom Out"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>

          <button
            type="button"
            onClick={handleZoomIn}
            className="p-1.5 rounded-full bg-stone-100 text-stone-700 hover:bg-stone-200 transition-all"
            title="Zoom In"
            aria-label="Zoom In"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>

          <div className="h-4 w-px bg-stone-200 mx-0.5" />

          {/* Reset View */}
          <button
            type="button"
            onClick={handleReset}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-stone-100 text-stone-700 hover:bg-stone-200 text-xs font-medium transition-all"
            title="Reset Angle & Zoom"
          >
            <RotateCw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Reset</span>
          </button>

          {/* Fullscreen */}
          <button
            type="button"
            onClick={toggleFullscreen}
            className="p-1.5 rounded-full bg-stone-100 text-stone-700 hover:bg-stone-200 transition-all hidden sm:flex"
            title={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
            aria-label="Fullscreen"
          >
            {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>
    </div>
  );
};

/**
 * Procedural Canvas 3D Viewer (Fallback for products without raw GLB files)
 */
const ProceduralCanvasViewer: React.FC<{
  materialType: string;
  className?: string;
}> = ({ materialType, className = '' }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [isRotating, setIsRotating] = useState(true);
  const [zoom, setZoom] = useState(1);

  const rotRef = useRef({ yaw: 0.4, pitch: 0.25 });
  const isDraggingRef = useRef(false);
  const lastMouseRef = useRef({ x: 0, y: 0 });
  const zoomRef = useRef(1);
  zoomRef.current = zoom;
  const isRotatingRef = useRef(true);
  isRotatingRef.current = isRotating;

  const getPalette = useCallback((material: string) => {
    const norm = material.toLowerCase();
    if (norm.includes('pottery') || norm.includes('ceramic') || norm.includes('blue')) {
      return { base: [48, 102, 140], highlight: [220, 240, 255], shadow: [18, 40, 60], ambient: 0.35, spec: 0.5 };
    }
    if (norm.includes('metal') || norm.includes('brass') || norm.includes('dhokra') || norm.includes('bronze')) {
      return { base: [180, 140, 60], highlight: [255, 235, 170], shadow: [80, 55, 15], ambient: 0.3, spec: 0.65 };
    }
    if (norm.includes('wood')) {
      return { base: [160, 100, 50], highlight: [230, 180, 130], shadow: [70, 40, 15], ambient: 0.35, spec: 0.25 };
    }
    return { base: [175, 75, 42], highlight: [238, 140, 105], shadow: [85, 30, 15], ambient: 0.35, spec: 0.3 };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const updateSize = () => {
      if (!canvas || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      ctx.scale(dpr, dpr);
    };
    updateSize();
    window.addEventListener('resize', updateSize);

    const profile = [
      { r: 0.32, y: -1.05 },
      { r: 0.28, y: -0.98 },
      { r: 0.20, y: -0.80 },
      { r: 0.22, y: -0.60 },
      { r: 0.45, y: -0.30 },
      { r: 0.72, y: 0.05 },
      { r: 0.68, y: 0.40 },
      { r: 0.48, y: 0.75 },
      { r: 0.34, y: 0.95 },
      { r: 0.38, y: 1.05 },
      { r: 0.02, y: 1.06 },
    ];

    const radialSegments = 24;
    const vertices: Point3D[] = [];
    const faces: [number, number, number, number][] = [];

    profile.forEach((pt) => {
      for (let i = 0; i < radialSegments; i++) {
        const theta = (i / radialSegments) * Math.PI * 2;
        vertices.push({
          x: pt.r * Math.cos(theta),
          y: pt.y,
          z: pt.r * Math.sin(theta),
        });
      }
    });

    for (let ring = 0; ring < profile.length - 1; ring++) {
      for (let i = 0; i < radialSegments; i++) {
        const nextI = (i + 1) % radialSegments;
        const v0 = ring * radialSegments + i;
        const v1 = ring * radialSegments + nextI;
        const v2 = (ring + 1) * radialSegments + nextI;
        const v3 = (ring + 1) * radialSegments + i;
        faces.push([v0, v1, v2, v3]);
      }
    }

    let animationFrameId: number;

    const render = () => {
      if (!canvas || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;

      ctx.clearRect(0, 0, width, height);

      const bgGrad = ctx.createRadialGradient(
        width / 2, height * 0.55, 20,
        width / 2, height * 0.55, width * 0.65
      );
      bgGrad.addColorStop(0, '#FFFFFF');
      bgGrad.addColorStop(0.6, '#F8F6F0');
      bgGrad.addColorStop(1, '#ECE7DC');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      ctx.save();
      ctx.translate(width / 2, height * 0.78);
      ctx.scale(1, 0.28);
      const shadowGrad = ctx.createRadialGradient(0, 0, 10, 0, 0, 140 * zoomRef.current);
      shadowGrad.addColorStop(0, 'rgba(30, 20, 15, 0.35)');
      shadowGrad.addColorStop(0.5, 'rgba(40, 25, 20, 0.15)');
      shadowGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = shadowGrad;
      ctx.beginPath();
      ctx.arc(0, 0, 140 * zoomRef.current, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      if (isRotatingRef.current && !isDraggingRef.current) {
        rotRef.current.yaw += 0.005;
      }

      const yaw = rotRef.current.yaw;
      const pitch = rotRef.current.pitch;
      const cosY = Math.cos(yaw);
      const sinY = Math.sin(yaw);
      const cosP = Math.cos(pitch);
      const sinP = Math.sin(pitch);

      let lightDir: Point3D = { x: 0.6, y: -0.7, z: 0.4 };
      const len = Math.hypot(lightDir.x, lightDir.y, lightDir.z);
      lightDir = { x: lightDir.x / len, y: lightDir.y / len, z: lightDir.z / len };

      const scale = Math.min(width, height) * 0.32 * zoomRef.current;
      const cx = width / 2;
      const cy = height * 0.48;
      const camDist = 3.5;

      const transformed: { x: number; y: number; z: number; px: number; py: number }[] = [];

      for (const v of vertices) {
        const x1 = v.x * cosY + v.z * sinY;
        const z1 = -v.x * sinY + v.z * cosY;
        const y2 = v.y * cosP - z1 * sinP;
        const z2 = v.y * sinP + z1 * cosP;

        const pz = z2 + camDist;
        const fov = camDist / Math.max(0.2, pz);
        const px = cx + x1 * scale * fov;
        const py = cy + y2 * scale * fov;

        transformed.push({ x: x1, y: y2, z: z2, px, py });
      }

      const pal = getPalette(materialType);
      const renderedFaces: Face[] = [];

      for (const f of faces) {
        const p0 = transformed[f[0]];
        const p1 = transformed[f[1]];
        const p2 = transformed[f[2]];
        const p3 = transformed[f[3]];

        const v0 = transformed[f[0]];
        const v1 = transformed[f[1]];
        const v2 = transformed[f[2]];

        const u = { x: v1.x - v0.x, y: v1.y - v0.y, z: v1.z - v0.z };
        const w = { x: v2.x - v0.x, y: v2.y - v0.y, z: v2.z - v0.z };

        let nx = u.y * w.z - u.z * w.y;
        let ny = u.z * w.x - u.x * w.z;
        let nz = u.x * w.y - u.y * w.x;
        const nlen = Math.hypot(nx, ny, nz) || 1;
        nx /= nlen;
        ny /= nlen;
        nz /= nlen;

        const centerZ = (p0.z + p1.z + p2.z + p3.z) * 0.25;
        const dot = Math.max(0, nx * lightDir.x + ny * lightDir.y + nz * lightDir.z);
        const viewDir = { x: 0, y: 0, z: 1 };
        const rx = 2 * dot * nx - lightDir.x;
        const ry = 2 * dot * ny - lightDir.y;
        const rz = 2 * dot * nz - lightDir.z;
        const specDot = Math.max(0, rx * viewDir.x + ry * viewDir.y + rz * viewDir.z);
        const spec = Math.pow(specDot, 12) * pal.spec;
        const rim = Math.pow(1 - Math.max(0, nz), 2.5) * 0.35;

        const factor = pal.ambient + dot * (1 - pal.ambient) + rim;
        const r = Math.min(255, Math.floor(pal.base[0] * factor + pal.highlight[0] * spec));
        const g = Math.min(255, Math.floor(pal.base[1] * factor + pal.highlight[1] * spec));
        const b = Math.min(255, Math.floor(pal.base[2] * factor + pal.highlight[2] * spec));

        renderedFaces.push({
          indices: f,
          normal: { x: nx, y: ny, z: nz },
          centerZ,
          color: `rgb(${r}, ${g}, ${b})`,
        });
      }

      renderedFaces.sort((a, b) => b.centerZ - a.centerZ);

      for (const face of renderedFaces) {
        const [i0, i1, i2, i3] = face.indices;
        const p0 = transformed[i0];
        const p1 = transformed[i1];
        const p2 = transformed[i2];
        const p3 = transformed[i3];

        ctx.beginPath();
        ctx.moveTo(p0.px, p0.py);
        ctx.lineTo(p1.px, p1.py);
        ctx.lineTo(p2.px, p2.py);
        ctx.lineTo(p3.px, p3.py);
        ctx.closePath();

        ctx.fillStyle = face.color;
        ctx.fill();

        ctx.strokeStyle = face.color;
        ctx.lineWidth = 0.6;
        ctx.stroke();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', updateSize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [materialType, getPalette]);

  const handlePointerDown = (e: React.PointerEvent) => {
    isDraggingRef.current = true;
    lastMouseRef.current = { x: e.clientX, y: e.clientY };
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDraggingRef.current) return;
    const dx = e.clientX - lastMouseRef.current.x;
    const dy = e.clientY - lastMouseRef.current.y;
    lastMouseRef.current = { x: e.clientX, y: e.clientY };

    rotRef.current.yaw += dx * 0.01;
    rotRef.current.pitch = Math.max(-0.8, Math.min(0.8, rotRef.current.pitch + dy * 0.01));
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    isDraggingRef.current = false;
    try {
      (e.target as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {}
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -0.08 : 0.08;
    setZoom((z) => Math.max(0.6, Math.min(1.8, Number((z + delta).toFixed(2)))));
  };

  const resetView = () => {
    rotRef.current = { yaw: 0.4, pitch: 0.25 };
    setZoom(1);
    setIsRotating(true);
  };

  const hasCustomHeight = className.includes('h-');
  const heightClasses = hasCustomHeight ? '' : 'h-[380px] sm:h-[460px]';

  return (
    <div
      ref={containerRef}
      className={`relative w-full ${heightClasses} bg-[#FAF8F5] rounded-2xl overflow-hidden select-none border border-stone-200/80 shadow-inner ${className}`}
      onWheel={handleWheel}
    >
      <canvas
        ref={canvasRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        className="w-full h-full cursor-grab active:cursor-grabbing touch-none block"
      />

      <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between pointer-events-none">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-stone-200/80 shadow-xs text-xs font-medium text-stone-800">
          <Box className="w-3.5 h-3.5 text-[#8C3B1E]" />
          <span>Interactive 3D Craft View</span>
          <span className="w-1 h-1 rounded-full bg-stone-300" />
          <span className="text-stone-500 hidden sm:inline">Drag to rotate • Pinch to zoom</span>
        </div>

        <div className="px-2.5 py-1 rounded-full bg-stone-900/80 backdrop-blur-xs text-[11px] font-mono text-stone-200 uppercase tracking-wider">
          {materialType}
        </div>
      </div>

      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-center">
        <div className="flex items-center gap-1.5 p-1.5 rounded-full bg-white/95 backdrop-blur-md border border-stone-200/90 shadow-md">
          <button
            type="button"
            onClick={() => setIsRotating(!isRotating)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
              isRotating
                ? 'bg-stone-900 text-white shadow-xs'
                : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
            }`}
            title="Toggle Rotation"
          >
            {isRotating ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline">{isRotating ? 'Pause' : 'Auto'}</span>
          </button>

          <div className="h-4 w-px bg-stone-200 mx-0.5" />

          <button
            type="button"
            onClick={() => setZoom((z) => Math.max(0.6, Number((z - 0.15).toFixed(2))))}
            disabled={zoom <= 0.65}
            className="p-1.5 rounded-full bg-stone-100 text-stone-700 hover:bg-stone-200 disabled:opacity-40 transition-all"
            title="Zoom Out"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>

          <span className="text-[11px] font-mono text-stone-600 w-9 text-center">
            {Math.round(zoom * 100)}%
          </span>

          <button
            type="button"
            onClick={() => setZoom((z) => Math.min(1.8, Number((z + 0.15).toFixed(2))))}
            disabled={zoom >= 1.75}
            className="p-1.5 rounded-full bg-stone-100 text-stone-700 hover:bg-stone-200 disabled:opacity-40 transition-all"
            title="Zoom In"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>

          <div className="h-4 w-px bg-stone-200 mx-0.5" />

          <button
            type="button"
            onClick={resetView}
            className="p-1.5 rounded-full bg-stone-100 text-stone-700 hover:bg-stone-200 transition-all"
            title="Reset Angle & Zoom"
          >
            <RotateCw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Craft3DViewer;
