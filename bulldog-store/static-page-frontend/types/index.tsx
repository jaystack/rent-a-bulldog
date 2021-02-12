export type BulldogImageUrl = {
  url: string;
};

export type BulldogImageFile = {
  file: BulldogImageUrl;
};

export type BulldogImage = {
  fields: BulldogImageFile;
};

export type BulldogItem = {
  id: string;
  name: string;
  image: BulldogImage;
  description: any;
};

export type BulldogFields = {
  fields: BulldogItem;
};
