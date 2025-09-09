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
]

function NewArrivalProduct() {
  return (
    <section className="w-full py-10 border-b  mb-5">
    <div className="flex justify-between items-center mb-3">
    <h2 className="text-2xl font-bold mb-6 text-center">New Arrivals</h2>
    <Button>Explore</Button>
        
    </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 sm:gap-6 gap-3">
        {products.map((product) => (
          <div
            key={product.id}
            className=" overflow-hidden   transition"
          >
            <img
              src={product.img}
              alt={product.name}
              className="w-full sm:h-80 h-40 object-cover rounded-2xl"
            />
            <div className="p-3 flex flex-col justify-between">
              <h3 className="text-sm font-semibold">{product.name}</h3>
              <p className="text-gray-600 mt-1">{product.price}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default NewArrivalProduct
