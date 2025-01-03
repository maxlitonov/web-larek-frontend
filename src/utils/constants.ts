export const API_URL = `${process.env.API_ORIGIN}/api/weblarek`;
export const CDN_URL = `${process.env.API_ORIGIN}/content/weblarek`;

export const actionsCard = {
  delete: 'Удалить из корзины',
  add: 'В корзину'
}

export const categories = new Map([
  ['дополнительное', 'additional'],
  ['софт-скил', 'soft'],
  ['хард-скил', 'hard'],
  ['кнопка', 'button'],
  ['другое', 'other']
]);