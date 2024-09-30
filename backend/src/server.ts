import express, { Request, Response } from 'express';

const app = express();
const PORT = 3000;

app.use(express.json());

app.get('/countries', async (req: Request, res: Response) => {
  const fetchRes = await fetch('https://date.nager.at/api/v3/AvailableCountries');
  if (!fetchRes.ok) res.sendStatus(500);
  else {
    type fetchData = Array<{ countryCode: string; name: string }>;
    const fetchData: fetchData = await fetchRes.json();
    res.json(fetchData);
  }
});

app.get('/country/:countryCode', async (req: Request, res: Response) => {
  const countryCode = req.params.countryCode;

  try {
    const countryInfoRes = await fetch(`https://date.nager.at/api/v3/CountryInfo/${countryCode}`);
    if (!countryInfoRes.ok) {
      res.sendStatus(500);
      return undefined;
    }

    type CountryInfo = {
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

    const countryInfo: CountryInfo = await countryInfoRes.json();
    const countryName = countryInfo.commonName;

    const [populationRes, flagRes] = await Promise.all([
      fetch(`https://countriesnow.space/api/v0.1/countries/population`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ country: countryName }),
      }),
      fetch(`https://countriesnow.space/api/v0.1/countries/flag/images`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ country: countryName }),
      }),
    ]);

    if (!populationRes.ok || !flagRes.ok) {
      res.sendStatus(500);
      return undefined;
    }

    type PopulationData = {
      error: boolean;
      msg: string;
      data: {
        country: string;
        code: string;
        iso3: string;
        populationCounts: [
          {
            year: number;
            value: number;
          },
        ];
      };
    };

    type FlagData = {
      error: boolean;
      msg: string;
      data: {
        name: string;
        flag: string;
        iso2: string;
        iso3: string;
      };
    };

    const populationData: PopulationData = await populationRes.json();
    const flagData: FlagData = await flagRes.json();

    const responseData = {
      borders: countryInfo.borders.map(({ commonName, countryCode }) => ({
        countryCode,
        name: commonName,
      })),
      populationData: populationData.data.populationCounts,
      flag: flagData.data.flag,
    };

    res.json(responseData);
  } catch (error) {
    res.sendStatus(500);
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
