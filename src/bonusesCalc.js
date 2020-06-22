// возвращает бонусы за одну пьесу
const getPlayBonus = (play) => {
  let bonus = 0;
  // Добавление бонусов
  bonus += Math.max(play.audience - 30, 0);

  // нужно уточнение в ТЗ, если тут нужно считать бонус именно за каждые 10
  // комедий, то код ниже неверный, т.к. он просто считает бонус для каждой
  // комедии исходя из аудитории
  // код ниже добавляет бонус за каждые 5 человек на каждой комедии

  // Дополнительный бонус за каждые 10 комедий - либо это неверно, либо код ниже
  if (play.type === 'comedy') bonus += Math.floor(play.audience / 5);

  return bonus;
};

export default getPlayBonus;