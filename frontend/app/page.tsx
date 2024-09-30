import Link from 'next/link'

export default async function Home() {
  const res = await fetch('http://localhost:4000/countries')
  const countries: Array<{ countryCode: string; name: string }> =
    await res.json()
  return (
    <div className="flex flex-col">
      {countries.map((country) => (
        <Link href={`/${country.countryCode}`} key={country.countryCode}>
          {country.name}
        </Link>
      ))}
    </div>
  )
}
