import Link from "next/link"
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react"

export function Footer() {
  return (
    <footer className="w-full border-t bg-background">
      <div className="container px-4 md:px-6 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col gap-2">
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-xl font-bold">INFIQAI</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              AI-powered compliance & document intelligence platform for regulated industries.
            </p>
            <div className="flex gap-4 mt-2">
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Link>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="text-base font-medium">Product</h3>
            <nav className="flex flex-col gap-2">
              <Link href="/#features" className="text-sm text-muted-foreground hover:text-primary">
                Features
              </Link>
              <Link href="/#pricing" className="text-sm text-muted-foreground hover:text-primary">
                Pricing
              </Link>
              <Link href="/integrations" className="text-sm text-muted-foreground hover:text-primary">
                Integrations
              </Link>
              <Link href="/roadmap" className="text-sm text-muted-foreground hover:text-primary">
                Roadmap
              </Link>
            </nav>
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="text-base font-medium">Resources</h3>
            <nav className="flex flex-col gap-2">
              <Link href="/blog" className="text-sm text-muted-foreground hover:text-primary">
                Blog
              </Link>
              <Link href="/documentation" className="text-sm text-muted-foreground hover:text-primary">
                Documentation
              </Link>
              <Link href="/guides" className="text-sm text-muted-foreground hover:text-primary">
                Guides
              </Link>
              <Link href="/support" className="text-sm text-muted-foreground hover:text-primary">
                Support
              </Link>
            </nav>
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="text-base font-medium">Company</h3>
            <nav className="flex flex-col gap-2">
              <Link href="/about" className="text-sm text-muted-foreground hover:text-primary">
                About
              </Link>
              <Link href="/contact" className="text-sm text-muted-foreground hover:text-primary">
                Contact
              </Link>
              <Link href="/careers" className="text-sm text-muted-foreground hover:text-primary">
                Careers
              </Link>
              <Link href="/legal" className="text-sm text-muted-foreground hover:text-primary">
                Legal
              </Link>
            </nav>
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 border-t pt-8 mt-8">
          <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} INFIQAI. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="/privacy" className="text-sm text-muted-foreground hover:text-primary">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-sm text-muted-foreground hover:text-primary">
              Terms of Service
            </Link>
            <Link href="/cookies" className="text-sm text-muted-foreground hover:text-primary">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
