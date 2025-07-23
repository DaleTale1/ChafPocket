"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider, useTheme } from "next-themes"
import type { ThemeProviderProps } from "next-themes/dist/types"

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}

export function useTextSize() {
    const [textSize, setTextSizeState] = React.useState('medium');

    React.useEffect(() => {
        const savedSize = localStorage.getItem('text-size') || 'medium';
        setTextSizeState(savedSize);
        document.body.dataset.textSize = savedSize;
    }, []);

    const setTextSize = (size: 'small' | 'medium' | 'large') => {
        setTextSizeState(size);
        localStorage.setItem('text-size', size);
        document.body.dataset.textSize = size;
    };
    
    return { textSize, setTextSize };
}
