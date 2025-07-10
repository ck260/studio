import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Bug, ArrowRight } from 'lucide-react';
import Logo from '@/components/logo';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="p-4 flex justify-between items-center">
        <Logo />
        <div className="flex items-center gap-4">
          <Button variant="ghost" asChild>
            <Link href="/login">Log In</Link>
          </Button>
          <Button asChild>
            <Link href="/signup">Sign Up</Link>
          </Button>
        </div>
      </header>
      <main className="flex-1 flex flex-col items-center justify-center text-center p-4">
        <div className="bg-primary/10 p-4 rounded-full mb-6">
          <Bug className="h-12 w-12 text-primary" />
        </div>
        <h1 className="text-4xl md:text-6xl font-bold font-headline text-primary tracking-tighter">
          BugSmash
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-foreground/80">
          The simple, powerful, and elegant solution for tracking bugs and managing your projects. Collaborate with your team and smash bugs with ease.
        </p>
        <div className="mt-8">
          <Button size="lg" asChild>
            <Link href="/dashboard">
              Get Started <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </main>
      <footer className="p-4 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} BugSmash. All rights reserved.
      </footer>
    </div>
  );
}
