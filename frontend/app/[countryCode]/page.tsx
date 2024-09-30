import { Country, CountryDetail } from '@/data/data'
import CountryPage from '@/components/pages/CountryPage'
import { notFound } from 'next/navigation'

export async function generateStaticParams() {
  const res = await fetch(`${process.env.API_URL}/countries`)
  const countries: Array<Country> = await res.json()

  return countries.map(({ countryCode }) => ({
    countryCode,
  }))
}

export default async function Page({ params: { countryCode } }: { params: { countryCode: string } }) {
  const res = await fetch(`${process.env.API_URL}/country/${countryCode}`, {
    next: { revalidate: 36000 },
  })
  if (!res.ok) notFound()
  const countryDetail: CountryDetail = await res.json()

  return <CountryPage countryDetail={countryDetail} />
}
