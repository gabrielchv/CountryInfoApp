import express, { Request, Response } from 'express';
import type { PopulationData, FlagData, CountryInfo } from './data';

const app = express();
const PORT = 4000;

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
    // fetch country info by it's code
    const countryInfoRes = await fetch(`https://date.nager.at/api/v3/CountryInfo/${countryCode}`);

    // abort if req not ok
    if (!countryInfoRes.ok) {
      res.sendStatus(500);
      return undefined;
    }

    const countryInfo: CountryInfo = await countryInfoRes.json();
    const countryName = countryInfo.commonName;

    // fetch flag and population data by country name
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

    // abort if req not ok
    if (!populationRes.ok || !flagRes.ok) {
      res.sendStatus(500);
      return undefined;
    }

    const [populationData, flagData]: [PopulationData, FlagData] = await Promise.all([
      populationRes.json(),
      flagRes.json(),
    ]);

    // abort if req data has error
    if (populationData.error || flagData.error) {
      res.sendStatus(500);
      return undefined;
    }

    const responseData = {
      country: { name: countryInfo.commonName, countryCode: countryInfo.countryCode },
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
