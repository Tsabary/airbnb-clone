import Head from "next/head";
import Banner from "../components/Banner";
import Footer from "../components/Footer";
import Header from "../components/Header";
import LargeCard from "../components/LargeCard";
import MediumCard from "../components/MediumCard";
import SmallCard from "../components/SmallCard";

const Home = ({
  exploreData,
  cardsData,
}: {
  exploreData: Array<any>;
  cardsData: Array<any>;
}) => {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <Banner />

      <main className="max-w-7xl mx-auto px-8 sm:px-16">
        <section className="pt-6">
          <h2 className="text-4xl font-semibold pb-5">Explore Nearby</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {/** Pull some data from a server - API endpoints*/}
            {exploreData?.map((item, i) => (
              <SmallCard
                key={i}
                img={item.img}
                distance={item.distance}
                location={item.location}
              />
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-4xl font-semibold py-8">Live Anywhere</h2>
          <div className="flex space-x-3 overflow-scroll scrollbar-hide p-3 -ml-3">
            {cardsData.map(({ img, title }, i) => (
              <MediumCard img={img} title={title} key={i} />
            ))}
          </div>
        </section>

        <LargeCard
          img="https://links.papareact.com/4cj"
          title="The Greatest Outdoors"
          description="Wishlists curated by Airbnb"
          buttonText="Get Inspired"
        />
      </main>
      <Footer />
    </div>
  );
};

export default Home;

export async function getStaticProps() {
  let exploreData = [];
  let cardsData = [];

  try {
    exploreData = await fetch("https://www.jsonkeeper.com/b/4G1G").then((res) =>
      res.json()
    );
  } catch (e) {
    console.log("Failed to fetch destinations", e);
  }

  try {
    cardsData = await fetch("https://www.jsonkeeper.com/b/VHHT").then((res) =>
      res.json()
    );
  } catch (e) {
    console.log("Failed to fetch destinations", e);
  }

  return {
    props: {
      exploreData,
      cardsData,
    },
  };
}
