import Link from "next/link";
import { Shrink, ChevronRight, Zap, UserCircle, BadgeCheck } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const templates = [
  { title: "20 KB", desc: "High compression. Required for many online government application forms.", href: "/reduce-size?target=20kb" },
  { title: "50 KB", desc: "Standard compression. Balanced quality for email and portal uploads.", href: "/reduce-size?target=50kb" },
  { title: "100 KB", desc: "Medium compression. Maintains good visual clarity for web sharing.", href: "/reduce-size?target=100kb" },
  { title: "200 KB", desc: "Low compression. Ideal for India NEET and other exam applications.", href: "/reduce-size?target=200kb" },
  { title: "500 KB", desc: "Minimal compression. High quality for social media and blogs.", href: "/reduce-size?target=500kb" },
  { title: "1 MB", desc: "Professional quality. Best for printing and high-res digital sharing.", href: "/reduce-size?target=1mb" },
  { title: "2 MB", desc: "Near-lossless quality. Best for photography and large displays.", href: "/reduce-size?target=2mb" },
  { title: "5 MB", desc: "Maximum quality. Best for large format prints and professional archives.", href: "/reduce-size?target=5mb" },
  { title: "10 KB", desc: "Maximum compression for ultra-low file size requirements.", href: "/reduce-size?target=10kb" },
  { title: "15 KB", desc: "Highly compressed image for specialized web forms.", href: "/reduce-size?target=15kb" },
  { title: "25 KB", desc: "Common target for digital signature and small photo uploads.", href: "/reduce-size?target=25kb" },
  { title: "30 KB", desc: "Optimized for NEET signature and other small application items.", href: "/reduce-size?target=30kb" },
];

export default function CompressTemplatesPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Breadcrumbs */}
      <nav className="container px-4 py-4 flex items-center text-sm text-muted-foreground">
        <Link href="/" className="hover:text-primary transition-colors">Home</Link>
        <ChevronRight className="w-4 h-4 mx-2" />
        <Link href="/templates" className="hover:text-primary transition-colors">Templates</Link>
        <ChevronRight className="w-4 h-4 mx-2" />
        <span className="text-foreground font-medium">Compress</span>
      </nav>

      {/* Hero Section */}
      <section className="bg-muted/30 py-16 md:py-24 border-b">
        <div className="container px-4 md:px-6 text-center">
          <div className="mx-auto max-w-[800px] space-y-4">
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
              Image <span className="text-primary">Compression</span> Templates
            </h1>
            <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl mt-6">
              Quickly reduce image file size to meet specific KB or MB requirements.
            </p>
          </div>
        </div>
      </section>

      {/* Grid Section */}
      <section className="py-12 bg-background">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {templates.map((item, idx) => (
              <Link key={idx} href={item.href} className="group">
                <Card className="h-full border-muted/60 transition-all duration-300 group-hover:shadow-2xl group-hover:border-primary/40 group-hover:-translate-y-2 overflow-hidden bg-card/50 backdrop-blur-sm">
                  <CardHeader className="p-6">
                    <CardTitle className="text-lg md:text-xl mb-3 group-hover:text-primary transition-colors leading-tight">
                      Compress image to {item.title}
                    </CardTitle>
                    <CardDescription className="text-sm leading-relaxed line-clamp-4 text-muted-foreground/80">
                      Compress your photos to {item.title}. Free, no login required, 100% private — images never leave your device. Supports JPG, JPEG, PNG & WebP.
                    </CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
