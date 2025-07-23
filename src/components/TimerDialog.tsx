"use client";

import { useState, useEffect, useMemo, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';
import { Timer, Play, Pause, RotateCcw } from 'lucide-react';

export function TimerDialog() {
  const [initialMinutes, setInitialMinutes] = useState(10);
  const [initialSeconds, setInitialSeconds] = useState(0);

  const [totalSeconds, setTotalSeconds] = useState(initialMinutes * 60 + initialSeconds);
  const [isActive, setIsActive] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // This effect runs only on the client
    audioRef.current = new Audio('/sounds/alarm.mp3'); // A placeholder path
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isActive && totalSeconds > 0) {
      interval = setInterval(() => {
        setTotalSeconds((seconds) => seconds - 1);
      }, 1000);
    } else if (!isActive && totalSeconds !== 0) {
      clearInterval(interval!);
    } else if (totalSeconds === 0 && isActive) {
      setIsActive(false);
      toast({
        title: 'Time\'s up!',
        description: 'Your timer has finished.',
      });
      audioRef.current?.play().catch(e => console.error("Error playing audio:", e));
    }
    return () => clearInterval(interval!);
  }, [isActive, totalSeconds]);
  
  const handleStart = () => {
    const newTotal = initialMinutes * 60 + initialSeconds;
    if (newTotal > 0 && totalSeconds === 0) {
        setTotalSeconds(newTotal);
    }
    setIsActive(true);
  }

  const handleReset = () => {
    setIsActive(false);
    setTotalSeconds(initialMinutes * 60 + initialSeconds);
  }

  const displayTime = useMemo(() => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  }, [totalSeconds]);

  return (
    <Dialog onOpenChange={(open) => !open && setIsActive(false)}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <Timer className="h-5 w-5" />
          <span className="sr-only">Open Timer</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Kitchen Timer</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-center justify-center space-y-6 py-8">
            <div className="text-8xl font-mono font-bold text-primary tracking-tighter">
                {displayTime}
            </div>
            <div className="flex items-center space-x-4">
                <div className="grid w-24 items-center gap-1.5">
                    <Label htmlFor="minutes">Minutes</Label>
                    <Input id="minutes" type="number" value={initialMinutes} onChange={(e) => setInitialMinutes(Number(e.target.value))} min="0" max="999" disabled={isActive} />
                </div>
                <div className="grid w-24 items-center gap-1.5">
                    <Label htmlFor="seconds">Seconds</Label>
                    <Input id="seconds" type="number" value={initialSeconds} onChange={(e) => setInitialSeconds(Number(e.target.value))} min="0" max="59" disabled={isActive}/>
                </div>
            </div>
            <div className="flex items-center space-x-4">
                <Button size="lg" variant={isActive ? "outline" : "default"} onClick={isActive ? () => setIsActive(false) : handleStart}>
                    {isActive ? <Pause className="mr-2 h-5 w-5" /> : <Play className="mr-2 h-5 w-5" />}
                    {isActive ? 'Pause' : 'Start'}
                </Button>
                <Button size="lg" variant="ghost" onClick={handleReset}>
                    <RotateCcw className="mr-2 h-5 w-5" />
                    Reset
                </Button>
            </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
