"use client";

import { PlatformEditor, PlatformPreset } from '@/components/editor/PlatformEditor';

const presets: PlatformPreset[] = [
  { name: "Profile picture", width: 1080, height: 1080, unit: 'px', ratio: "1:1" },
  { name: "Post - square", width: 1080, height: 1080, unit: 'px', ratio: "1:1" },
  { name: "Post - portrait", width: 1080, height: 1350, unit: 'px', ratio: "4:5" },
  { name: "Post - landscape", width: 1080, height: 566, unit: 'px', ratio: "1.91:1" },
  { name: "Story", width: 1080, height: 1920, unit: 'px', ratio: "9:16" },
  { name: "Reels", width: 1080, height: 1920, unit: 'px', ratio: "9:16" },
  { name: "Reels cover", width: 1080, height: 1920, unit: 'px', ratio: "9:16" },
];

export default function InstagramPage() {
  return <PlatformEditor platformName="Instagram" presets={presets} slug="instagram" />;
}
