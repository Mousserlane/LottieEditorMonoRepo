export const getRandomColor = () => {
  const colorsString = [
    'bg-lime-400', 'bg-red-400', 'bg-teal-400', 'bg-indigo-400', 'bg-fuchsia-400'
  ];

  const randomIndex = Math.floor(Math.random() * colorsString.length);

  return colorsString[randomIndex]
}