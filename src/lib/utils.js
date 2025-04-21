export function getCountryFlag(countryCode) {
  // Convert country code to regional indicator symbols
  // Each letter A-Z is represented by a Regional Indicator Symbol
  // Offset from 'A' to Regional Indicator Symbol A is 127462 - 65
  const offset = 127397;
  const flagEmoji = countryCode
    .toUpperCase()
    .split('')
    .map(char => String.fromCodePoint(char.charCodeAt(0) + offset))
    .join('');
  
  return flagEmoji;
} 

export function citiesByContinent(cityList) {
  return cityList.reduce((acc, city) => {
    if (!acc[city.continent]) {
      acc[city.continent] = [];
    }
    acc[city.continent].push(city);
    return acc;
  }, {});
}
