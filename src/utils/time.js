export function formatTimestamp(timestamp) {
  // generateTextToTime(timestamp);
  // return timestamp && timestamp.toMillis();

  if (new Date(timestamp).toLocaleString() === "Invalid Date") {
    console.log(timestamp, new Date(timestamp).toLocaleString());
  } else {
    return new Date(timestamp).toLocaleString();
  }
}

export const generateTextToTime = (timestamp) => {
  const timeDiff = Math.round(
    Math.abs(
      timestamp.toDate().getTime() -
        Timestamp.fromDate(new Date()).toDate().getTime()
    ) /
      1000 /
      60
  );
  let answ;
  switch (timeDiff) {
    case 0:
      answ = " Менее 1 минуты назад";
      break;
    case 1:
      answ = " 1 минуту назад";
      break;
    case 2:
      answ = " 2 минуты назад";
      break;
    case 3:
      answ = " 3 минуты назад";
      break;
    case 4:
      answ = " 4 минуты назад";
      break;
    case 5:
      answ = " 5 минут назад";
      break;
    case 6:
      answ = " 6 минут назад";
      break;
    case 7:
      answ = " 7 минут назад";
      break;
    case 8:
      answ = " 8 минут назад";
      break;
    case 9:
      answ = " 9 минут назад";
      break;
    case 10:
      answ = " 10 минут назад";
      break;
    default:
      answ = timestamp.toDate().toLocaleString();
      break;
  }

  return answ;
};
