
import * as THREE from 'three';
import './style.css';

// ========================================
// 1. THREE.JS SCENE
// ========================================

const container = document.querySelector('#particle-canvas');

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  42,
  1,
  0.1,
  100
);

camera.position.set(0, 0, 12.5);

const renderer = new THREE.WebGLRenderer({
  antialias: true,
  alpha: true,
  powerPreference: 'high-performance',
});

renderer.setClearColor(0x05070b, 0);

container.appendChild(renderer.domElement);

// ========================================
// 2. PARTICLE SETTINGS
// ========================================

const mobile = window.matchMedia('(max-width: 700px)').matches;

const COUNT = mobile ? 5200 : 16000;

const positions = new Float32Array(COUNT * 3);
const targets = new Float32Array(COUNT * 3);
const colors = new Float32Array(COUNT * 3);

const geometry = new THREE.BufferGeometry();

const palette = [
  new THREE.Color('#61dfff'),
  new THREE.Color('#2a8cff'),
  new THREE.Color('#e3f8ff'),
];

for (let i = 0; i < COUNT; i++) {
  const k = i * 3;

  positions[k] = (Math.random() - 0.5) * 13;
  positions[k + 1] = (Math.random() - 0.5) * 8;
  positions[k + 2] = (Math.random() - 0.5) * 6;

  const c = palette[
    Math.floor(Math.random() * palette.length)
  ];

  colors[k] = c.r;
  colors[k + 1] = c.g;
  colors[k + 2] = c.b;
}

geometry.setAttribute(
  'position',
  new THREE.BufferAttribute(positions, 3)
);

geometry.setAttribute(
  'color',
  new THREE.BufferAttribute(colors, 3)
);

// ========================================
// 3. GLOWING PARTICLE SHADER
// ========================================

const material = new THREE.ShaderMaterial({
  transparent: true,
  depthWrite: false,
  blending: THREE.AdditiveBlending,
  vertexColors: true,

  uniforms: {
    uPixelRatio: {
      value: Math.min(window.devicePixelRatio, 1.7),
    },
  },

  vertexShader: `
    attribute vec3 color;

    varying vec3 vColor;

    uniform float uPixelRatio;

    void main() {
      vColor = color;

      vec4 mv = modelViewMatrix * vec4(position, 1.0);

      gl_PointSize = clamp(
        27.0 / -mv.z,
        1.6,
        5.2
      ) * uPixelRatio;

      gl_Position = projectionMatrix * mv;
    }
  `,

  fragmentShader: `
    varying vec3 vColor;

    void main() {
      float r = length(gl_PointCoord - 0.5);

      float alpha = smoothstep(0.50, 0.08, r);

      float core = smoothstep(0.18, 0.0, r);

      gl_FragColor = vec4(
        vColor * (0.65 + core * 0.7),
        alpha * 0.9
      );
    }
  `,
});

const cloud = new THREE.Points(geometry, material);

scene.add(cloud);

// ========================================
// 4. GEOMETRY HELPERS
// ========================================

const makeLine = (a, b) => (t) => [
  a[0] + (b[0] - a[0]) * t,
  a[1] + (b[1] - a[1]) * t,
  a[2] + (b[2] - a[2]) * t,
];

const pathsToPoints = (paths) => {
  const output = new Float32Array(COUNT * 3);

  for (let i = 0; i < COUNT; i++) {
    const path = paths[i % paths.length];

    const t = Math.random();
    const p = path(t);

    const k = i * 3;
    const fuzz = 0.024;

    output[k] =
      p[0] + (Math.random() - 0.5) * fuzz;

    output[k + 1] =
      p[1] + (Math.random() - 0.5) * fuzz;

    output[k + 2] =
      p[2] + (Math.random() - 0.5) * fuzz;
  }

  return output;
};

