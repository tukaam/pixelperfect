"use client";

import { PlatformEditor, PlatformPreset } from '@/components/editor/PlatformEditor';

const presets: PlatformPreset[] = [
  { name: "Video Post", width: 1080, height: 1920, unit: 'px', ratio: "9:16" },
  { name: "Story Cover", width: 1080, height: 1920, unit: 'px', ratio: "9:16" },
  { name: "Profile Photo", width: 200, height: 200, unit: 'px', ratio: "1:1" },
];

export default function TiktokPage() {
  return <PlatformEditor platformName="TikTok" presets={presets} slug="tiktok" />;
}
