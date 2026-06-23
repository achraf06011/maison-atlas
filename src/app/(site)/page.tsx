import { Hero } from "@/components/home/hero";
import { Story } from "@/components/home/story";
import { Chef } from "@/components/home/chef";
import { Signature } from "@/components/home/signature";
import { GalleryPreview } from "@/components/home/gallery-preview";
import { ReservationSection } from "@/components/home/reservation-section";
import { Testimonials } from "@/components/home/testimonials";
import { getFeaturedDishes, getGallery, getReviews } from "@/lib/data";

export const revalidate = 60;

export default async function HomePage() {
  const [dishes, gallery, reviews] = await Promise.all([
    getFeaturedDishes(),
    getGallery(),
    getReviews(),
  ]);

  return (
    <>
      <Hero />
      <Story />
      <Chef />
      <Signature dishes={dishes} />
      <GalleryPreview images={gallery} />
      <Testimonials reviews={reviews} />
      <ReservationSection />
    </>
  );
}
