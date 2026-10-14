import { createContext, useContext } from 'react';

export const HOUSE_PALETTES = {
  original: { name: 'Original · warm oak', wall: '#F2EEE6', floor: '#C19A6B', roof: '#D2B48C', stairs: '#654321', base: '#E8E8E8', rail: '#808080', rug: '#8B4513', stripe: '#654321' },
  sage: { name: 'Sage · soft green', wall: '#B9C5B2', floor: '#D4B990', roof: '#E8E1D2', stairs: '#796B54', base: '#DDDCD3', rail: '#536454', rug: '#E7DACA', stripe: '#9AA78E' },
  coastal: { name: 'Coastal · blue & cream', wall: '#B8CED9', floor: '#DCD0B9', roof: '#EDE9DF', stairs: '#687F8B', base: '#E5E9E7', rail: '#526A7D', rug: '#668CA4', stripe: '#D5E2E7' },
  terracotta: { name: 'Terracotta · earthy clay', wall: '#D7AB93', floor: '#B9A087', roof: '#EEE0CD', stairs: '#795347', base: '#D9C9B7', rail: '#644B40', rug: '#A75540', stripe: '#DDB799' },
};
export const HousePaletteContext = createContext(HOUSE_PALETTES.sage);
export const useHousePalette = () => useContext(HousePaletteContext);
