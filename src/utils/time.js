import { Timestamp } from "firebase/firestore";

export function formatTimestamp(timestamp) {
  // generateTextToTime(timestamp);

  if (new Date(timestamp).toLocaleString() !== "Invalid Date") {
    return new Date(timestamp).toLocaleString();
  } else {
    console.log("Неправильные дата и время");
  }
}

export const generateTextToTime = (timestamp) => {
  const timeDiff = Math.round(
    Math.abs(timestamp - Timestamp.fromDate(new Date()).toDate().getTime()) /
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
