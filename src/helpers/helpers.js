export const isInLocal = (array, id) => {
  if(array.find(movie => movie.id === id)) {
    return true;
  } else {
    return false;
  }
}

export const formatDate = (date) => {
  const newDate = new Date(date);
  const formattedDate = newDate.toLocaleDateString('en-GB'); 
  return formattedDate;
}

export const formatYear = (date) => {
  const newDate = new Date(date);
  const formattedYear = newDate.getFullYear(); 
  return formattedYear;
}

export const formatRuntime = (runtime) => { 
  const hours = Math.floor(runtime / 60); 
  const minutes = runtime % 60; 
  return [hours, minutes];
}

export const formatUserScore = (userScore) => {
  const formattedUserScore = new Intl.NumberFormat("default", {
    style: "percent",
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  }).format(userScore / 100); 
  return Number(formattedUserScore.replace(",", "").replace("%", ""));
}

export const formatColorUserScore = (userScore) => {
  let color = "error"; 
  if (userScore >= 40) {
    color = "warning"
  }
  if(userScore >= 70) {
    color = "success"
  }
  return color;
}