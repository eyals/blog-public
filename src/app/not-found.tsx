import Link from 'next/link';
import Image from 'next/image';

export default function NotFound() {
  return (
    <div className="max-w-6xl mx-auto px-[3vw] py-8">
      <div className="text-center pt-[75px] min-[500px]:pt-[100px] pb-[75px] min-[500px]:pb-[100px]">
        <div className="mb-[25px]">
          <Link href="/">
            <Image
              src="/overtink-logo.svg"
              alt="Overtink Logo"
              width={300}
              height={300}
              className="w-[300px] mx-auto"
              priority
            />
          </Link>
        </div>
        <h1 className="font-space-grotesk font-medium text-secondary-title text-slate-700 mb-8">
          404 - Page Not Found
        </h1>
        <p className="font-jetbrains-mono text-body text-slate-700 mb-8">
          The page you&apos;re looking for doesn&apos;t exist.
        </p>
        <Link
          href="/"
          className="font-jetbrains-mono text-body text-slate-700 underline hover:no-underline"
        >
          Go back home
        </Link>
      </div>
    </div>
  );
}