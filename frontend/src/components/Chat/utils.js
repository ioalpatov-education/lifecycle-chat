export const getColor = (userId) => {
  const binary = userId
    .split("")
    .map(function (char) {
      return char.charCodeAt(0).toString(2);
    })
    .join(" ");

  const duodecimal = parseInt(binary, 12);

  return `#${duodecimal.toString().slice(0, 6)}`;
};
