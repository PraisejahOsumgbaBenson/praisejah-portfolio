import { getAllPosts } from "../../lib/mdx";
import { marked } from "marked";

function toCdata(value = "") {
  return String(value).replace(/]]>/g, "]]]]><![CDATA[>");
}

function toRssDate(value) {
  const parsed = value ? new Date(value) : new Date();
  if (Number.isNaN(parsed.getTime())) return new Date().toUTCString();
  return parsed.toUTCString();
}

function siteMeta(origin) {
  return {
    title: "Praisejah Portfolio Blog",
    description: "Software Engineer | Systems Thinker | Builder",
    link: origin,
    feedUrl: `${origin}/feed.xml`,
  };
}

function absolutizeRelativeUrls(html, origin) {
  return html.replace(
    /\b(href|src)="\/(?!\/)([^"]*)"/g,
    (_match, attr, path) => {
      return `${attr}="${origin}/${path}"`;
    },
  );
}

export async function GET(request) {
  const origin = request.nextUrl.origin;
  const meta = siteMeta(origin);
  const posts = getAllPosts();

  const itemsXml = posts
    .map((post) => {
      const slug = post.slug;
      const title = post.frontmatter?.title || slug;
      const excerpt = post.frontmatter?.excerpt || "";
      const featuredImage = post.frontmatter?.featured_image || "";
      const markdownBody = post.content || "";
      const pubDate = toRssDate(post.frontmatter?.date);
      const link = `${origin}/blog/${slug}`;
      const imageIntro = featuredImage
        ? `<p><img src="${toCdata(featuredImage)}" alt="${toCdata(title)}" /></p>`
        : "";
      const renderedHtml = marked.parse(markdownBody || "");
      const normalizedHtml = absolutizeRelativeUrls(renderedHtml, origin);
      const contentBody = `${imageIntro}${toCdata(normalizedHtml)}`;

      return `<item>
<title><![CDATA[${toCdata(title)}]]></title>
<link>${link}</link>
<guid isPermaLink="true">${link}</guid>
<pubDate>${pubDate}</pubDate>
<description><![CDATA[${toCdata(excerpt)}]]></description>
<content:encoded><![CDATA[${contentBody}]]></content:encoded>
</item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/" version="2.0">
<channel>
<title><![CDATA[${meta.title}]]></title>
<link>${meta.link}</link>
<description><![CDATA[${meta.description}]]></description>
<language>en-us</language>
<lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
<atom:link href="${meta.feedUrl}" rel="self" type="application/rss+xml"/>
${itemsXml}
</channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
