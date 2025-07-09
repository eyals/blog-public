import { GetStaticProps, GetStaticPaths } from "next";
import Head from "next/head";
import { getPostData, getAllPostSlugs } from "@/lib/posts";
import Link from "next/link";
import Image from "next/image";

// Client-side date formatting function
function formatDateMonthYearClient(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
  });
}

export const config = {
  unstable_runtimeJS: false,
};

interface Post {
  id: string;
  slug: string;
  title: string;
  seo_title?: string;
  excerpt?: string;
  image_url?: string;
  publish_date: string;
  contentHtml: string;
}

interface PostPageProps {
  post: Post;
}

export default function PostPage({ post }: PostPageProps) {
  const fullUrl = `https://overtink.com/${post.slug}/`;
  const defaultImage = "/overtink-logo.svg";

  // JSON-LD structured data
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    author: {
      "@type": "Person",
      name: "Eyal Shahar",
      url: "https://ey.al",
    },
    publisher: {
      "@type": "Organization",
      name: "Overtink",
      logo: {
        "@type": "ImageObject",
        url: "https://overtink.com/overtink-logo.svg",
      },
    },
    datePublished: post.publish_date,
    dateModified: post.publish_date,
    ...(post.image_url && { image: post.image_url }),
    ...(post.excerpt && { description: post.excerpt }),
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": fullUrl,
    },
  };

  return (
    <>
      <Head>
        <title>{post.seo_title || post.title}</title>
        <meta name="description" content={post.excerpt || ""} />
        <link rel="canonical" href={fullUrl} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt || ""} />
        <meta property="og:url" content={fullUrl} />
        <meta property="og:image" content={post.image_url || defaultImage} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content={post.title} />
        <meta property="og:type" content="article" />
        <meta property="article:published_time" content={post.publish_date} />
        <meta property="article:author" content="Eyal Shahar" />
        <meta property="article:section" content="Technology" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.title} />
        <meta name="twitter:description" content={post.excerpt || ""} />
        <meta name="twitter:image" content={post.image_url || defaultImage} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
      </Head>
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
            By{" "}
            <a href="https://ey.al" className="underline hover:no-underline">
              Eyal Shahar
            </a>
            <span className="ml-5">
              {formatDateMonthYearClient(post.publish_date)}
            </span>
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
                style={{ aspectRatio: "5/3", objectFit: "cover" }}
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

export const getStaticPaths: GetStaticPaths = async () => {
  const slugs = getAllPostSlugs();
  const paths = slugs.map((slug) => ({
    params: { slug },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<PostPageProps> = async ({
  params,
}) => {
  const slug = params?.slug as string;
  const post = await getPostData(slug);

  if (!post) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      post,
    },
  };
};
