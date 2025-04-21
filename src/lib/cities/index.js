// Import all city data
import barcelona from '@/data/cities/barcelona.json';
import sanFrancisco from '@/data/cities/san-francisco.json';

// Create a mapping of city filenames to their data
export const cityData = {
  'barcelona': barcelona,
  'san-francisco': sanFrancisco,
};

// Create an index of cities organized by continent
export const cityIndex = {
  'Europe': [
    {
      name: 'Barcelona',
      filename: 'barcelona',
      coordinates: barcelona.coordinates
    }
  ],
  'North America': [
    {
      name: 'San Francisco',
      filename: 'san-francisco',
      coordinates: sanFrancisco.coordinates
    }
  ]
}; 