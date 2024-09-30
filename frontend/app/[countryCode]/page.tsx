import Image from 'next/image'
import Link from 'next/link'

export default async function Page({
  params: { countryCode },
}: {
  params: { countryCode: string }
}) {
  const res = await fetch(`http://localhost:4000/country/${countryCode}`)
  const {
    country,
    flag,
    borders,
    populationData,
  }: {
    country: {
      name: string
      countryCode: string
    }
    borders: Array<{
      countryCode: string
      name: string
    }>
    populationData: Array<{
      year: number
      value: number
    }>
    flag: string
  } = await res.json()

  console.log(populationData)

  return (
    <div className="flex flex-col gap-10 items-center p-4">
      <div className="flex gap-1">
        <Image alt={`${country.name} flag`} height={24} width={24} src={flag} />
        <h1>{country.name}</h1>
      </div>
      <div className="flex flex-col gap-1">
        Border Countries:
        {borders.map((borderCountry) => (
          <Link
            className="underline"
            href={`/${borderCountry.countryCode}`}
            key={borderCountry.countryCode}
          >
            {borderCountry.name}
          </Link>
        ))}
      </div>
    </div>
  )
}
