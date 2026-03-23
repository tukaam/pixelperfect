"use client";

import { PlatformEditor, PlatformPreset } from '@/components/editor/PlatformEditor';

const presets: PlatformPreset[] = [
  { name: "Thumbnail", width: 1280, height: 720, unit: 'px', ratio: "16:9" },
  { name: "Banner", width: 2560, height: 1440, unit: 'px', ratio: "16:9" },
  { name: "Profile", width: 800, height: 800, unit: 'px', ratio: "1:1" },
];

export default function YoutubePage() {
  return <PlatformEditor platformName="YouTube" presets={presets} slug="youtube" />;
}
