const formatTime = (time) => {
  const date = new Date(time);

  const formattedDate = date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  const formattedTime = date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  const formattedDateTime = `${formattedDate} ${formattedTime}`;

  return formattedDateTime;
};

export default formatTime;
