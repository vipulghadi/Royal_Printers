import { cn } from "@/lib/utils"
import { Marquee } from "@/components/magicui/marquee"
import { dummyCategories } from "@/lib/dummyData"
// Example categories (replace with real data)


const CategoryCard = ({ name, url }) => {
  return (
    <div
      className={cn(
        "relative w-32 flex-shrink-0 cursor-pointer overflow-hidden rounded-xl p-1",
        "border-gray-200 bg-white hover:bg-gray-50",
        "dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
      )}
    >
      <div className="flex flex-col items-center text-center gap-2">
        <div className="w-20 h-20 overflow-hidden rounded-md">
          <img
            src={url}
            alt={name}
            className="w-full h-full object-cover"
          />
        </div>
        <h3 className="text-sm font-semibold">{name}</h3>
      </div>
    </div>
  )
}


export function HomeMarqueeCategory() {
  return (
    <div className="relative flex w-full items-center justify-center overflow-hidden py-6">
      <Marquee pauseOnHover className="[--duration:25s]">
        {dummyCategories.map((category) => (
          <CategoryCard key={category.name} {...category} />
        ))}
      </Marquee>

      {/* gradient edges for fade effect */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/6 bg-gradient-to-r from-background"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/6 bg-gradient-to-l from-background"></div>
    </div>
  )
}
