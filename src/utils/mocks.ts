import { Guitar, Comment } from '../types/guitars';
import { datatype, name, random, system, date } from 'faker';

export const makeFakeNumberPage = () => ({
  numberPage: datatype.number(),
});

export const makeFakeGuitar = (): Guitar => ({
  id: datatype.number(),
  name: name.title(),
  vendorCode: random.alphaNumeric(8),
  type: random.word(),
  description: random.words(10),
  previewImg: system.filePath(),
  stringCount: datatype.number(),
  rating: datatype.number(),
  price: datatype.number(),
});

export const makeFakeComment = (): Comment => ({
  id: datatype.number().toString(),
  createAt: date.past().toDateString(),
  guitarId: datatype.number(),
  userName: name.title(),
  advantage: random.words(10),
  disadvantage: random.words(3),
  comment: random.words(10),
  rating: datatype.float({ min: 0, max: 5 }),
});
