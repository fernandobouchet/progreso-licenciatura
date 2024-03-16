const formatPeriodOrder = (order: number) => {
  const positions = ['', '1er', '2do', '3er', '4to', '5to'];
  return positions[order];
};

const capitalizeFirstLetter = (word: string) => {
  const firstLetterCapitalized = word.charAt(0).toUpperCase();
  const remainingLetters = word.slice(1).toLowerCase();
  const capitalizedWord = `${firstLetterCapitalized}${remainingLetters}`;
  return capitalizedWord;
};

export { formatPeriodOrder, capitalizeFirstLetter };
