import { useRef } from 'react';
import { ShoppingCart } from 'lucide-react';


export default function CartIcon({ SkipsLength, setCartVisible, setIconPosition }) {
    const iconRef = useRef(null);

    const openCart = () => {
        if (iconRef.current) {
            const rect = iconRef.current.getBoundingClientRect();
            setIconPosition({ x: rect.left, y: rect.top });
        }
        setCartVisible(true);
    }

    return (
        <div
            ref={iconRef}
            onClick={openCart}
            className='absolute p-1 rounded-full md:bottom-10 md:right-10 bottom-5 right-5 hover:scale-110 transition duration-300 bg-white/10 hover:bg-white/20 cursor-pointer'
        >
            <div className='relative p-2'>
                {SkipsLength > 0 && (
                    <div className='absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-sm'>
                        {SkipsLength}
                    </div>
                )}
                <ShoppingCart size={25} />
            </div>
        </div>
    )
}