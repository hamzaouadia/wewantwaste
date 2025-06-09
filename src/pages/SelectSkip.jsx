import { ChevronRight, ChevronLeft } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import LoadingSpinner from '../components/LoadingSpinner';
import CartModal from '../components/CartModal';
import CartIcon from '../components/CartIcon';
import ItemCard from '../components/ItemCard';



export default function SelectSkip({  skips }) {
    if (!skips || skips.length === 0) {
        return <LoadingSpinner />;
    }

    const [cartVisible, setCartVisible] = useState(false);
    const [iconPosition, setIconPosition] = useState({ x: 0, y: 0 });
    const [current, setCurrent] = useState(0);
    const skip = skips[current];
    const isFirst = current === 0;
    const isLast = current === skips.length - 1;

    const [selectedSkips, setSelectedSkips] = useState(() => {
        const stored = localStorage.getItem('selectedSkips');
            return stored ? JSON.parse(stored) : [];
    });

    const handlePrev = () => !isFirst && setCurrent(prev => prev - 1);
    const handleNext = () => !isLast && setCurrent(prev => prev + 1);

    const toggleSkip = () => {
        setSelectedSkips(prev => {
            const existing = prev.find(s => s.skip.id === skip.id);
            if (existing) {
                return prev.filter(s => s.skip.id !== skip.id);
            } else {
                return [...prev, { skip, quantity: 1 }];
            }
        });
    };

    useEffect(() => {
        localStorage.setItem('selectedSkips', JSON.stringify(selectedSkips));
    }, [selectedSkips]);

    const isSelected = selectedSkips.some(s => s?.skip?.id === skip.id);
    
    return(
        <section className='flex flex-col h-screen pt-15 items-center justify-center bg-[#121212] w-screen text-white'>
            <div className='flex flex-col md:flex-row max-w-full max-h-full items-center justify-center gap-10'>
                <div className='flex items-center justify-center'>
                    <div className='flex flex-col gap-4 justify-center md:items-start items-center md:text-start text-center p-4'>
                        <h1 className='md:text-6xl text-4xl font-bold'>Choose Your Skip Size</h1>
                        <h2 className='md:text-xl font-mono'>Select the skip size that best suits your needs</h2>
                        <h3 className='md:text-sx text-sm font-mono text-white/60 max-w-150'>
                            Imagery and information shown throughout this website may not reflect the exact shape or size specification, colours may vary, options and/or accessories may be featured at additional cost.
                        </h3>
                        <CartIcon
                            SkipsLength={selectedSkips.length}
                            setCartVisible={setCartVisible}
                            setIconPosition={setIconPosition}
                        />
                        <CartModal
                            selectedSkips={selectedSkips}
                            setSelectedSkips={setSelectedSkips}
                            cartVisible={cartVisible}
                            setCartVisible={setCartVisible}
                            iconPosition={iconPosition}
                        />
                    </div>
                </div>

                <div className='md:w-1/2 w-full md:p-5 flex flex-col items-center justify-center'>
                    <div className="w-full h-full flex flex-row gap-4 items-center justify-center">
                        <button className={`transition ${isFirst ? 'opacity-0' : 'hover:scale-150 cursor-pointer'}`} onClick={handlePrev}><ChevronLeft size={32} /></button>

                        <ItemCard
                            skip={skip}
                            skips={skips}
                            current={current}
                            isSelected={isSelected}
                            toggleSkip={toggleSkip}
                        />

                        <button className={`transition ${isLast ? 'opacity-0' : 'hover:scale-150 cursor-pointer'}`} onClick={handleNext}><ChevronRight size={32} /></button>
                    </div>
                </div>
            </div>

            <AnimatePresence>
                {selectedSkips.length > 0 && (
                    <motion.button
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: 'easeOut' }}
                        className="absolute md:bottom-10 bottom-5 flex justify-center"
                        onClick={() => console.log('Continue to next step')}
                    >
                        <h1 className="text-xl hover:scale-105 hover:cursor-pointer transition-transform duration-200 flex justify-center items-center h-12 w-40 rounded-md bg-blue-700 text-white font-bold shadow-lg">
                            Continue
                        </h1>
                    </motion.button>
                )}
            </AnimatePresence>

        </section>
    )
}