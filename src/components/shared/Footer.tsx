import Link from "next/link";
import { Image as ImageIcon } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full border-t bg-background py-12">
      <div className="container px-4 md:px-6">
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5">
          <div className="col-span-2">
            <Link href="/" className="flex items-center space-x-2">
              <ImageIcon className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold">PixelPerfect</span>
            </Link>
            <p className="mt-4 text-sm text-muted-foreground max-w-xs">
              Professional-grade image resizing, compression, and conversion tools. 100% client-side, secure and fast.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold mb-4">Tools</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/resize" className="text-muted-foreground hover:text-primary transition-colors">Resize Image</Link></li>
              <li><Link href="/reduce-size" className="text-muted-foreground hover:text-primary transition-colors">Compress Image</Link></li>
              <li><Link href="/crop" className="text-muted-foreground hover:text-primary transition-colors">Crop Image</Link></li>
              <li><Link href="/rotate" className="text-muted-foreground hover:text-primary transition-colors">Rotate Image</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold mb-4">Presets</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/passport-photo" className="text-muted-foreground hover:text-primary transition-colors">Passport Photo</Link></li>
              <li><Link href="/passport-photo" className="text-muted-foreground hover:text-primary transition-colors">Visa Photo</Link></li>
              <li><Link href="/resize" className="text-muted-foreground hover:text-primary transition-colors">Social Media</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="#" className="text-muted-foreground hover:text-primary transition-colors">About Us</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-primary transition-colors">Privacy Policy</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-primary transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} PixelPerfect. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
