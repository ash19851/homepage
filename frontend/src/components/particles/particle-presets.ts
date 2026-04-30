import type { ThemeName } from '../../types'

/* eslint-disable @typescript-eslint/no-explicit-any */
export const particlePresets: Record<ThemeName, any> = {
  cyberpunk: {
    background: { color: 'transparent' },
    particles: {
      number: { value: 50, density: { enable: true } },
      color: { value: ['#ff0055', '#00e5ff', '#b300ff'] },
      shape: { type: 'circle' },
      opacity: { value: 0.35, random: true },
      size: { value: 2, random: true },
      links: { enable: true, color: '#ff0055', opacity: 0.15, distance: 160 },
      move: { enable: true, speed: 1.2, direction: 'none', random: true },
    },
    interactivity: {
      events: {
        onHover: { enable: true, mode: 'repulse' },
      },
      modes: { repulse: { distance: 100 } },
    },
  },

  matrix: {
    background: { color: 'transparent' },
    particles: {
      number: { value: 100, density: { enable: true } },
      color: { value: '#00ff41' },
      shape: { type: 'char', options: { char: { value: ['0', '1', '1', '0', '1', '0', '0', '1'] } } },
      opacity: { value: 0.5, random: true },
      size: { value: 12, random: true },
      move: {
        enable: true,
        speed: 2.5,
        direction: 'bottom',
        straight: true,
        outModes: 'out',
      },
    },
    emitters: [
      {
        direction: 'top',
        position: { x: 10, y: 0 },
        rate: { delay: 0.3, quantity: 1 },
        size: { width: 0, height: 0 },
        particles: { color: '#00ff41' },
        life: { duration: 0, count: 0 },
      },
      {
        direction: 'top',
        position: { x: 30, y: 0 },
        rate: { delay: 0.4, quantity: 1 },
        size: { width: 0, height: 0 },
        particles: { color: '#00cc33' },
        life: { duration: 0, count: 0 },
      },
      {
        direction: 'top',
        position: { x: 55, y: 0 },
        rate: { delay: 0.25, quantity: 1 },
        size: { width: 0, height: 0 },
        particles: { color: '#00ff41' },
        life: { duration: 0, count: 0 },
      },
      {
        direction: 'top',
        position: { x: 75, y: 0 },
        rate: { delay: 0.35, quantity: 1 },
        size: { width: 0, height: 0 },
        particles: { color: '#008f11' },
        life: { duration: 0, count: 0 },
      },
      {
        direction: 'top',
        position: { x: 90, y: 0 },
        rate: { delay: 0.3, quantity: 1 },
        size: { width: 0, height: 0 },
        particles: { color: '#00ff41' },
        life: { duration: 0, count: 0 },
      },
    ],
  },

  aurora: {
    background: { color: 'transparent' },
    particles: {
      number: { value: 30, density: { enable: true } },
      color: { value: ['#00e5a0', '#0088ff', '#8844ff', '#00d4ff'] },
      shape: { type: 'circle' },
      opacity: { value: 0.4, animation: { enable: true, speed: 0.4, sync: false } },
      size: { value: 120, random: true },
      move: { enable: true, speed: 0.3, direction: 'none', random: true },
    },
    interactivity: {
      events: {
        onHover: { enable: true, mode: 'bubble' },
      },
      modes: {
        bubble: { distance: 200, size: 180, opacity: 0.2 },
      },
    },
  },

  void: {
    background: { color: 'transparent' },
    particles: {
      number: { value: 150, density: { enable: true } },
      color: { value: ['#ffffff', '#aaccff', '#8866cc'] },
      shape: { type: 'circle' },
      opacity: { value: 0.5, random: true, animation: { enable: true, speed: 0.2, sync: false } },
      size: { value: 1.5, random: true },
      move: { enable: true, speed: 0.08, direction: 'none', random: true },
    },
  },

  synthwave: {
    background: { color: 'transparent' },
    particles: {
      number: { value: 60, density: { enable: true } },
      color: { value: ['#ff6b35', '#ff00ff', '#00e5ff'] },
      shape: { type: 'polygon', polygon: { sides: 5 } },
      opacity: { value: 0.4, random: true },
      size: { value: 3, random: true },
      move: {
        enable: true,
        speed: 2,
        direction: 'top-right',
        straight: true,
        outModes: 'out',
      },
    },
    interactivity: {
      events: {
        onHover: { enable: true, mode: 'repulse' },
      },
      modes: { repulse: { distance: 80 } },
    },
  },

  'minimal-white': {
    background: { color: 'transparent' },
    particles: {
      number: { value: 25, density: { enable: true } },
      color: { value: ['#d4b860', '#c9a87c', '#b8935a'] },
      shape: { type: 'circle' },
      opacity: { value: 0.2, random: true, animation: { enable: true, speed: 0.3, sync: false } },
      size: { value: 1.5, random: true },
      move: { enable: true, speed: 0.3, direction: 'none', random: true },
    },
  },

  glassmorphism: {
    background: { color: 'transparent' },
    particles: {
      number: { value: 35, density: { enable: true } },
      color: { value: ['#e94560', '#533483', '#0f3460', '#ff6b81'] },
      shape: { type: 'circle' },
      opacity: { value: 0.5, random: true, animation: { enable: true, speed: 0.5, sync: false } },
      size: { value: 180, random: true },
      move: { enable: true, speed: 0.2, direction: 'none', random: true },
    },
    interactivity: {
      events: {
        onHover: { enable: true, mode: 'bubble' },
      },
      modes: {
        bubble: { distance: 250, size: 220, opacity: 0.15 },
      },
    },
  },

  'ink-art': {
    background: { color: 'transparent' },
    particles: {
      number: { value: 20, density: { enable: true } },
      color: { value: ['#3a3020', '#5c4c30', '#8b7355'] },
      shape: { type: 'circle' },
      opacity: { value: 0.12, random: true, animation: { enable: true, speed: 0.2, sync: false } },
      size: { value: 3, random: true },
      move: {
        enable: true,
        speed: 0.4,
        direction: 'bottom',
        straight: false,
        random: true,
      },
    },
  },

  memphis: {
    background: { color: 'transparent' },
    particles: {
      number: { value: 40, density: { enable: true } },
      color: { value: ['#ff6b6b', '#4ecdc4', '#ffe66d', '#1a1a2e'] },
      shape: { type: 'polygon', polygon: { sides: 6 } },
      opacity: { value: 0.35, random: true },
      size: { value: 4, random: true },
      move: {
        enable: true,
        speed: 1.5,
        direction: 'top',
        straight: false,
        random: true,
        outModes: 'bounce',
      },
    },
    interactivity: {
      events: {
        onHover: { enable: true, mode: 'repulse' },
      },
      modes: { repulse: { distance: 120 } },
    },
  },
}
