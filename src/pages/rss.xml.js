import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

const SITE_TITLE = 'Visit Israel — Travel Guide';
const SITE_DESC =
  'New and updated guides, itineraries and attraction write-ups for planning a trip to Israel.';

export async function GET(context) {
  const [guides, itineraries, attractions] = await Promise.all([
    getCollection('guides'),
    getCollection('itineraries'),
    getCollection('attractions'),
  ]);

  const items = [
    ...guides.map((g) => ({
      title: g.data.title,
      description: g.data.description,
      link: `/${g.id}`,
      date: g.data.updatedAt,
      category: 'Guide',
    })),
    ...itineraries.map((i) => ({
      title: i.data.title,
      description: i.data.description,
      link: `/itineraries/${i.id}`,
      date: i.data.updatedAt ?? i.data.publishedAt,
      category: 'Itinerary',
    })),
    ...attractions.map((a) => {
      // id is "<region>-<slug>"; route is /<region>/<slug-after-region>
      const region = a.data.region;
      const slug = a.id.startsWith(`${region}-`)
        ? a.id.slice(region.length + 1)
        : a.id;
      return {
        title: a.data.title,
        description: a.data.description,
        link: `/${region}/${slug}`,
        date: a.data.updatedAt,
        category: 'Attraction',
      };
    }),
  ]
    .filter((it) => it.date)
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 50);

  return rss({
    title: SITE_TITLE,
    description: SITE_DESC,
    site: context.site,
    items: items.map((it) => ({
      title: it.title,
      description: it.description,
      link: it.link,
      pubDate: new Date(it.date),
      categories: [it.category],
    })),
    customData: '<language>en</language>',
  });
}
