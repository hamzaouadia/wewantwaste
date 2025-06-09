import { useState } from 'react';
import { MapPin, Trash2, Truck, Shield, CalendarClock, CreditCard } from 'lucide-react';

export default function NavBar() {
    const [currentStep, setCurrentStep] = useState(2); // You're on "Select Skip"
    const steps = [
        { label: 'Postcode', icon: <MapPin size={20} /> },
        { label: 'Waste Type', icon: <Trash2 size={20} /> },
        { label: 'Select Skip', icon: <Truck size={20} /> },
        { label: 'Permit Check', icon: <Shield size={20} /> },
        { label: 'Choose Date', icon: <CalendarClock size={20} /> },
        { label: 'Payment', icon: <CreditCard size={20} /> },
    ];
    const handleStepClick = (stepIndex) => {
        if (stepIndex <= currentStep) {
            setCurrentStep(stepIndex);
        }
    };
    return (
        <nav className='absolute flex flex-col items-center justify-center w-full h-20 z-10'>
            <div className=" w-11/12 md:w-3/4 mx-auto flex justify-between items-center bg-white/2 p-4 rounded-lg shadow-md">
                {steps.map((step, index) => {
                    const isActive = index <= currentStep;
                    const isCurrent = index === currentStep;

                    return (
                        <div
                            key={step.label}
                            onClick={() => isActive && handleStepClick(index)}
                            className={`flex items-center gap-2 px-2 py-1 rounded-md text-sm transition-all ${
                                isActive
                                ? isCurrent
                                    ? 'text-blue-500 font-bold cursor-pointer'
                                    : 'text-blue-300 hover:text-blue-500 cursor-pointer'
                                : 'text-gray-500 cursor-not-allowed opacity-50'
                            }`}
                        >
                            <span className="inline">{step.icon}</span>
                            <span className="hidden md:inline text-white">{step.label}</span>
                        </div>
                    );
                })}
            </div>
        </nav>
    )
}