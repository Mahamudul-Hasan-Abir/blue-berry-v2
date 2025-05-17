import BigImageSection from "@/BigImageSection/BigImageSection";
import BlogSection from "@/BlogSection/BlogSection";
import DealOfTheDay from "@/DealOfTheDay/DealOfTheDay";
import ExploreCategories from "@/ExploreCategories/ExploreCategories";

import Featers from "@/Featers/Featers";

import HeroSeciton from "@/HeroSection/HeroSection";
import NewArrival from "@/NewArraibal/NewArraibal";
import Testimonials from "@/Testimonials/Testimonials";
import TestySnacks from "@/TestySnacks/TestySnacks";

import TopVendor from "@/TopVendors/TopVendor";

export default function Home() {
  return (
    <div>
      <HeroSeciton></HeroSeciton>
      <ExploreCategories></ExploreCategories>
      <DealOfTheDay></DealOfTheDay>
      <TestySnacks></TestySnacks>
      <BigImageSection></BigImageSection>
      <NewArrival></NewArrival>
      <TopVendor></TopVendor>
      <Featers></Featers>
      <Testimonials></Testimonials>
      <BlogSection></BlogSection>
    </div>
  );
}
