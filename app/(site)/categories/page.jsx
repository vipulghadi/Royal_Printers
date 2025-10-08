'use client'
import React from 'react'
import { motion } from 'framer-motion'
import { dummyCategories } from '@/lib/dummyData'
import CategoryCard from '@/components/client/categoryCard'
import { CustomBreadcrumb } from '@/components/shared/customBreadCrumb'

function CategoriesPage() {
  return (
    <div className='w-full'>
              <section
      className="w-full h-[60vh] sm:h-[50vh] py-10 px-6 sm:px-12 
      text-white bg-cover bg-center relative"
      style={{
        backgroundImage: "url('/categoryBG.png')",
      }}
    >

      {/* Background Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-orange-600/70 to-red-400/60 z-0"></div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto flex flex-col gap-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-6"
        >

                <div className="flex mb-2 sm:mb-1">
                            <div className="inline-block bg-slate-200 px-2 py-1 rounded-2xl">
                    <CustomBreadcrumb data={[
                        {
                            "title":"home",
                            "link":"/"
                        },
                        {
                            "title":"categories"
                        }
                    ]} textColor="text-black"/>
                </div>
                </div>
        
          <h2 className="text-3xl sm:text-4xl font-bold">
            Explore Printing Categories for Every Business Need
          </h2>
          <p className="mt-3 text-white/90 max-w-3xl mx-auto leading-relaxed">
            Discover a wide range of <strong>custom printing categories</strong> —
            from <strong>visiting cards</strong> and <strong>stickers</strong> to
            <strong> packaging boxes</strong>, <strong>labels</strong>, and
            <strong> promotional gifts</strong>. Whether you’re launching a
            brand, scaling a business, or creating something unique, our
            categorized printing options make it easy to find exactly what you
            need.
          </p>

        </motion.div>
      </div>

    </section>
                    <div className=" w-[90vw] mx-auto  mt-10 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-24">
        {dummyCategories.length > 0 ? (
          dummyCategories.map((category) => (
<CategoryCard category={category}/>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">No Category found.</p>
        )}
      </div>

    </div>

  )
}

export default CategoriesPage
