export const formatDateTime = (dateTime) => {
  const d = new Date(dateTime);
  return `${d.getMonth()}/${d.getDate()}/${d.getFullYear()} ${d.toLocaleTimeString(
    "en-US"
  )}`;
};
