import { useRouter } from "next/router";
import React from "react";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import { format } from "date-fns";
import InfoCard from "../../components/InfoCard";
import Map from "../../components/Map";

function SearchPage({ searchResults }: { searchResults: Array<any> }) {
  const router = useRouter();
  const { location, startDate, endDate, noOfGuests } = router.query;

  const formattedStartDate = format(
    new Date(startDate as unknown as any),
    "dd MMMM yy"
  );
  const formattedEndDate = format(
    new Date(endDate as unknown as any),
    "dd MMMM yy"
  );

  const range = `${formattedStartDate} - ${formattedEndDate}`;

  return (
    <div className="h-screen">
      <Header placeholder={`${location} | ${range} | ${noOfGuests} guests`} />
      <main className="flex">
        <section className="flex-grow pt-14 px-6">
          <p className="text-xs">
            300+ Stays - {range} - for {noOfGuests} number of guests
          </p>

          <h1 className="text-3xl font-semibold mt-2 mb-6">
            Stays in {location}
          </h1>

          <div className="hidden lg:inline-flex mb-5 space-x-3 text-gray-800 whitespace-nowrap">
            <p className="filter-button">Cancellation Flexability</p>
            <p className="filter-button">Type of Place</p>
            <p className="filter-button">Price</p>
            <p className="filter-button">Rooms and Beds</p>
            <p className="filter-button">More filters</p>
          </div>

          <div className="flex flex-col">
            {searchResults?.map((item, i) => (
              <InfoCard item={item} key={i} />
            ))}
          </div>
        </section>

        <section className="hidden xl:inline-flex xl:min-w-[600px]">
          <Map searchResults={searchResults} />
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default SearchPage;

export async function getServerSideProps() {
  const searchResults = await fetch("https://www.jsonkeeper.com/b/5NPS").then(
    (res) => res.json()
  );

  return {
    props: {
      searchResults,
    },
  };
}