const ellipse = (
  rx,
  ry,
  z = 0,
  cx = 0,
  cy = 0
) => (t) => {
  const a = t * Math.PI * 2;

  return [
    cx + Math.cos(a) * rx,
    cy + Math.sin(a) * ry,
    z,
  ];
};

const rectangle = (
  x1,
  y1,
  x2,
  y2,
  z = 0
) => {
  const p = [
    [x1, y1, z],
    [x2, y1, z],
    [x2, y2, z],
    [x1, y2, z],
  ];

  return p.map((q, i) =>
    makeLine(q, p[(i + 1) % 4])
  );
};

// ========================================
// 5. SHAPE 01 - DIGITAL GLOBE
// ========================================

function globe() {
  const paths = [];
  const radius = 2.15;

  // Longitude lines
  for (let n = 0; n < 13; n++) {
    const lon = n * Math.PI / 13;

    paths.push((t) => {
      const a = t * Math.PI * 2;

      return [
        radius * Math.cos(a) * Math.cos(lon),
        radius * Math.sin(a),
        radius * Math.cos(a) * Math.sin(lon),
      ];
    });
  }

  // Latitude lines
  for (let j = -4; j <= 4; j++) {
    const lat = j * Math.PI / 12;

    paths.push((t) => {
      const a = t * Math.PI * 2;

      return [
        radius * Math.cos(lat) * Math.cos(a),
        radius * Math.sin(lat),
        radius * Math.cos(lat) * Math.sin(a),
      ];
    });
  }

  return pathsToPoints(paths);
}

// ========================================
// 6. SHAPE 02 - AI PROCESSOR CHIP
// ========================================

function chip() {
  const paths = [
    ...rectangle(-1.45, -1.45, 1.45, 1.45),

    ...rectangle(-0.95, -0.95, 0.95, 0.95),

    ...rectangle(-0.38, -0.38, 0.38, 0.38),
  ];

  // Electrical pins
  for (let i = 0; i < 9; i++) {
    const v = -1.12 + i * 0.28;

    paths.push(
      makeLine([v, 1.45, 0], [v, 2.05, 0])
    );

    paths.push(
      makeLine([v, -1.45, 0], [v, -2.05, 0])
    );

    paths.push(
      makeLine([-1.45, v, 0], [-2.05, v, 0])
    );

    paths.push(
      makeLine([1.45, v, 0], [2.05, v, 0])
    );
  }

  paths.push(
    ellipse(0.34, 0.34, 0.03)
  );

  return pathsToPoints(paths);
}

// ========================================
// 7. SHAPE 03 - SMARTPHONE
// ========================================

function phone() {
  const paths = [];

  // Rounded rectangle outline
  const rounded = (w, h, r) => (t) => {
    const a = t * Math.PI * 2;

    const c = Math.cos(a);
    const s = Math.sin(a);

    return [
      Math.sign(c) * (w / 2 - r) + r * c,
      Math.sign(s) * (h / 2 - r) + r * s,
      0,
    ];
  };

  // Phone outer body
  paths.push(
    rounded(2.65, 4.65, 0.38)
  );

  // Phone screen
  paths.push(
    rounded(2.35, 3.85, 0.22)
  );

  // Speaker
  paths.push(
    ellipse(0.28, 0.07, 0.04, 0, 1.99)
  );

  // Home indicator
  paths.push(
    ellipse(0.13, 0.13, 0.03, 0, -2.03)
  );

  // App icon grid
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 3; col++) {
      const x = -0.76 + col * 0.76;
      const y = 1.15 - row * 0.8;

      paths.push(
        ...rectangle(
          x - 0.23,
          y - 0.23,
          x + 0.23,
          y + 0.23,
          0.05
        )
      );
    }
  }

  return pathsToPoints(paths);
}

// ========================================
// 8. SHAPE 04 - INFINITY LOOP
// ========================================

