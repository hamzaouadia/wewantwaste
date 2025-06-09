import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Minimize2 } from 'lucide-react';

export default function CartModal({ selectedSkips, setSelectedSkips, cartVisible, setCartVisible, iconPosition }) {

    const updateQuantity = (id, delta) => {
        setSelectedSkips(prev => {
            const totalQuantity = prev.reduce((sum, item) => sum + item.quantity, 0);
            if (totalQuantity >= 10 && delta > 0) {
                return prev;
            }

            return prev.map(s =>
                s.skip.id === id
                    ? { ...s, quantity: Math.max(1, s.quantity + delta) }
                    : s
            );
        });
    };


    const removeSkip = (id) => {
        setSelectedSkips(prev => prev.filter(s => s.skip.id !== id));
    };

    const getTotal = () => {
        return selectedSkips
            .reduce((acc, s) => acc + parseFloat(s.skip.price.replace('£', '')) * s.quantity, 0)
            .toFixed(2);
    };


    return (
        <AnimatePresence>
            {cartVisible && (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 backdrop-blur-2xl flex items-center justify-center"
            >
                <motion.div
                    initial={{
                        opacity: 0,
                        scale: 0.8,
                        x: iconPosition.x - window.innerWidth / 2 + 100,
                        y: iconPosition.y - window.innerHeight / 2 + 100,
                    }}
                    animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
                    exit={{
                        opacity: 0,
                        scale: 0.8,
                        x: iconPosition.x - window.innerWidth / 2 + 100,
                        y: iconPosition.y - window.innerHeight / 2 + 100,
                    }}
                    transition={{ duration: 0.4 }}
                    className="bg-[#1a1a1a] text-white p-6 rounded-lg shadow-xl w-[90%] max-w-md relative"
                >
                    <button
                        onClick={() => setCartVisible(false)}
                        className="absolute top-2 right-2 p-1 hover:cursor-pointer rounded-md hover:scale-110 hover:bg-white/10 text-white text-xl"
                    >
                        <Minimize2 className='p-1' size={30} />
                    </button>

                    <h2 className="text-2xl font-bold mb-4">Your Cart</h2>

                    {selectedSkips.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-48">
                            <ShoppingCart size={50} className="text-gray-500 mb-2" />
                            <h1 className="text-gray-400">Your Cart is empty</h1>
                            <p className="text-gray-500">Add skips to your cart to see them here.</p>
                        </div>
                    ) : (
                        <>
                            <ul className="space-y-3 overflow-auto max-h-48 pr-2">
                                {selectedSkips.map(({ skip, quantity }) => (
                                <li key={skip.id} className="flex flex-col gap-2">
                                    <div className="flex justify-between items-center">
                                        <span className="font-semibold">{skip.title}</span>
                                        <span className="text-green-400 font-bold">
                                            £{(parseFloat(skip.price.replace('£', '')) * quantity).toFixed(2)}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() => updateQuantity(skip.id, -1)}
                                            className="bg-white/10 px-2 hover:cursor-pointer rounded hover:bg-white/20"
                                        >−</button>
                                        <span>{quantity}</span>
                                        <button
                                            onClick={() => updateQuantity(skip.id, 1)}
                                            className="bg-white/10 px-2 hover:cursor-pointer rounded hover:bg-white/20"
                                        >+</button>
                                        <button
                                            onClick={() => removeSkip(skip.id)}
                                            className="ml-auto text-red-500 hover:cursor-pointer hover:text-red-700 text-sm"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </li>
                                ))}
                            </ul>

                            <div className="flex justify-between items-center mt-6 border-t pt-4">
                                <h3 className="text-lg font-semibold">Total:</h3>
                                <span className="text-xl font-bold text-green-400">£{getTotal()}</span>
                            </div>

                            <button
                                onClick={() => setSelectedSkips([])}
                                className="mt-4 bg-red-500 hover:cursor-pointer hover:bg-red-600 px-4 py-2 rounded-md text-white w-full"
                            >
                                Clear Cart
                            </button>
                        </>
                    )}
                </motion.div>
            </motion.div>
            )}
        </AnimatePresence>
    );
}