"use client";

import { PlatformEditor, PlatformPreset } from '@/components/editor/PlatformEditor';

const presets: PlatformPreset[] = [
  { name: "Profile Picture", width: 320, height: 320, unit: 'px', ratio: "1:1" },
  { name: "Cover Photo", width: 851, height: 315, unit: 'px', ratio: "2.7:1" },
  { name: "Story", width: 1080, height: 1920, unit: 'px', ratio: "9:16" },
  { name: "Event Cover", width: 1920, height: 1005, unit: 'px', ratio: "1.91:1" },
  { name: "Feed Post", width: 1200, height: 630, unit: 'px', ratio: "1.91:1" },
  { name: "Group Cover", width: 1640, height: 856, unit: 'px', ratio: "1.91:1" },
];

export default function FacebookPage() {
  return <PlatformEditor platformName="Facebook" presets={presets} slug="facebook" />;
}
