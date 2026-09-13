export type Artwork = {
  id: string;
  title: string;
  year?: string;
  medium?: string;
  caption?: string;
  imageUrl: string;
  imagePathname: string;
  createdAt: string;
};

export type Catalog = {
  version: 1;
  artworks: Artwork[];
};
