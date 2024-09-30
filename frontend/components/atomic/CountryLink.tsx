import { Country } from '@/data/data'
import Link from 'next/link'

export default function CountryLink({ country }: { country: Country }) {
  return (
    <Link className="underline transition-colors w-fit hover:text-blue-300" href={`/${country.countryCode}`}>
      {country.name}
    </Link>
  )
}
