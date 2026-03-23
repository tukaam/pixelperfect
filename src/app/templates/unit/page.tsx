import Link from "next/link";
import { MoveDiagonal, Shrink, ChevronRight as ChevronRightIcon } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const templates = [
  { title: "Resize in Pixels", desc: "Adjust image width and height using digital pixel units.", href: "/resize?unit=px", icon: MoveDiagonal },
  { title: "Resize in Inches", desc: "Convert digital images to physical inch dimensions for printing.", href: "/resize?unit=inch", icon: MoveDiagonal },
  { title: "Resize in Centimeters", desc: "Use the metric system for international print and ID standards.", href: "/resize?unit=cm", icon: MoveDiagonal },
  { title: "Resize in Millimeters", desc: "High-precision metric resizing for official documents.", href: "/resize?unit=mm", icon: MoveDiagonal },
  { title: "Compress in KB", desc: "Target a precise file size limit in Kilobytes (KB).", href: "/reduce-size?unit=kb", icon: Shrink },
  { title: "Compress in MB", desc: "Set a maximum file size limit in Megabytes (MB).", href: "/reduce-size?unit=mb", icon: Shrink },
];

export default function UnitTemplatesPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Breadcrumbs */}
      <nav className="container px-4 py-4 flex items-center text-sm text-muted-foreground">
        <Link href="/" className="hover:text-primary transition-colors">Home</Link>
        <ChevronRightIcon className="w-4 h-4 mx-2" />
        <Link href="/templates" className="hover:text-primary transition-colors">Templates</Link>
        <ChevronRightIcon className="w-4 h-4 mx-2" />
        <span className="text-foreground font-medium">Resize by Unit</span>
      </nav>

      {/* Hero Section */}
      <section className="bg-muted/30 py-16 md:py-24 border-b">
        <div className="container px-4 md:px-6 text-center">
          <div className="mx-auto max-w-[800px] space-y-4">
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
              Resize by <span className="text-primary">Unit</span>
            </h1>
            <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl mt-6">
              Full control over image dimensions and file sizes using pixels, inches, or metric units.
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
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                        <item.icon className="w-6 h-6 text-primary" />
                    </div>
                    <CardTitle className="text-lg md:text-xl mb-3 group-hover:text-primary transition-colors leading-tight">
                      {item.title}
                    </CardTitle>
                    <CardDescription className="text-sm leading-relaxed line-clamp-4 text-muted-foreground/80">
                      Access our {item.title} tool. Free, no login required, 100% private. Best for precision resizing and compression.
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
