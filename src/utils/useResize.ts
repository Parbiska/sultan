import { useState, useEffect } from 'react';

interface ResizeData {
    width: number;
}

export const useResize = (): ResizeData => {
    const [width, setWidth] = useState<number>(window.innerWidth);

    useEffect(() => {
        const handleResize = () => {
            setWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return {
        width,
    };
};
