import Link from "next/link"

export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container py-8 md:py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center space-x-2">
              <span className="font-bold text-xl">INFIQAI</span>
            </Link>
            <p className="mt-4 text-sm text-muted-foreground">
              Advanced AI-powered PII detection and document analysis for businesses of all sizes.
            </p>
          </div>
          <div>
            <h3 className="font-semibold">Product</h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <Link href="/#features" className="text-muted-foreground hover:text-foreground">
                  Features
                </Link>
              </li>
              <li>
                <Link href="/#pricing" className="text-muted-foreground hover:text-foreground">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-foreground">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold">Company</h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-foreground">
                  About
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-muted-foreground hover:text-foreground">
                  Privacy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-muted-foreground hover:text-foreground">
                  Terms
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold">Support</h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <Link href="/help" className="text-muted-foreground hover:text-foreground">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-foreground">
                  Contact Support
                </Link>
              </li>
              <li>
                <Link href="/status" className="text-muted-foreground hover:text-foreground">
                  Status
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; 2024 INFIQAI. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
