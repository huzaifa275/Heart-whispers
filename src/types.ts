/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface SpecialCard {
  id: string;
  icon: string; // Emoji or Lucide icon name
  title: string;
  description: string;
  color: string; // Tailwind color classes
  glowColor: string;
}

export interface StarMessage {
  id: number;
  text: string;
  x: number; // percentage width
  y: number; // percentage height
  size: number; // size in pixels
  color: string;
  twinkleDelay: string;
}

export interface FloatingHeart {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  speedY: number;
  speedX: number;
  opacity: number;
  rotation: number;
  spinSpeed: number;
  hasSparkles: boolean;
}

export interface Butterfly {
  id: number;
  x: number;
  y: number;
  scale: number;
  angle: number;
  speed: number;
  wingSpeed: number;
  color: string;
  glow: string;
}
