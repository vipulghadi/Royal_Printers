import React from "react"

function PopularServiceSection() {
  return (
    <section className="w-full  ">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 ">
        
        {/* Left Column */}
        <div className="h-[400px]">
          <img
            src="http://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.pinimg.com%2Foriginals%2F4e%2F3e%2Fd1%2F4e3ed1555d1c546f923e3aba24083f3d.png&f=1&nofb=1&ipt=9e1af4ba8cddb6d825d9aa4988c4950231ae4cbd78830fe45ea7058cb8506a74"
            alt="Printing Services"
            className="rounded-lg shadow-md object-cover w-full h-full"
          />
        </div>

        {/* Right Column */}
        <div className="h-[400px] flex flex-col gap-4">
          {/* Top Image (half height) */}
          <div className="h-1/2">
            <img
              src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fpatigraphics.com%2Fwp-content%2Fuploads%2F2024%2F02%2FIdcard_04_900600.jpg&f=1&nofb=1&ipt=8b9f31f2d02ac93c0827df72e7cadcc8888340ee0ff3c3d472523ea413216bfd"
              alt="Design Services"
              className="rounded-lg shadow-md object-cover w-full h-full"
            />
          </div>

          {/* Bottom Contact Box (half height) */}
          <div className="h-1/2 bg-orange-600 text-white rounded-lg p-6 shadow-md flex flex-col justify-center">
            <p className="mb-3">
              Have a project in mind? Let’s make it happen.  
              Our team is always ready to assist you with your needs.
            </p>
            <button className="px-5 py-2 bg-white text-orange-600 font-semibold rounded-md hover:bg-gray-100 transition">
              Contact Us
            </button>
          </div>
        </div>

      </div>
    </section>
  )
}

export default PopularServiceSection
