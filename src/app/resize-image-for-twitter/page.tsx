"use client";

import { PlatformEditor, PlatformPreset } from '@/components/editor/PlatformEditor';

const presets: PlatformPreset[] = [
  { name: "Profile Photo", width: 400, height: 400, unit: 'px', ratio: "1:1" },
  { name: "Header Photo", width: 1500, height: 500, unit: 'px', ratio: "3:1" },
  { name: "Post Image", width: 1600, height: 900, unit: 'px', ratio: "16:9" },
];

export default function TwitterPage() {
  return <PlatformEditor platformName="Twitter (X)" presets={presets} slug="twitter" />;
}
