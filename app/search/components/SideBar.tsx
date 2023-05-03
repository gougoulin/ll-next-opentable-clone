"use client";
import { Cuisine, Location } from ".prisma/client";
import { useRouter, useSearchParams } from "next/navigation";
import { ChangeEventHandler, EventHandler, MouseEventHandler, useState } from "react";
import { next } from "sucrase/dist/types/parser/tokenizer";
import { getNextUrl, handleSearchRefresh } from "@/app/search/searchUtils";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context";
import { PRICE } from "@prisma/client";

const SideBar = ({ locations, cuisines }: { locations: Location[]; cuisines: Cuisine[] }) => {
  const router = useRouter();
  const urlSearchParams = useSearchParams();
  const region = urlSearchParams.get("region");
  const currentCuisine = urlSearchParams.get("cuisine");
  const price = urlSearchParams.get("price");
  const handleRegion: ChangeEventHandler<HTMLInputElement> = (e) => {
    handleSearchRefresh(router, {
      region: e.target.checked ? e.target.name : undefined,
      cuisine: currentCuisine,
      price: price,
    });
  };
  const handleCuisine: ChangeEventHandler<HTMLInputElement> = (e) => {
    handleSearchRefresh(router, {
      region: region,
      cuisine: e.target.checked ? e.target.name : undefined,
      price: price,
    });
  };
  const handlePrice: ChangeEventHandler<HTMLInputElement> = (e) => {
    handleSearchRefresh(router, {
      region: region,
      cuisine: currentCuisine,
      price: e.target.checked ? e.target.name : undefined,
    });
  };
  return (
    <aside>
      <form>
        <section className="border-b border-neutral-200 py-4">
          <h3 className="mb-2 font-medium">Regions</h3>
          <ul>
            {locations &&
              locations.map((location) => {
                return (
                  <li key={location.id} className="flex flex-row gap-2">
                    <input
                      onChange={handleRegion}
                      checked={region === location.name}
                      id="checkbox-city-centre"
                      type="checkbox"
                      name={location.name}
                    />
                    <label htmlFor="city-centre">{location.name}</label>
                  </li>
                );
              })}
          </ul>
        </section>
        <section className="border-b border-neutral-200 py-4">
          <h3 className="mb-2 font-medium">Cuisine</h3>
          <ul>
            {cuisines &&
              cuisines.map((cuisine) => {
                return (
                  <li key={cuisine.id} className="flex flex-row gap-2">
                    <input
                      onChange={handleCuisine}
                      checked={currentCuisine === cuisine.name}
                      id="checkbox-mexican"
                      type="checkbox"
                      name={cuisine.name}
                    />
                    <label htmlFor="Mexican">{cuisine.name}</label>
                  </li>
                );
              })}
          </ul>
        </section>
        <section className="border-b border-neutral-200 py-4">
          <h3 className="mb-2 font-medium">Price</h3>
          <ul>
            <li key={"price-$$"} className="flex flex-row gap-2">
              <input
                onChange={handlePrice}
                checked={price === PRICE.CHEAP}
                id="checkbox-mexican"
                type="checkbox"
                name={PRICE.CHEAP}
              />
              <label htmlFor={PRICE.CHEAP}>$$</label>
            </li>
            <li key={"price-$$$"} className="flex flex-row gap-2">
              <input
                onChange={handlePrice}
                checked={price === PRICE.REGULAR}
                id="checkbox-mexican"
                type="checkbox"
                name={PRICE.REGULAR}
              />
              <label htmlFor={PRICE.REGULAR}>$$$</label>
            </li>
            <li key={"price-$$$$"} className="flex flex-row gap-2">
              <input
                onChange={handlePrice}
                checked={price === PRICE.EXPENSIVE}
                id="checkbox-mexican"
                type="checkbox"
                name={PRICE.EXPENSIVE}
              />
              <label htmlFor={PRICE.EXPENSIVE}>$$$$</label>
            </li>
          </ul>
        </section>
        <section className="border-b border-neutral-200 py-4">
          <div className="flex flex-row gap-2">
            <button
              className="font-sm rounded border border-red-600 p-1 px-2 text-red-600 hover:bg-red-600 hover:text-white"
              type="reset"
              onClick={() => router.push(`/search`)}
            >
              Reset
            </button>
            <button
              className="font-sm rounded border border-red-600 p-1 px-2 text-red-600 hover:bg-red-600 hover:text-white"
              type="reset"
            >
              Update
            </button>
          </div>
        </section>
      </form>
    </aside>
  );
};
export default SideBar;
