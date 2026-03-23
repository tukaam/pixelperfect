import Link from "next/link";
import { 
  MoveDiagonal, 
  Shrink, 
  Crop, 
  RotateCw, 
  Image as ImageIcon, 
  FileCheck, 
  Printer, 
  LayoutTemplate,
  Maximize2,
  FileImage,
  Scissors,
  FileDown,
  RotateCcw,
  RefreshCcw,
  Languages,
  Instagram,
  Facebook,
  Youtube,
  Twitter,
  Linkedin,
  MessageCircle,
  FileText,
  BadgeCheck,
  Zap,
  TrendingUp,
  ChevronRight,
  ShieldCheck,
  UserCircle
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const toolCategories = [
  {
    name: "Core Editing Tools",
    description: "Essential tools for image transformation",
    tools: [
      { title: "Resize Image", icon: MoveDiagonal, href: "/resize", color: "bg-blue-600", desc: "Change dimensions" },
      { title: "Compress Image", icon: Shrink, href: "/reduce-size", color: "bg-green-600", desc: "Reduce file size" },
      { title: "Increase Size", icon: TrendingUp, href: "/increase-size", color: "bg-indigo-600", desc: "Meet minimum KB" },
      { title: "Crop Image", icon: Scissors, href: "/crop", color: "bg-orange-600", desc: "Trim edges" },
      { title: "Rotate & Flip", icon: RotateCw, href: "/rotate", color: "bg-purple-600", desc: "Change orientation" },
      { title: "Convert Format", icon: FileCheck, href: "/format-converter", color: "bg-yellow-600", desc: "JPG, PNG, WEBP" },
    ]
  },
  {
    name: "Social Media Templates",
    description: "Perfect sizes for all your platforms",
    tools: [
      { title: "Instagram", icon: Instagram, href: "/resize-image-for-instagram", color: "bg-pink-600", desc: "Posts, Stories" },
      { title: "Facebook", icon: Facebook, href: "/resize-image-for-facebook", color: "bg-blue-700", desc: "Profile, Cover" },
      { title: "YouTube", icon: Youtube, href: "/resize-image-for-youtube", color: "bg-red-600", desc: "Thumbnails" },
      { title: "TikTok", icon: MessageCircle, href: "/resize-image-for-tiktok", color: "bg-black", desc: "Video, Profile" },
      { title: "Twitter (X)", icon: Twitter, href: "/resize-image-for-twitter", color: "bg-sky-500", desc: "Post, Header" },
      { title: "LinkedIn", icon: Linkedin, href: "/resize-image-for-linkedin", color: "bg-blue-800", desc: "Cover, Post" },
    ]
  },
  {
    name: "Quick Presets",
    description: "Fast resizing for common needs",
    tools: [
      { title: "600x600 px", icon: Maximize2, href: "/resize?preset=600x600", color: "bg-sky-600", desc: "Square" },
      { title: "A4 Size", icon: FileText, href: "/resize?preset=A4", color: "bg-slate-600", desc: "Paper format" },
      { title: "Letter Size", icon: FileText, href: "/resize?preset=Letter", color: "bg-slate-500", desc: "Paper format" },
      { title: "Target 20 KB", icon: FileDown, href: "/reduce-size?target=20kb", color: "bg-green-500", desc: "Max compression" },
      { title: "Target 50 KB", icon: FileDown, href: "/reduce-size?target=50kb", color: "bg-green-400", desc: "High compression" },
      { title: "Target 100 KB", icon: FileDown, href: "/reduce-size?target=100kb", color: "bg-green-300", desc: "Medium compression" },
    ]
  }
];

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-muted/30 py-12 md:py-28 border-b">
        <div className="container px-4 md:px-6 text-center">
          <div className="mx-auto max-w-[900px] space-y-4">
            <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-xs md:text-sm text-primary font-medium mb-2 md:mb-4">
              <Zap className="w-3.5 h-3.5 md:w-4 md:h-4 inline mr-2" />
              Fast & Secure Processing
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl leading-tight">
              Professional <span className="text-primary">Image Resizer</span>
            </h1>
            <p className="mx-auto max-w-[700px] text-muted-foreground text-sm md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed mt-4">
              The complete toolbox to resize, compress, crop, and convert your images. 
              Built for speed and precision.
            </p>
            <div className="flex flex-col gap-3 min-[400px]:flex-row justify-center pt-6 md:pt-8 px-4">
              <Button size="lg" className="h-12 md:h-14 px-8 text-base font-semibold shadow-xl shadow-primary/20 rounded-xl" asChild>
                <Link href="/resize">Upload Images</Link>
              </Button>
              <Button size="lg" variant="outline" className="h-12 md:h-14 px-8 text-base font-semibold rounded-xl" asChild>
                <Link href="/templates">Browse Templates</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Tools Sections */}
      {toolCategories.map((category, idx) => (
        <section key={category.name} className={cn("py-12 md:py-24", idx % 2 === 1 ? "bg-muted/20" : "bg-background")}>
          <div className="container px-4 md:px-6">
            <div className="flex flex-col mb-8 md:mb-12 text-center md:text-left">
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-2">{category.name}</h2>
              <p className="text-muted-foreground text-base md:text-lg">{category.description}</p>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3 md:gap-6">
              {category.tools.map((tool) => (
                <Link key={tool.title} href={tool.href} className="group">
                  <Card className="h-full border-muted/60 transition-all duration-300 group-hover:shadow-lg group-hover:border-primary/40 group-hover:-translate-y-1 rounded-2xl">
                    <CardHeader className="p-4 md:p-6 flex flex-col items-center text-center">
                      <div className={cn("w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center mb-3 md:mb-4 transition-transform group-hover:rotate-6 group-hover:scale-110 shadow-md", tool.color)}>
                        <tool.icon className="text-white w-5 h-5 md:w-6 md:h-6" />
                      </div>
                      <CardTitle className="text-[13px] md:text-base group-hover:text-primary transition-colors line-clamp-1 font-bold">{tool.title}</CardTitle>
                      <CardDescription className="text-[10px] md:text-xs mt-1 hidden md:block">
                        {tool.desc}
                      </CardDescription>
                    </CardHeader>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* Trust Section */}
      <section className="bg-muted/30 py-16 md:py-24 border-y">
        <div className="container px-4 md:px-6">
          <div className="grid gap-8 md:gap-12 lg:grid-cols-3">
            <div className="flex flex-col items-center text-center space-y-3 md:space-y-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Maximize2 className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold">Fast Resizing</h3>
              <p className="text-muted-foreground text-sm md:text-base">High-performance algorithms for instant image scaling across all devices and platforms.</p>
            </div>
            <div className="flex flex-col items-center text-center space-y-3 md:space-y-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <RefreshCcw className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold">Bulk Processing</h3>
              <p className="text-muted-foreground text-sm md:text-base">Upload multiple photos and apply settings to all of them at once. Save time with our high-performance engine.</p>
            </div>
            <div className="flex flex-col items-center text-center space-y-3 md:space-y-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <BadgeCheck className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold">Professional Quality</h3>
              <p className="text-muted-foreground text-sm md:text-base">Advanced interpolation ensure your images remain sharp and clear even after significant resizing.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
