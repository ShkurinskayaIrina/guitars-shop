export const GUITAR_COUNT_SHOWN = 9;

export const STAR_COUNT = 5;

export const ratingRange = ['Ужасно', 'Плохо', 'Нормально', 'Хорошо', 'Отлично'];

export enum AppRoute {
  Root = '/',
  CatalogPage = '/catalog/:pageNumber',
  ProductPage = '/catalog/guitar/:id',
}

export enum APIRoute {
  Guitars = '/guitars',
  Comments  = '/comments',
}

export enum NameSpace {
  Data = 'DATA',
  Process = 'PROCESS',
}

export enum SortType {
  Original = 'Original',
  Price = 'Price',
  Popularity = 'Popularity',
}

export enum SortOrder {
  Original = 'Original',
  Up = 'Up',
  Down = 'Down',
}
