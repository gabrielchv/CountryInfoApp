import { Country } from '@/data/data'
import CountryLink from '../atomic/CountryLink'

export default function Home({ countries }: { countries: Array<Country> }) {
  return (
    <div className="flex flex-col gap-16 p-10 items-center min-h-dvh justify-center">
      <div className="flex flex-col gap-2 items-center">
        <p className="font-bold text-3xl">hello 👋</p>
        <h1 className="font-bold text-2xl">Welcome to the Country Info App</h1>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {countries.map((country) => (
          <CountryLink country={country} key={country.countryCode} />
        ))}
      </div>
    </div>
  )
}
