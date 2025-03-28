"use client"
import { useState } from "react"
import { motion } from "framer-motion"
import { ChevronDown, ChevronRight, BookOpen, Brain, Calculator } from "lucide-react"

const GuruTryoutDetail = () => {
  return (
    <div className="flex flex-col items-center justify-center bg-gradient-to-b from-[#f5f0e8] to-[#e9e1d4] p-6 min-h-screen w-screen">
      <motion.div
        className="w-full max-w-2xl px-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <motion.h1
          className="text-3xl font-bold text-gray-800 mb-8 text-center relative"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, type: "spring", stiffness: 100 }}
        >
          <motion.span
            className="inline-block"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{
              duration: 0.5,
              delay: 0.8,
              type: "spring",
              stiffness: 200,
            }}
          >
            Tryout UTBK SNBT 2025 ep. 1
          </motion.span>
          <motion.div
            className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-[#2e4460] rounded-full"
            initial={{ width: 0 }}
            animate={{ width: "100px" }}
            transition={{ duration: 0.6, delay: 1.0 }}
          />
        </motion.h1>

        <div className="w-full space-y-6">
          <Section
            title="Tes Potensi Skolastik"
            items={[
              "Penalaran Umum",
              "Pemahaman Bacaan dan Menulis",
              "Pengetahuan dan Pemahaman Umum",
              "Penalaran Kuantitatif",
            ]}
            icon={<Brain />}
            color="#3b82f6"
          />

          <Section
            title="Tes Literasi"
            items={["Literasi Bahasa Indonesia", "Literasi Bahasa Inggris"]}
            icon={<BookOpen />}
            color="#10b981"
          />

          <Section
            title="Penalaran Matematika"
            items={["Penalaran Matematika"]}
            icon={<Calculator />}
            color="#f97316"
          />
        </div>
      </motion.div>
    </div>
  )
}

const Section = ({ title, items, icon, color }) => {
  const [isOpen, setIsOpen] = useState(true)
  const [selectedItem, setSelectedItem] = useState(null)

  // Add descriptions for each subject
  const descriptions = {
    "Penalaran Umum": "Mengukur kemampuan dalam menganalisis dan memecahkan masalah menggunakan logika dan penalaran. Mencakup analisis argumen, pola, dan hubungan antar konsep.",
    "Pemahaman Bacaan dan Menulis": "Menguji kemampuan memahami teks kompleks, menganalisis informasi, dan mengekspresikan ide secara tertulis dengan efektif dan terstruktur.",
    "Pengetahuan dan Pemahaman Umum": "Mengukur wawasan umum tentang sains, sosial, budaya, dan isu kontemporer. Menguji kemampuan mengaitkan berbagai bidang pengetahuan.",
    "Penalaran Kuantitatif": "Menguji kemampuan dalam menganalisis data numerik, statistik, dan pemecahan masalah matematis dalam konteks praktis.",
    "Literasi Bahasa Indonesia": "Mengukur kemampuan memahami dan menggunakan Bahasa Indonesia dalam konteks akademik, termasuk tata bahasa, kosakata, dan pemahaman teks.",
    "Literasi Bahasa Inggris": "Menguji pemahaman teks bahasa Inggris, kemampuan mengidentifikasi informasi tersirat, dan penguasaan grammar dalam konteks akademik.",
    "Penalaran Matematika": "Mengukur kemampuan dalam memecahkan masalah matematika kompleks, logika numerik, dan penerapan konsep matematika dalam berbagai situasi.",
  }

  // Variants for animations
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { type: "spring", stiffness: 100, damping: 10 },
    },
  }

  return (
    <motion.div
      className="rounded-lg overflow-hidden shadow-md"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      transition={{ duration: 0.5, type: "spring" }}
    >
      <motion.div
        className="bg-[#2e4460] text-white font-semibold py-3 px-4 flex items-center justify-between cursor-pointer"
        whileHover={{ backgroundColor: "#263850" }}
        onClick={() => setIsOpen(!isOpen)}
        style={{
          borderLeft: `4px solid ${color}`,
          transition: "background-color 0.2s ease",
        }}
      >
        <div className="flex items-center space-x-3">
          <motion.div
            className="text-white"
            initial={{ rotate: 0 }}
            animate={{ rotate: [0, 10, 0] }}
            transition={{ duration: 1, delay: 1, repeat: Number.POSITIVE_INFINITY, repeatDelay: 5 }}
          >
            {icon}
          </motion.div>
          <h2>{title}</h2>
        </div>
        <motion.div animate={{ rotate: isOpen ? 0 : -90 }} transition={{ duration: 0.3 }}>
          {isOpen ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
        </motion.div>
      </motion.div>

      <motion.div
        initial={false}
        animate={{
          height: isOpen ? "auto" : 0,
          opacity: isOpen ? 1 : 0,
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="overflow-hidden"
      >
        <div className="border border-t-0 rounded-b-lg overflow-hidden bg-white">
          {items.map((item, index) => (
            <motion.div
              key={index}
              className={`p-4 border-b last:border-b-0 hover:bg-gray-50 cursor-pointer transition-colors duration-150`}
              variants={itemVariants}
              onClick={() => setSelectedItem(selectedItem === item ? null : item)}
              whileHover={{
                backgroundColor: `${color}10`,
                x: 5,
                transition: { duration: 0.2 },
              }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <motion.div 
                    className="w-2 h-2 rounded-full" 
                    style={{ backgroundColor: color }}
                    animate={{
                      scale: selectedItem === item ? [1, 1.5, 1] : 1
                    }}
                    transition={{ duration: 0.3 }}
                  />
                  <span className="font-medium text-gray-800">{item}</span>
                </div>
                <motion.div
                  className="text-gray-400"
                  animate={{ 
                    rotate: selectedItem === item ? 90 : 0,
                    color: selectedItem === item ? color : "#9CA3AF"
                  }}
                  whileHover={{
                    scale: 1.2,
                    transition: { duration: 0.2 },
                  }}
                >
                  <ChevronRight size={16} />
                </motion.div>
              </div>
              
              {/* Description panel */}
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{
                  height: selectedItem === item ? "auto" : 0,
                  opacity: selectedItem === item ? 1 : 0,
                }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <motion.p 
                  className="mt-3 text-gray-600 text-sm pl-4 border-l-2" 
                  style={{ borderColor: color }}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ 
                    x: selectedItem === item ? 0 : -20,
                    opacity: selectedItem === item ? 1 : 0
                  }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                >
                  {descriptions[item]}
                </motion.p>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  )
}

export default GuruTryoutDetail

