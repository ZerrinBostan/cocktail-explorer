'use client';
import { useRouter } from 'next/navigation';


const BackButton = () => {
    const router = useRouter();

    const backToLastPage = () => {
        router.back();
    };

    return (
        <button
            className="text-indigo-600 hover:text-indigo-500 font-medium mb-2 md:mb-0 md:order-2 md:ml-4"
            onClick={backToLastPage}
        >
            &larr; Turn back
        </button>
    )
};
export default BackButton;