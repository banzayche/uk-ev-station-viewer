export type FilterState = {
  q: string;
  status: string;
  minPowerKw: number;
  favoritesOnly: boolean;
  view: 'map' | 'list';
};

export type CompareState = {
  selectedIds: string[];
  toggleCompare: (id: string) => void;
  clearCompare: () => void;
  canSelect: (id: string) => boolean;
};
