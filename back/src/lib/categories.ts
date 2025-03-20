import _ from 'lodash'

/* const categories = [
  { id: '1', name: 'Наука' },
  { id: '2', name: 'Спорт' },
  { id: '3', name: 'Политика' },
  { id: '4', name: 'Искусство' },
  { id: '5', name: 'Разное' },
] */

export const categories = _.times(100, (i) => ({
  id: `${i}`,
  name: `category ${i}`,
  description: `description ${i}`,
  text: _.times(100, (j) => `<p>Text paragraph ${j}...</p>`).join(''),
}))
