import Image from "next/image";
import React from "react";

export default function MediumCard({
  img,
  title,
}: {
  img: string;
  title: string;
}) {
  return (
    <div className="cursor-pointer hover:scale-105 transition transform duration-300 ease-out">
      <div className="relative h-80 w-80">
        <Image src={img} alt="Card Image" fill className="rounded-xl" />
      </div>
      <h3 className="text-2xl mt-3">{title}</h3>
    </div>
  );
}
