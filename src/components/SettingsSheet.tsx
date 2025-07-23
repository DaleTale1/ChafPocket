"use client"

import { useTheme } from "next-themes";
import { useTextSize } from "@/components/providers/ThemeProvider";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Sun, Moon, CaseSensitive } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function SettingsSheet() {
  const { theme, setTheme } = useTheme();
  const { textSize, setTextSize } = useTextSize();

  return (
    <div className="grid gap-6 py-4">
      <div className="flex items-center justify-between">
        <Label htmlFor="theme-toggle" className="flex items-center gap-2">
            <Sun className="h-5 w-5 transition-all scale-100 rotate-0 dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-5 w-5 transition-all scale-0 rotate-90 dark:rotate-0 dark:scale-100" />
            <span className="ml-8">Theme</span>
        </Label>
        <Select value={theme} onValueChange={setTheme}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select theme" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="light">Light</SelectItem>
            <SelectItem value="dark">Dark</SelectItem>
            <SelectItem value="system">System</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex items-center justify-between">
        <Label htmlFor="text-size-toggle" className="flex items-center gap-2">
          <CaseSensitive className="h-5 w-5" />
          <span>Text Size</span>
        </Label>
         <Select value={textSize} onValueChange={(value) => setTextSize(value as 'small' | 'medium' | 'large')}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select size" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="small">Small</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="large">Large</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
