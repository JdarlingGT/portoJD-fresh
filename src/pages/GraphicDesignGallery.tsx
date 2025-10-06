import { motion } from "framer-motion";

const graphicDesigns = [
  "/assets/Graphic Deesign/Adobe_Express_20220529_1906220.5458089298150159.png",
  "/assets/Graphic Deesign/DALL·E 2024-11-13 06.48.56 - A new angle of the scene showing evil habanero peppers with menacing, villainous expressions as they herd terrified blueberries, raspberries, blackber.webp",
  "/assets/Graphic Deesign/DALL·E 2024-11-13 08.06.53 - A playful, cartoonish scene showing jars labeled _Jacob_s Berry Berry Hot Sauce_ filled with hot sauce containing blueberries, raspberries, and blackb.webp",
  "/assets/Graphic Deesign/Dirty 30 Back.jpg",
  "/assets/Graphic Deesign/IMG_20220529_195734_101.jpg",
  "/assets/Graphic Deesign/IMG_20220606_011741_906.jpg",
  "/assets/Graphic Deesign/Koozie design - final.png",
  "/assets/Graphic Deesign/Stary Nap.jpg",
];

export default function GraphicDesignGallery() {
  return (
    <main className="min-h-screen bg-background-dark text-secondary">
      <section className="pt-28 pb-16">
        <div className="max-w-6xl mx-auto px-6">
          <h1 className="text-4xl font-heading font-bold mb-6">Graphic Design Gallery</h1>
          <p className="font-body text-secondary/70 mb-6">
            Explore a collection of my graphic design work, showcasing creativity and technical expertise.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {graphicDesigns.map((src, index) => (
              <motion.div
                key={index}
                className="rounded-lg overflow-hidden shadow-lg bg-white/5 border border-white/10"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <img src={src} alt={`Graphic Design ${index + 1}`} className="w-full h-auto" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}