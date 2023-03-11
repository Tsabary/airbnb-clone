import Image from "next/image";
import React, { useState } from "react";
import {
  MagnifyingGlassIcon,
  UserCircleIcon,
  Bars3Icon,
  UsersIcon,
} from "@heroicons/react/24/solid";
import { GlobeAltIcon } from "@heroicons/react/24/outline";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRangePicker, RangeKeyDict } from "react-date-range";
import { useRouter } from "next/router";

export default function Header({ placeholder }: { placeholder?: string }) {
  const router = useRouter();
  const [searchInput, setSearchInput] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const [numberOfGuests, setNumberOfGuests] = useState(1);

  const selectionRange = {
    startDate,
    endDate,
    key: "selection",
  };

  const handleSelect = (ranges: RangeKeyDict) => {
    setStartDate(ranges.selection.startDate || new Date());
    setEndDate(ranges.selection.endDate || new Date());
  };

  const search = () => {
    router.push({
      pathname: "/search",
      query: {
        location: searchInput,
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
        noOfGuests: numberOfGuests,
      },
    });
  };

  return (
    <header className="sticky top-0 z-50 grid grid-cols-3 bg-white shadow-md p-5 md:px-10">
      {/** left - logo */}
      <div
        onClick={() => router.push("/")}
        className="relative flex items-center h-10 cursor-pointer my-auto"
      >
        <Image
          src="https://links.papareact.com/qd3"
          fill={true}
          style={{ objectFit: "contain", objectPosition: "left" }}
          alt="logo"
        />
      </div>

      {/** middle - search*/}
      <div className="flex items-center md:border-2 rounded-full py-2 md:shadow-sm">
        <input
          type="text"
          placeholder={placeholder || "Start your search"}
          className="pl-5 bg-transparent outline-none flex-grow text-sm text-gray-600 placeholder-gray-400"
          onChange={(e) => setSearchInput(e.target.value)}
          value={searchInput}
        />
        <MagnifyingGlassIcon className="hidden md:inline-flex h-8 bg-red-400 text-white rounded-full p-2 cursor-pointer md:mx-2" />
      </div>

      {/** right */}
      <div className="flex items-center space-x-4 justify-end">
        <p className="hidden md:inline cursor-pointer">Become a host</p>
        <GlobeAltIcon className="h-6 cursor-pointer" />
        <div className="flex items-center space-x-2 border-2 p-2 rounded-full">
          <Bars3Icon className="h-6 cursor-pointer" />
          <UserCircleIcon className="h-6 cursor-pointer" />
        </div>
      </div>
      {searchInput && (
        <div className="flex flex-col col-span-3 mx-auto mt-5">
          <DateRangePicker
            ranges={[selectionRange]}
            minDate={new Date()}
            rangeColors={["#FD5B61"]}
            onChange={handleSelect}
          />
          <div className="flex items-center border-b mb-4">
            <h2 className="text-2xl flex-grow font-semibold">
              Number of Guests
            </h2>
            <UsersIcon className="h-5" />
            <input
              type="number"
              className="w-12 pl-2 text-lg outline-none text-red-400"
              value={numberOfGuests}
              min={1}
              onChange={(e) => {
                setNumberOfGuests(Number(e.target.value));
              }}
            />
          </div>
          <div className="flex">
            <button
              className="flex-grow text-gray-500"
              onClick={() => setSearchInput("")}
            >
              Cancel
            </button>
            <button onClick={search} className="flex-grow text-red-400">
              Search
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
