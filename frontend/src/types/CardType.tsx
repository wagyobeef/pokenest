export interface CardType {
  id: string;
  name: string;
  set: {
    name: string;
  };
  images: {
    small: string;
    large: string;
  };
  tcgplayer: {
    prices: {
      [key: string]: {
        market: number;
        low: number | null;
        mid: number | null;
        high: number | null;
      };
    };
    url: string;
  } | null;
}

export interface FormattedCardType {
  id: string;
  name: string;
  setName: string;
  imageUrl: string;
  prices: {
    [key: string]: {
      market: number;
    };
  };
}
