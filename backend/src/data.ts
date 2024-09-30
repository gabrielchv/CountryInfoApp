export type PopulationData = {
  error: boolean;
  msg: string;
  data: {
    country: string;
    code: string;
    iso3: string;
    populationCounts: Array<{
      year: number;
      value: number;
    }>;
  };
};

export type FlagData = {
  error: boolean;
  msg: string;
  data: {
    name: string;
    flag: string;
    iso2: string;
    iso3: string;
  };
};

export type CountryInfo = {
  commonName: string;
  officialName: string;
  countryCode: string;
  region: string;
  borders: Array<{
    commonName: string;
    officialName: string;
    countryCode: string;
    region: string;
    borders: null;
  }>;
};
