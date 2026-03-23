import Link from "next/link";
import { MoreHorizontal, ChevronRight } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const templates = [
  { title: "Crop Image", desc: "Cut your image to any size or aspect ratio manually.", href: "/crop" },
  { title: "Rotate Image", desc: "Rotate images 90, 180 or 270 degrees clockwise.", href: "/rotate" },
  { title: "Flip Image", desc: "Flip images horizontally or vertically for mirror effects.", href: "/rotate?action=flip" },
  { title: "India NEET Postcard", desc: "4x6 inches, white background, max 200 KB for exam.", href: "/resize?preset=neet-postcard" },
  { title: "A4 Size (PDF/Print)", desc: "8.27x11.69 inches. Global standard document size.", href: "/resize?preset=A4" },
  { title: "Letter Size", desc: "8.5x11 inches. Standard paper size in the US and Canada.", href: "/resize?preset=Letter" },
  { title: "Legal Size", desc: "8.5x14 inches. Specialized long format document size.", href: "/resize?preset=Legal" },
  { title: "Resize & Reduce Image", desc: "Set both target dimensions and maximum file size simultaneously.", href: "/resize" },
  { title: "Increase Size (KB)", desc: "Enlarge image file size to meet minimum portal requirements.", href: "/increase-size" },
  { title: "Format Converter", desc: "Change image format between JPG, PNG, WEBP and more.", href: "/format-converter" },
  { title: "DPI Changer", desc: "Change image DPI (300, 600, etc.) for high-quality printing.", href: "/dpi-changer" },
  { title: "PAN Card Photo", desc: "3.5x2.5 cm photo specifically for Indian PAN cards.", href: "/resize?w=3.5&h=2.5&unit=cm" },
  { title: "Aadhar Card Photo", desc: "4.41x12.91 cm scan format for Aadhar card updates.", href: "/resize?w=4.41&h=12.91&unit=cm" },
];

export default function SpecialKeywordsTemplatesPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Breadcrumbs */}
      <nav className="container px-4 py-4 flex items-center text-sm text-muted-foreground">
        <Link href="/" className="hover:text-primary transition-colors">Home</Link>
        <ChevronRight className="w-4 h-4 mx-2" />
        <Link href="/templates" className="hover:text-primary transition-colors">Templates</Link>
        <ChevronRight className="w-4 h-4 mx-2" />
        <span className="text-foreground font-medium">Special Keywords</span>
      </nav>

      {/* Hero Section */}
      <section className="bg-muted/30 py-16 md:py-24 border-b">
        <div className="container px-4 md:px-6 text-center">
          <div className="mx-auto max-w-[800px] space-y-4">
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
              Special <span className="text-primary">Keywords</span> & Tools
            </h1>
            <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl mt-6">
              Specific templates for exams, paper sizes, and advanced image editing tools.
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
                      {item.title}
                    </CardTitle>
                    <CardDescription className="text-sm leading-relaxed line-clamp-4 text-muted-foreground/80">
                      Access our {item.title} tool. Free, no login required, 100% private. Best for professional document preparation.
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
