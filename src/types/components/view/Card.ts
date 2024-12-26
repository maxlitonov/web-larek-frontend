export interface ICardActions {
  onClick: (event: MouseEvent) => void;
}

export const categories = new Map([
  ['дополнительное', 'additional'],
  ['софт-скил', 'soft'],
  ['хард-скил', 'hard'],
  ['кнопка', 'button'],
  ['другое', 'other']
]);