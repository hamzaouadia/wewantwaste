import { motion, AnimatePresence } from 'framer-motion';
import { Ban } from 'lucide-react';


export default function itemCard({ skip, skips, current, isSelected, toggleSkip }) {
    return (
        <div className="w-150 md:h-150 h-100 p-4 rounded-lg border bg-white/5 border-white/10 shadow-lg flex flex-col items-center gap-4 justify-center">
            <AnimatePresence mode="wait">
                <motion.div
                    key={skip.id}
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.3 }}
                    className="relative w-full h-full overflow-hidden rounded-md flex justify-center items-center"
                >
                    <img className="w-full object-cover rounded-md" src={skip.image} alt={skip.title} />
                    {!skip.allowed_on_road && (
                        <div className="absolute flex items-center bottom-3 right-2 bg-red-600 text-white text-sm font-semibold px-2 py-1 rounded">
                            <Ban size={16} className="inline mr-1" />
                            <p>Not Allowed On The Road</p>
                        </div>
                    )}
                </motion.div>
            </AnimatePresence>

            <div className='flex flex-col items-start gap-2 w-full pl-2'>
                <h1 className="text-xl font-bold text-white">{skip.title}</h1>
                <h2 className="text-md text-white/60">{skip.period} hire period</h2>
                <h1 className="text-2xl mt-5 font-semibold text-blue-700">{skip.price}</h1>
            </div>

            <button
                onClick={toggleSkip}
                className={`md:w-1/2 w-full font-bold hover:cursor-pointer text-white px-4 py-2 rounded-md transition duration-300 md:hover:scale-110 ${
                isSelected ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'
                }`}
            >
                {isSelected ? '− Remove from Cart' : '+ Add this Skip'}
            </button>


            <div className="flex justify-center items-center gap-2 mt-4">
                {skips.map((_, index) => (
                    <div
                        key={index}
                        className={`h-2 rounded-full transition-all duration-300 ${
                        index === current ? 'w-8 bg-blue-500' : 'w-4 bg-gray-500/50'
                        }`}
                    />
                ))}
            </div>
        </div>
    )
}