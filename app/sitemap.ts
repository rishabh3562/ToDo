export async function GET() {
  const urls = `
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <url>
        <loc>https://neumotask.vercel.app</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
      </url>
    </urlset>
  `;

  return new Response(urls.trim(), {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
