"use client";

import { PlatformEditor, PlatformPreset } from '@/components/editor/PlatformEditor';

const presets: PlatformPreset[] = [
  { name: "Profile Photo", width: 400, height: 400, unit: 'px', ratio: "1:1" },
  { name: "Cover Photo", width: 1584, height: 396, unit: 'px', ratio: "4:1" },
  { name: "Article Cover", width: 1920, height: 1080, unit: 'px', ratio: "16:9" },
  { name: "Feed Post Image", width: 1200, height: 627, unit: 'px', ratio: "1.91:1" },
];

export default function LinkedinPage() {
  return <PlatformEditor platformName="LinkedIn" presets={presets} slug="linkedin" />;
}
