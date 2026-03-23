import Link from "next/link";
import { Image as ImageIcon } from "lucide-react";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <div className="rounded-lg bg-primary p-1">
            <ImageIcon className="h-6 w-6 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold tracking-tight">PixelPerfect</span>
        </Link>
        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
          <Link href="/resize" className="transition-colors hover:text-primary">Resize</Link>
          <Link href="/reduce-size" className="transition-colors hover:text-primary">Compress</Link>
          <Link href="/templates" className="transition-colors hover:text-primary">Templates</Link>
          <Link href="/crop" className="transition-colors hover:text-primary">Crop</Link>
        </nav>
      </div>
    </header>
  );
}
