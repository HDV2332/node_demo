/**
 * return string of current timestamp in MySql format YYYY-HH-DD HH:MM:SS
 */
const getCurrentTimestamp = () => {
  const _date = new Date();
  return _date.toISOString()?.slice(0, 19).replace("T", " ");
};

const getRandomLocation = () => {
  const generate = (range: number) => {
    let rand = Math.floor(Math.random() * range) + 1; // this will get a number between 1 and range;
    rand += (Math.random() * 1000000) / 1000000; // add tail
    rand *= Math.round(Math.random()) ? 1 : -1; // this will add minus sign in 50% of cases

    return rand;
  };

  return {
    latitude: generate(90),
    longtitude: generate(180),
  };
};

export { getCurrentTimestamp, getRandomLocation };
