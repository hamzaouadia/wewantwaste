import './App.css';
import SelectSkip from './pages/SelectSkip';
import NavBar from './components/NavBar';

import { useEffect, useState } from 'react';

const baseSkips = [
  { size: 4, image: 'https://yozbrydxdlcxghkphhtq.supabase.co/storage/v1/object/public/skips/skip-sizes/4-yarder-skip.jpg' },
  { size: 6, image: 'https://yozbrydxdlcxghkphhtq.supabase.co/storage/v1/object/public/skips/skip-sizes/6-yarder-skip.jpg' },
  { size: 8, image: 'https://yozbrydxdlcxghkphhtq.supabase.co/storage/v1/object/public/skips/skip-sizes/8-yarder-skip.jpg' },
  { size: 10, image: 'https://yozbrydxdlcxghkphhtq.supabase.co/storage/v1/object/public/skips/skip-sizes/10-yarder-skip.jpg' },
  { size: 12, image: 'https://yozbrydxdlcxghkphhtq.supabase.co/storage/v1/object/public/skips/skip-sizes/12-yarder-skip.jpg' },
  { size: 16, image: 'https://yozbrydxdlcxghkphhtq.supabase.co/storage/v1/object/public/skips/skip-sizes/16-yarder-skip.jpg' },
  { size: 20, image: 'https://yozbrydxdlcxghkphhtq.supabase.co/storage/v1/object/public/skips/skip-sizes/20-yarder-skip.jpg' },
  { size: 40, image: 'https://yozbrydxdlcxghkphhtq.supabase.co/storage/v1/object/public/skips/skip-sizes/40-yarder-skip.jpg' }
];

function App() {
  const [skips, setSkips] = useState([]);

  useEffect(() => {
    fetch('https://app.wewantwaste.co.uk/api/skips/by-location?postcode=NR32&area=Lowestoft')
      .then(response => response.json())
      .then(data => {
        if (Array.isArray(data)) {
          const mergedSkips = baseSkips.map((baseSkip) => {
            const match = data.find(item => item.size === baseSkip.size);
            if (match) {
              return {
                id: match.id,
                size: match.size,
                title: `${match.size} Yard Skip`,
                period: `${match.hire_period_days} Days`,
                price: `£${match.price_before_vat + (match.vat / 100) * match.price_before_vat}`,
                allowed_on_road: match.allowed_on_road,
                image: baseSkip.image
              };
            } else {
              return { ...baseSkip, title: `${baseSkip.size} Yard Skip`, period: '-', price: '-', allowed_on_road: false };
            }
          });

          setSkips(mergedSkips);
        } else {
          throw new Error('Unexpected data format');
        }
      })
      .catch(error => {
        console.error('Error fetching skips:', error);
      });
  }, []);


  return (
    <main className='relative w-full h-screen overflow-hidden flex flex-col bg-[#121212] text-white'>
      <NavBar />
      <SelectSkip skips={skips} />
    </main>
  );
}

export default App;
