export default function BannerHero() {
  return (
    <div className="w-full flex justify-center items-center">
      <img
        src="/promo.webp"
        alt="Promoção"
        className="
          w-[95%]            
          h-[260px]
          object-cover       
          rounded-xl         
          shadow-md          
        "
      />
    </div>
  );
}