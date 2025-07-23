import type { SVGProps } from "react";

export function ChefHatIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M4 12V6.25c0-1.25.75-2.25 2-2.25h12c1.25 0 2 1 2 2.25V12" />
      <path d="M4 12a4 4 0 1 0 8 0V8" />
      <path d="M12 12a4 4 0 1 0 8 0V8" />
      <path d="M16 12a4 4 0 1 0 8 0V8" />
      <path d="M4 16h16" />
      <path d="M4 20h16" />
    </svg>
  );
}
