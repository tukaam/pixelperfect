import Link from "next/link";
import { MoveDiagonal, Shrink, Layout, MoreHorizontal, Share2, Zap, UserCircle, BadgeCheck } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const categories = [
  { id: "resize", label: "Resize", icon: MoveDiagonal, href: "/templates/resize" },
  { id: "compress", label: "Compress", icon: Shrink, href: "/templates/compress" },
  { id: "unit", label: "Unit", icon: Layout, href: "/templates/unit" },
  { id: "others", label: "Others", icon: MoreHorizontal, href: "/templates/special-keywords" },
  { id: "social", label: "Social", icon: Share2, href: "/templates/social" },
];

const initialTemplates = [
  { title: "1.5x1.5 inches", desc: "Standard small square print size.", href: "/resize?w=1.5&h=1.5&unit=inch" },
  { title: "1x1 inches", desc: "Mini square photo print format.", href: "/resize?w=1&h=1&unit=inch" },
  { title: "1.38x1.77 inches", desc: "International passport size variant.", href: "/resize?w=1.38&h=1.77&unit=inch" },
  { title: "1.38x1.38 inches", desc: "Common square ID photo format.", href: "/resize?w=1.38&h=1.38&unit=inch" },
  { title: "1.18x1.57 inches", desc: "Metric ID photo standard (3x4 cm).", href: "/resize?w=1.18&h=1.57&unit=inch" },
  { title: "1.97x2.76 inches", desc: "Large format ID or permit photo.", href: "/resize?w=1.97&h=2.76&unit=inch" },
  { title: "1.3x1.89 inches", desc: "Common European visa photo size.", href: "/resize?w=1.3&h=1.89&unit=inch" },
  { title: "4x6 inches", desc: "Standard postcard and photo print size.", href: "/resize?w=4&h=6&unit=inch" },
];

export default function TemplatesPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-muted/30 py-12 md:py-24 border-b">
        <div className="container px-4 md:px-6 text-center">
          <div className="mx-auto max-w-[800px] space-y-4">
            <h1 className="text-3xl md:text-7xl font-extrabold tracking-tight mb-4 text-slate-900 leading-tight">
              Image Resize <span className="text-primary">Templates</span>
            </h1>
            <p className="mx-auto max-w-[700px] text-muted-foreground text-base md:text-xl mt-4 font-medium">
              Quick access to popular image resize dimensions for social media, print, web, and more
            </p>
          </div>
        </div>
      </section>

      {/* Categories Navigation */}
      <section className="py-6 md:py-12 bg-background border-b sticky top-16 z-40 backdrop-blur-md bg-white/80 overflow-x-auto">
        <div className="container px-4 md:px-6 flex justify-start md:justify-center">
          <div className="inline-flex items-center rounded-xl md:rounded-2xl bg-slate-100 p-1 md:p-1.5 shadow-inner">
            {categories.map((cat) => (
              <Link 
                key={cat.id} 
                href={cat.href}
                className={cn(
                  "inline-flex items-center justify-center whitespace-nowrap rounded-lg md:rounded-xl px-4 md:px-8 py-2 md:py-3.5 text-[11px] md:text-sm font-black transition-all hover:bg-white/50",
                  cat.id === 'resize' ? "bg-white text-slate-900 shadow-md" : "text-slate-500"
                )}
              >
                <cat.icon className="w-3.5 h-3.5 md:w-4 md:h-4 mr-1.5 md:mr-2 shrink-0" />
                {cat.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Initial Grid Section */}
      <section className="py-12 md:py-16 bg-background">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {initialTemplates.map((item, idx) => (
              <Link key={idx} href={item.href} className="group">
                <Card className="h-full border-slate-200/60 rounded-2xl md:rounded-[2rem] transition-all duration-300 group-hover:shadow-2xl group-hover:border-primary/40 group-hover:-translate-y-2 overflow-hidden bg-slate-50/30">
                  <CardHeader className="p-6 md:p-8">
                    <CardTitle className="text-lg md:text-2xl mb-3 md:mb-4 group-hover:text-primary transition-colors leading-tight font-black">
                      Resize image to {item.title}
                    </CardTitle>
                    <CardDescription className="text-sm leading-relaxed line-clamp-4 text-slate-500 font-medium">
                      Resize your photos to {item.title}. Fast, professional quality results. Supports JPG, JPEG, PNG & WebP formats for all your needs.
                    </CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            ))}
          </div>
          
          <div className="mt-12 md:mt-16 text-center">
            <Button size="lg" className="rounded-xl md:rounded-2xl h-12 md:h-14 px-8 md:px-10 text-base md:text-lg font-black shadow-xl shadow-primary/20" asChild>
                <Link href="/templates/resize">View All Resize Templates</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Trust & Features Section */}
      <section className="py-16 md:py-24 bg-slate-50 border-t">
        <div className="container px-4 md:px-6">
          <div className="grid gap-12 lg:grid-cols-3">
            <div className="flex flex-col items-center text-center space-y-4 md:space-y-6">
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl md:rounded-3xl bg-indigo-600/10 flex items-center justify-center text-indigo-600">
                <Zap className="w-8 h-8 md:w-10 md:h-10" />
              </div>
              <div className="space-y-2 px-4 md:px-0">
                <h3 className="text-xl md:text-2xl font-black text-slate-900">Lightning Fast</h3>
                <p className="text-slate-500 text-sm md:text-base font-medium leading-relaxed">High-performance processing with instant results. No waiting or long processing times.</p>
              </div>
            </div>
            <div className="flex flex-col items-center text-center space-y-4 md:space-y-6">
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl md:rounded-3xl bg-indigo-600/10 flex items-center justify-center text-indigo-600">
                <UserCircle className="w-8 h-8 md:w-10 md:h-10" />
              </div>
              <div className="space-y-2 px-4 md:px-0">
                <h3 className="text-xl md:text-2xl font-black text-slate-900">Easy to Use</h3>
                <p className="text-slate-500 text-sm md:text-base font-medium leading-relaxed">Intuitive interface designed for everyone. Resize images in just a few clicks.</p>
              </div>
            </div>
            <div className="flex flex-col items-center text-center space-y-4 md:space-y-6">
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl md:rounded-3xl bg-indigo-600/10 flex items-center justify-center text-indigo-600">
                <BadgeCheck className="w-8 h-8 md:w-10 md:h-10" />
              </div>
              <div className="space-y-2 px-4 md:px-0">
                <h3 className="text-xl md:text-2xl font-black text-slate-900">High Quality</h3>
                <p className="text-slate-500 text-sm md:text-base font-medium leading-relaxed">Professional algorithms ensure your images stay sharp and clear, regardless of the target size.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
