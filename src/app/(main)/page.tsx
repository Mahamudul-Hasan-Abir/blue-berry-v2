import BigImageSection from "@/BigImageSection/BigImageSection";
import BlogSection from "@/BlogSection/BlogSection";
import ExploreCategories from "@/ExploreCategories/ExploreCategories";

import Featers from "@/Featers/Featers";

import HeroSeciton from "@/HeroSection/HeroSection";
import Testimonials from "@/Testimonials/Testimonials";
import TestySnacks from "@/TestySnacks/TestySnacks";

import TopVendor from "@/TopVendors/TopVendor";

export default function Home() {
  return (
    <div>
      <HeroSeciton></HeroSeciton>

      <ExploreCategories></ExploreCategories>
      <TestySnacks></TestySnacks>
      <BigImageSection></BigImageSection>
      <Featers></Featers>
      <TopVendor></TopVendor>
      <Testimonials></Testimonials>
      <BlogSection></BlogSection>
    </div>
  );
}
