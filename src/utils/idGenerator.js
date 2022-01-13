import { nanoid } from 'nanoid';

function generateId(numberOfChars = 10) {
  return nanoid(numberOfChars);
}

export default generateId;
