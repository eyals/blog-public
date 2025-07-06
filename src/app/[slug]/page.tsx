import { getPostData, getAllPostSlugs, formatDateMonthYear } from '@/lib/posts';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getAllPostSlugs();
  return slugs.map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostData(slug);

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  const fullUrl = `https://overtink.com/${post.slug}`;
  const defaultImage = '/overtink-logo.svg';

  return {
    title: post.seo_title || post.title,
    description: post.excerpt,
    authors: [{ name: 'Eyal Shahar', url: 'https://ey.al' }],
    openGraph: {
      type: 'article',
      url: fullUrl,
      title: post.title,
      description: post.excerpt,
      images: [
        {
          url: post.image_url || defaultImage,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
      publishedTime: post.publish_date,
      authors: ['Eyal Shahar'],
      section: 'Technology',
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: [post.image_url || defaultImage],
    },
    alternates: {
      canonical: fullUrl,
    },
  };
}

export default async function PostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPostData(slug);

  if (!post) {
    notFound();
  }

  const fullUrl = `https://overtink.com/${post.slug}`;

  // JSON-LD structured data
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    author: {
      '@type': 'Person',
      name: 'Eyal Shahar',
      url: 'https://ey.al',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Overtink',
      logo: {
        '@type': 'ImageObject',
        url: 'https://overtink.com/overtink-logo.svg',
      },
    },
    datePublished: post.publish_date,
    dateModified: post.publish_date,
    ...(post.image_url && { image: post.image_url }),
    ...(post.excerpt && { description: post.excerpt }),
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': fullUrl,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />
      <article className="max-w-[45rem] mx-auto px-4 py-8">
        <header className="text-center mb-12">
          {/* Logo at top - links to root */}
          <div className="mb-[100px]">
            <Link href="/">
              <Image
                src="/overtink-logo.svg"
                alt="Overtink Logo"
                width={180}
                height={180}
                className="w-[180px] mx-auto"
                priority
              />
            </Link>
          </div>

          {/* Centered title */}
          <h1 className="font-space-grotesk font-medium text-post-title text-slate-700 mb-4">
            {post.title}
          </h1>

          {/* Author and date */}
          <div className="font-jetbrains-mono text-body text-slate-700 mb-8">
            By{' '}
            <a href="https://ey.al" className="underline hover:no-underline">
              Eyal Shahar
            </a>
            <span className="ml-5">{formatDateMonthYear(post.publish_date)}</span>
          </div>

          {/* Main image below date */}
          {post.image_url && (
            <div className="mb-8 -mx-4">
              <Image
                src={post.image_url}
                alt={post.title}
                width={800}
                height={480}
                className="w-full rounded-lg shadow-lg"
                style={{ aspectRatio: '5/3', objectFit: 'cover' }}
              />
            </div>
          )}
        </header>

        <div className="mb-8">
          <div
            className="prose max-w-none"
            dangerouslySetInnerHTML={{ __html: post.contentHtml }}
          />
        </div>
      </article>
    </>
  );
}