function infinity() {
  const paths = [];

  for (let j = -5; j <= 5; j++) {
    const z = j * 0.055;

    paths.push((t) => {
      const a = t * 2 * Math.PI;

      const den =
        1 + Math.cos(a) * Math.cos(a);

      return [
        3.2 * Math.sin(a) / den,

        2.6 * Math.sin(a) * Math.cos(a) / den,

        z,
      ];
    });
  }

  return pathsToPoints(paths);
}

// ========================================
// 9. SHAPE SEQUENCE
// ========================================

const shapes = [
  {
    title: 'THE CONNECTED WORLD',
    description: 'Ideas without boundaries.',
    data: globe(),
    seconds: 6.5,
  },
  {
    title: 'AI & AUTOMATION',
    description: 'Intelligence engineered into every workflow.',
    data: chip(),
    seconds: 6.5,
  },
  {
    title: 'APP DEVELOPMENT',
    description: 'Beautiful interfaces. Powerful experiences.',
    data: phone(),
    seconds: 6.5,
  },
  {
    title: 'LIMITLESS INNOVATION',
    description: 'The possibilities never end.',
    data: infinity(),
    seconds: 6.5,
  },
];

let currentIndex = 0;
let elapsed = 0;
let startedAt = 0;

// ========================================
// 10. CHANGE PARTICLE SHAPE
// ========================================

function setShape(index) {
  currentIndex = index;

  targets.set(shapes[index].data);

  startedAt = elapsed;

  const title = document.querySelector('#scene-title');

  const description =
    document.querySelector('#scene-description');

  const number =
    document.querySelector('.scene-number');

  if (title) {
    title.textContent = shapes[index].title;
  }

  if (description) {
    description.textContent =
      shapes[index].description;
  }

  if (number) {
    number.textContent =
      String(index + 1).padStart(2, '0');
  }
}

setShape(0);

// ========================================
// 11. MOUSE INTERACTION
// ========================================

const mouse = {
  x: 0,
  y: 0,
};

window.addEventListener('pointermove', (e) => {
  mouse.x =
    (e.clientX / window.innerWidth - 0.5) * 2;

  mouse.y =
    (e.clientY / window.innerHeight - 0.5) * 2;
});

// ========================================
// 12. RESPONSIVE RESIZE
// ========================================

function resize() {
  const w = container.clientWidth;
  const h = container.clientHeight;

  camera.aspect = w / h;
  camera.updateProjectionMatrix();

  renderer.setSize(w, h);

  renderer.setPixelRatio(
    Math.min(window.devicePixelRatio, 1.7)
  );

  material.uniforms.uPixelRatio.value =
    Math.min(window.devicePixelRatio, 1.7);

  // Place particles on the right side
  cloud.position.x = w < 700 ? 0.5 : 2.35;

  // More room on mobile
  camera.position.z = w < 700 ? 15 : 12.5;
}

resize();

window.addEventListener('resize', resize);

// ========================================
// 13. MAIN ANIMATION LOOP
// ========================================

const clock = new THREE.Clock();

const reducedMotion = window.matchMedia(
  '(prefers-reduced-motion: reduce)'
).matches;

function animate() {
  requestAnimationFrame(animate);

  const dt = Math.min(clock.getDelta(), 0.05);

  if (!reducedMotion) {
    elapsed += dt;
  }

  // Automatic shape switching
  if (
    elapsed - startedAt >=
    shapes[currentIndex].seconds
  ) {
    setShape(
      (currentIndex + 1) % shapes.length
    );
  }

  // Smooth particle morphing
  const ease = 1 - Math.exp(-2.25 * dt);

  for (let i = 0; i < positions.length; i++) {
    positions[i] +=
      (targets[i] - positions[i]) * ease;
  }

  geometry.attributes.position.needsUpdate = true;

  // Subtle mouse interaction
  cloud.rotation.y +=
    (mouse.x * 0.10 - cloud.rotation.y) * 0.025;

  cloud.rotation.x +=
    (-mouse.y * 0.06 - cloud.rotation.x) * 0.025;

  renderer.render(scene, camera);
}

animate();
