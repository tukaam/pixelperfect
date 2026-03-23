import Link from "next/link";
import { Share2, ChevronRight } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const templates = [
  { title: "Facebook Profile", desc: "320x320 px. Optimized for Facebook profile circles.", href: "/resize-image-for-facebook?type=profile" },
  { title: "Facebook Cover", desc: "851x315 px. Large banner for your Facebook profile.", href: "/resize-image-for-facebook?type=cover" },
  { title: "Instagram Post", desc: "1080x1080 px. Square format for Instagram feeds.", href: "/resize-image-for-instagram?type=post" },
  { title: "Instagram Story", desc: "1080x1920 px. Full-screen portrait for Stories and Reels.", href: "/resize-image-for-instagram?type=story" },
  { title: "YouTube Thumbnail", desc: "1280x720 px. High-quality video preview image.", href: "/resize-image-for-youtube?type=thumbnail" },
  { title: "YouTube Banner", desc: "2560x1440 px. Large channel art for all devices.", href: "/resize-image-for-youtube?type=banner" },
  { title: "Twitter Post", desc: "1600x900 px. Optimized image format for X (Twitter) feed.", href: "/resize-image-for-twitter?type=post" },
  { title: "LinkedIn Cover", desc: "1584x396 px. Professional background for your profile.", href: "/resize-image-for-linkedin?type=cover" },
  { title: "TikTok Profile", desc: "200x200 px. Circular profile photo for TikTok.", href: "/resize-image-for-tiktok?type=profile" },
  { title: "Pinterest Pin", desc: "1000x1500 px. Optimized vertical format for pins.", href: "/resize?w=1000&h=1500&unit=px" },
  { title: "WhatsApp DP", desc: "192x192 px. Profile picture for WhatsApp messaging.", href: "/resize?w=192&h=192&unit=px" },
  { title: "Twitch Banner", desc: "1920x1080 px. Offline banner for Twitch channels.", href: "/resize?w=1920&h=1080&unit=px" },
];

export default function SocialTemplatesPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Breadcrumbs */}
      <nav className="container px-4 py-4 flex items-center text-sm text-muted-foreground">
        <Link href="/" className="hover:text-primary transition-colors">Home</Link>
        <ChevronRight className="w-4 h-4 mx-2" />
        <Link href="/templates" className="hover:text-primary transition-colors">Templates</Link>
        <ChevronRight className="w-4 h-4 mx-2" />
        <span className="text-foreground font-medium">Social Media</span>
      </nav>

      {/* Hero Section */}
      <section className="bg-muted/30 py-16 md:py-24 border-b">
        <div className="container px-4 md:px-6 text-center">
          <div className="mx-auto max-w-[800px] space-y-4">
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
              <span className="text-primary">Social Media</span> Templates
            </h1>
            <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl mt-6">
              Perfectly sized images for Instagram, Facebook, YouTube, LinkedIn and more.
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
                      {item.title} Template
                    </CardTitle>
                    <CardDescription className="text-sm leading-relaxed line-clamp-4 text-muted-foreground/80">
                      Resize your photos for {item.title}. Free, no login required, 100% private — images never leave your device. Optimized for platform visibility.
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
