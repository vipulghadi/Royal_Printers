import { cn } from "@/lib/utils"
import { Marquee } from "@/components/magicui/marquee"

// Example products (replace with your real data)
const products = [
  {
    name: "Business Cards",
    desc: "Premium Quality",
    img: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%2Fid%2FOIP.fO6mfyj__mISNI0UDcy6TwHaHa%3Fpid%3DApi&f=1&ipt=65d1d304a5c5b08a1294edad6d174bc0ae5c747fc22f0e600484952985ef4fd8",
  },
  {
    name: "Flyers",
    desc: "A5 / A4 Sizes",
    img: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%2Fid%2FOIP.fO6mfyj__mISNI0UDcy6TwHaHa%3Fpid%3DApi&f=1&ipt=65d1d304a5c5b08a1294edad6d174bc0ae5c747fc22f0e600484952985ef4fd8",
  },
  {
    name: "Posters",
    desc: "Gloss Finish",
    img: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%2Fid%2FOIP.fO6mfyj__mISNI0UDcy6TwHaHa%3Fpid%3DApi&f=1&ipt=65d1d304a5c5b08a1294edad6d174bc0ae5c747fc22f0e600484952985ef4fd8",
  },
  {
    name: "T-Shirts",
    desc: "Custom Print",
    img: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%2Fid%2FOIP.fO6mfyj__mISNI0UDcy6TwHaHa%3Fpid%3DApi&f=1&ipt=65d1d304a5c5b08a1294edad6d174bc0ae5c747fc22f0e600484952985ef4fd8",
  },
  {
    name: "Mugs",
    desc: "Photo Prints",
    img: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%2Fid%2FOIP.fO6mfyj__mISNI0UDcy6TwHaHa%3Fpid%3DApi&f=1&ipt=65d1d304a5c5b08a1294edad6d174bc0ae5c747fc22f0e600484952985ef4fd8",
  },
]

const ProductCard = ({ img, name, desc }) => {
  return (
    <div
      className={cn(
        "relative w-32 flex-shrink-0 cursor-pointer overflow-hidden rounded-xl  p-1",
        // light styles
        "border-gray-200 bg-white hover:bg-gray-50",
        // dark styles
        "dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
      )}
    >
      <div className="flex flex-col items-center text-center gap-2">
        <img
          src={img}
          alt={name}
          width={60}
          height={60}
          className="rounded-md object-cover"
        />
        <div>
          <h3 className="text-sm font-semibold">{name}</h3>
    
        </div>
      </div>
    </div>
  )
}

export function HomeMarqueeProduct() {
  return (
    <div className="relative flex w-full items-center justify-center overflow-hidden py-6">
      <Marquee pauseOnHover className="[--duration:25s]">
        {products.map((product) => (
          <ProductCard key={product.name} {...product} />
        ))}
      </Marquee>

      {/* gradient edges for fade effect */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/6 bg-gradient-to-r from-background"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/6 bg-gradient-to-l from-background"></div>
    </div>
  )
}
