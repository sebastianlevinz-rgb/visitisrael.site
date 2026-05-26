/**
 * Author bylines for E-E-A-T. A small editorial team; each page is attributed
 * to one author and renders a Person schema via the Article builder.
 */
export interface Author {
  id: string;
  name: string;
  role: string;
  bio: string;
  url: string;
}

export const AUTHORS: Record<string, Author> = {
  editorial: {
    id: 'editorial',
    name: 'The Visit Israel Editorial Team',
    role: 'Travel researchers',
    bio: 'Our editors research Israel on the ground and from primary sources — official tourism boards, national park authorities and site administrators — and update each guide as opening hours, fares and access change.',
    url: '/about',
  },
};

export const defaultAuthor = AUTHORS.editorial;
