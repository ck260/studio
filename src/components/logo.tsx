import Link from 'next/link';
import { Bug } from 'lucide-react';

export default function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2">
      <Bug className="h-6 w-6 text-primary" />
      <span className="text-xl font-bold font-headline text-primary tracking-tight">
        BugSmash
      </span>
    </Link>
  );
}
