import Userlayout from '../componentes/Layout/Userlayout';
import HeroSection from '../componentes/Common/Hero';
import CollectionsSection from "../componentes/Products/Colliction";
// import Slider from '../componentes/Products/Slider';
import BestSellers from '../componentes/Products/BestSellerSection';

// Define the array of images
// const sliderImages = [
//   { src: '/front-view-friends-taking-selfie-night.jpg', alt: 'Description for image 2' },
//   { src: '/young-male-model-reading-side-view.jpg', alt: 'Description for image 1' },
//   { src: '/young-japanese-woman-portrait-sitting-chair.jpg', alt: 'Description for image 3' },
// ];

function HomePage() {
  return (
    <Userlayout>
      <HeroSection />
      <CollectionsSection />
      {/* Pass the sliderImages array as the "images" prop */}
      {/* <Slider images={sliderImages} /> */}
      <BestSellers  />
    </Userlayout>
  );
}

export default HomePage;