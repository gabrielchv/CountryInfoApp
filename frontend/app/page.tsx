import { Country } from '@/data/data'
import HomePage from '@/components/pages/HomePage'

export default async function Page() {
  const res = await fetch(`${process.env.API_URL}/countries`, {
    next: { revalidate: 36000 },
  })
  const countries: Array<Country> = await res.json()
  return <HomePage countries={countries} />
}
