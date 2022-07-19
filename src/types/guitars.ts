export type Guitar = {
  id: number,
  name: string,
  vendorCode: string,
  type: string,
  description: string,
  previewImg: string,
  stringCount: number,
  rating: number,
  price: number,
  };

export type Guitars = Guitar[];

export type NewComment = {
  guitarId: number,
  userName: string,
  advantage: string,
  disadvantage: string,
  comment: string,
  rating: number,
}

export type Comment = NewComment & {
  id: string,
  createAt: string,
};

export type Comments = Comment[];

export type GuitarsComments = {
  [key: number]: Comments,
};
