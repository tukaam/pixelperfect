import Link from "next/link";
import { MoveDiagonal, ChevronRight, Zap, UserCircle, BadgeCheck } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const templates = [
  { title: "600x600 px", desc: "Square format, common for profile photos and social media posts.", href: "/resize?w=600&h=600&unit=px" },
  { title: "1280x720 px", desc: "HD resolution, 16:9 aspect ratio. Ideal for video and web banners.", href: "/resize?w=1280&h=720&unit=px" },
  { title: "1920x1080 px", desc: "Full HD resolution. Standard for monitors and high-quality web images.", href: "/resize?w=1920&h=1080&unit=px" },
  { title: "2560x1440 px", desc: "2K QHD resolution. Perfect for high-end displays and retina screens.", href: "/resize?w=2560&h=1440&unit=px" },
  { title: "500x500 px", desc: "WhatsApp DP size. Optimized for profile pictures.", href: "/resize?w=500&h=500&unit=px" },
  { title: "1080x1080 px", desc: "Instagram post size. Professional square format.", href: "/resize?w=1080&h=1080&unit=px" },
  { title: "1080x1920 px", desc: "Instagram story size. Portrait orientation for mobile viewing.", href: "/resize?w=1080&h=1920&unit=px" },
  { title: "1200x630 px", desc: "Facebook post size. Optimized for feed visibility.", href: "/resize?w=1200&h=630&unit=px" },
  { title: "1125x633 px", desc: "Facebook cover size. Optimized for desktop and mobile.", href: "/resize?w=1125&h=633&unit=px" },
  { title: "1024x512 px", desc: "Twitter post size. Best for landscape orientation.", href: "/resize?w=1024&h=512&unit=px" },
  { title: "1280x720 px", desc: "YouTube thumbnail size. Attract viewers with HD clarity.", href: "/resize?w=1280&h=720&unit=px" },
  { title: "2560x1440 px", desc: "YouTube banner size. High resolution for all devices.", href: "/resize?w=2560&h=1440&unit=px" },
  { title: "1x1 inch", desc: "Small square print size. Perfect for mini photo prints.", href: "/resize?w=1&h=1&unit=inch" },
  { title: "2x2 inch", desc: "Passport/Visa size standard (US). High-quality ID photo.", href: "/resize?w=2&h=2&unit=inch" },
  { title: "8.27x11.69 inch", desc: "A4 paper size. International standard for documents and prints.", href: "/resize?preset=A4" },
  { title: "8.5x11 inch", desc: "US Letter size. Standard paper format in North America.", href: "/resize?preset=Letter" },
  { title: "2.5x3.5 inch", desc: "India NEET passport photo size. Specifically for exam applications.", href: "/resize?w=2.5&h=3.5&unit=inch" },
  { title: "3.5x4.5 cm", desc: "Standard passport/visa size for EU, India and many other countries.", href: "/resize?w=3.5&h=4.5&unit=cm" },
  { title: "2.5x3.5 cm", desc: "Exam photo size. Common for various competitive examinations.", href: "/resize?w=2.5&h=3.5&unit=cm" },
  { title: "35x45 mm", desc: "Schengen, UK, and EU passport photo standard.", href: "/resize?w=35&h=45&unit=mm" },
  { title: "51x51 mm", desc: "US and India passport photo standard in millimeters.", href: "/resize?w=51&h=51&unit=mm" },
];

export default function ResizeTemplatesPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Breadcrumbs */}
      <nav className="container px-4 py-4 flex items-center text-sm text-muted-foreground">
        <Link href="/" className="hover:text-primary transition-colors">Home</Link>
        <ChevronRight className="w-4 h-4 mx-2" />
        <Link href="/templates" className="hover:text-primary transition-colors">Templates</Link>
        <ChevronRight className="w-4 h-4 mx-2" />
        <span className="text-foreground font-medium">Resize</span>
      </nav>

      {/* Hero Section */}
      <section className="bg-muted/30 py-16 md:py-24 border-b">
        <div className="container px-4 md:px-6 text-center">
          <div className="mx-auto max-w-[800px] space-y-4">
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
              Image <span className="text-primary">Resize</span> Templates
            </h1>
            <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl mt-6">
              Quick access to popular image resize dimensions for social media, print, and web.
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
                      Resize image to {item.title}
                    </CardTitle>
                    <CardDescription className="text-sm leading-relaxed line-clamp-4 text-muted-foreground/80">
                      Resize your photos to {item.title}. Free, no login required, 100% private — images never leave your device. Supports JPG, JPEG, PNG & WebP.
                    </CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className="py-24 bg-muted/30 border-t">
        <div className="container px-4 md:px-6">
          <div className="grid gap-12 lg:grid-cols-3">
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                <Zap className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold">Fast & Free</h3>
              <p className="text-muted-foreground">Get your images resized in seconds without spending a dime or creating an account.</p>
            </div>
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                <UserCircle className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold">Secure Processing</h3>
              <p className="text-muted-foreground">Privacy is our priority. Your photos are processed entirely in your browser and never uploaded.</p>
            </div>
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                <BadgeCheck className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold">Pro Quality</h3>
              <p className="text-muted-foreground">Maintain the highest visual quality with our professional-grade image scaling algorithms.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
