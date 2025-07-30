import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-primary/5">
      <div className="container mx-auto px-4 text-center">
        <div className="max-w-2xl mx-auto space-y-8">
          <Image
            className="dark:invert mx-auto"
            src="/next.svg"
            alt="Next.js logo"
            width={180}
            height={38}
            priority
          />
          
          <div className="space-y-4">
            <h1 className="text-4xl font-bold tracking-tight">
              Welcome to InfraBuilder
            </h1>
            <p className="text-xl text-muted-foreground">
              Configure and deploy your cloud infrastructure with our intuitive wizard.
              Set up infrastructure, applications, and monitoring in just a few steps.
            </p>
          </div>
          
          <div className="space-y-4">
            <Link href="/home">
              <Button size="lg" className="text-lg px-8 py-6">
                Get Started
              </Button>
            </Link>
            <p className="text-sm text-muted-foreground">
              No setup required • Free to use • Quick deployment
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
