export const formatDateTime = (dateTime) => {
  const d = new Date(dateTime);
  return `${d.getDate()}/${d.getMonth()}/${d.getFullYear()} ${d.toLocaleTimeString(
    "en-US"
  )}`;
};
