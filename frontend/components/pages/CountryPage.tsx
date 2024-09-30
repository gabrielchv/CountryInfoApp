import PopulationChart from '@/components/atomic/PopulationChart'
import { CountryDetail } from '@/data/data'
import Image from 'next/image'
import CountryLink from '../atomic/CountryLink'

export default async function Country({ countryDetail }: { countryDetail: CountryDetail }) {
  const { country, flag, borders, populationData }: CountryDetail = countryDetail
  return (
    <div className="flex flex-col gap-16 items-center p-10 min-h-dvh">
      <div className="flex gap-2">
        <h1 className="font-bold text-2xl">{country.name}</h1>
        <div className="relative h-8 w-16">
          <Image className="object-contain object-left" alt={`${country.name} flag`} fill src={flag} />
        </div>
      </div>
      <div className="flex flex-col gap-1 w-full max-w-[360px]">
        <h3 className="font-semibold">Border Countries:</h3>
        {borders.map((borderCountry) => (
          <CountryLink key={borderCountry.countryCode} country={borderCountry} />
        ))}
      </div>
      <PopulationChart className="md:max-h-[400px] max-w-[1000px] mt-auto" populationCounts={populationData} />
    </div>
  )
}
