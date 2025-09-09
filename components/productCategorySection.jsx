import React from "react"
import { Button } from "./ui/button"

const products = [
  {
    id: 1,
    name: "Business Cards",
    price: "₹199",
    img: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftoffle.in%2Fcdn%2Fshop%2Ffiles%2Fwtwide1.jpg%3Fv%3D1709646109%26width%3D800&f=1&nofb=1&ipt=8037f91b0cc70e7ce5098a26f4b34435852903183742ab22a6b99b17992fcc1c",
  },
  {
    id: 2,
    name: "Flyers",
    price: "₹299",
    img: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftoffle.in%2Fcdn%2Fshop%2Ffiles%2Fwtwide1.jpg%3Fv%3D1709646109%26width%3D800&f=1&nofb=1&ipt=8037f91b0cc70e7ce5098a26f4b34435852903183742ab22a6b99b17992fcc1c",
  },
  {
    id: 3,
    name: "Posters",
    price: "₹499",
    img: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftoffle.in%2Fcdn%2Fshop%2Ffiles%2Fwtwide1.jpg%3Fv%3D1709646109%26width%3D800&f=1&nofb=1&ipt=8037f91b0cc70e7ce5098a26f4b34435852903183742ab22a6b99b17992fcc1c",
  },
  {
    id: 4,
    name: "T-Shirts",
    price: "₹799",
    img: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftoffle.in%2Fcdn%2Fshop%2Ffiles%2Fwtwide1.jpg%3Fv%3D1709646109%26width%3D800&f=1&nofb=1&ipt=8037f91b0cc70e7ce5098a26f4b34435852903183742ab22a6b99b17992fcc1c",
  },
    {
    id: 1,
    name: "Business Cards",
    price: "₹199",
    img: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftoffle.in%2Fcdn%2Fshop%2Ffiles%2Fwtwide1.jpg%3Fv%3D1709646109%26width%3D800&f=1&nofb=1&ipt=8037f91b0cc70e7ce5098a26f4b34435852903183742ab22a6b99b17992fcc1c",
  },
  {
    id: 2,
    name: "Flyers",
    price: "₹299",
    img: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftoffle.in%2Fcdn%2Fshop%2Ffiles%2Fwtwide1.jpg%3Fv%3D1709646109%26width%3D800&f=1&nofb=1&ipt=8037f91b0cc70e7ce5098a26f4b34435852903183742ab22a6b99b17992fcc1c",
  },
  {
    id: 3,
    name: "Posters",
    price: "₹499",
    img: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftoffle.in%2Fcdn%2Fshop%2Ffiles%2Fwtwide1.jpg%3Fv%3D1709646109%26width%3D800&f=1&nofb=1&ipt=8037f91b0cc70e7ce5098a26f4b34435852903183742ab22a6b99b17992fcc1c",
  },
    {
    id: 1,
    name: "Business Cards",
    price: "₹199",
    img: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftoffle.in%2Fcdn%2Fshop%2Ffiles%2Fwtwide1.jpg%3Fv%3D1709646109%26width%3D800&f=1&nofb=1&ipt=8037f91b0cc70e7ce5098a26f4b34435852903183742ab22a6b99b17992fcc1c",
  },
  {
    id: 2,
    name: "Flyers",
    price: "₹299",
    img: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftoffle.in%2Fcdn%2Fshop%2Ffiles%2Fwtwide1.jpg%3Fv%3D1709646109%26width%3D800&f=1&nofb=1&ipt=8037f91b0cc70e7ce5098a26f4b34435852903183742ab22a6b99b17992fcc1c",
  },
  {
    id: 3,
    name: "Posters",
    price: "₹499",
    img: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftoffle.in%2Fcdn%2Fshop%2Ffiles%2Fwtwide1.jpg%3Fv%3D1709646109%26width%3D800&f=1&nofb=1&ipt=8037f91b0cc70e7ce5098a26f4b34435852903183742ab22a6b99b17992fcc1c",
  },
]
function ProductCategorySection() {
  return (

    <section className="w-full py-10 border-b  mb-5 mt-10">
    <div className="flex justify-between items-center mb-5">
    <h2 className="text-2xl font-bold mb-6 text-center">Categories</h2>
    <Button>Explore</Button>
        
    </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 sm:gap- gap-3">
        {products.map((product) => (
          <div
            key={product.id}
            className=" overflow-hidden   transition flex items-center justify-center flex-col"
          >
            <img
              src={product.img}
              alt={product.name}
              className="sm:h-40 sm:w-40 h-40 w-40 object-cover rounded-full"
            />
             <h3 className="text-md mt-2 font-semibold mx-auto ">{product.name}</h3>
            
             
             
        
          </div>
        ))}
      </div>
    </section>
  )
  
}

export default ProductCategorySection