import { GetStaticProps } from "next";
import Head from "next/head";
import { getSortedPostsData } from "@/lib/posts";
import Link from "next/link";
import Image from "next/image";

// Client-side date formatting function
function formatDateClient(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export const config = {
  unstable_runtimeJS: false,
};

interface Post {
  id: string;
  slug: string;
  title: string;
  image_url?: string;
  publish_date: string;
}

interface HomeProps {
  posts: Post[];
}

export default function Home({ posts }: HomeProps) {
  return (
    <>
      <Head>
        <title>The Restless 🧠 and Impatient 🙌 of Eyal Shahar</title>
        <meta
          name="description"
          content="A creative blog exploring ideas across design, DIY, user experience, productivity, and everyday problem-solving. Where restless curiosity meets practical tinkering."
        />
        <meta
          property="og:title"
          content="Overtink - The Restless 🧠 and Impatient 🙌 of Eyal Shahar"
        />
        <meta
          property="og:description"
          content="A creative blog exploring ideas across design, DIY, user experience, productivity, and everyday problem-solving. Where restless curiosity meets practical tinkering."
        />
        <meta property="og:site_name" content="Overtink" />
        <meta
          property="og:image"
          content="http://localhost:3000/overtink-logo.svg"
        />
        <meta property="og:image:width" content="500" />
        <meta property="og:image:height" content="500" />
        <meta property="og:image:alt" content="Overtink Logo" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="The Restless 🧠 and Impatient 🙌 of Eyal Shahar"
        />
        <meta
          name="twitter:description"
          content="A creative blog exploring ideas across design, DIY, user experience, productivity, and everyday problem-solving. Where restless curiosity meets practical tinkering."
        />
        <meta
          name="twitter:image"
          content="http://localhost:3000/overtink-logo.svg"
        />
        <link rel="preload" as="image" href="/overtink-logo.svg" />
      </Head>
      <div className="max-w-6xl mx-auto px-[3vw] py-8">
        {/* Header with logo and tagline */}
        <header className="text-center pt-[75px] min-[500px]:pt-[100px] pb-[75px] min-[500px]:pb-[100px]">
          <div className="mb-[25px]">
            <Image
              src="/overtink-logo.svg"
              alt="Overtink Logo"
              width={500}
              height={500}
              className="w-[300px] min-[500px]:w-[500px] mx-auto"
              priority
            />
          </div>
          <h1 className="font-space-grotesk font-medium text-secondary-title text-slate-700">
            The Restless 🧠
            <br />
            and Impatient 🙌
            <br />
            of{" "}
            <a href="https://ey.al" className="underline hover:no-underline">
              Eyal Shahar
            </a>
          </h1>
        </header>

        <main>
          {posts.length > 0 ? (
            <div className="space-y-[60px]">
              {posts.map((post, index) => (
                <article
                  key={post.id}
                  className="cursor-pointer hover:opacity-80 transition-opacity duration-200"
                >
                  <Link href={`${post.slug}`}>
                    <div
                      className={`flex flex-col min-[500px]:flex-row ${
                        index % 2 === 0 ? "" : "min-[500px]:flex-row-reverse"
                      } items-start gap-[10vw]`}
                    >
                      {post.image_url && (
                        <div className="min-[500px]:w-1/2 w-full">
                          <Image
                            src={`${post.slug}/${post.image_url}`}
                            alt={post.title}
                            width={640}
                            height={320}
                            className="w-full h-64 min-[500px]:h-80 object-cover rounded-lg"
                          />
                        </div>
                      )}
                      <div className="min-[500px]:w-1/2 w-full flex flex-col justify-center text-center min-[500px]:min-h-80">
                        <h2 className="font-space-grotesk font-medium text-slate-700 mb-4 text-[clamp(2rem,5vw,2.5rem)] leading-[1.1] tracking-[-0.05em]">
                          {post.title}
                        </h2>
                        <time className="font-jetbrains-mono text-body text-slate-700">
                          {formatDateClient(post.publish_date)}
                        </time>
                      </div>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="font-jetbrains-mono text-body text-slate-700">
                No published posts yet.
              </p>
            </div>
          )}
        </main>
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const posts = getSortedPostsData();
  return {
    props: {
      posts,
    },
  };
};
