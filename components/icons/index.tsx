import {
  Cpu,
  User,
  Settings,
  LogOut,
  LucideProps,
  Sun,
  Moon,
  Menu,
  Home,
  GraduationCap,
  TerminalSquare,
  Laptop2,
  Gamepad,
  Server,
  Star,
} from 'lucide-react';

export const Icons = {
  cpu: Cpu,
  logout: LogOut,
  settings: Settings,
  user: User,
  sun: Sun,
  moon: Moon,
  menu: Menu,
  home: Home,
  graduation: GraduationCap,
  computer: Laptop2,
  server: Server,
  star: Star,
  terminal: TerminalSquare,
  gamepad: Gamepad,
  googleIcon: (props: LucideProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="64"
      height="64"
      shapeRendering="geometricPrecision"
      textRendering="geometricPrecision"
      imageRendering="optimizeQuality"
      fillRule="evenodd"
      clipRule="evenodd"
      viewBox="0 0 640 640"
      fill="currentcolor"
      {...props}
    >
      <path d="M326.331 274.255v109.761h181.49c-7.37 47.115-54.886 138.002-181.49 138.002-109.242 0-198.369-90.485-198.369-202.006 0-111.509 89.127-201.995 198.369-201.995 62.127 0 103.761 26.516 127.525 49.359l86.883-83.635C484.99 31.512 412.741-.012 326.378-.012 149.494-.012 6.366 143.116 6.366 320c0 176.884 143.128 320.012 320.012 320.012 184.644 0 307.256-129.876 307.256-312.653 0-21-2.244-36.993-5.008-52.997l-302.248-.13-.047.024z" />
    </svg>
  ),
  line: (props: LucideProps) => (
    <svg
      aria-hidden="true"
      fill="none"
      width={152}
      height={9}
      className="text-primary"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M1.5 4.5c5.067-4.667 10.133-4.667 15.2 0s10.133 4.667 15.2 0 10.133-4.667 15.2 0 10.133 4.667 15.2 0 10.133-4.667 15.2 0 10.133 4.667 15.2 0 10.133-4.667 15.2 0 10.133 4.667 15.2 0 10.133-4.667 15.2 0 10.133 4.667 15.2 0"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
      ></path>
    </svg>
  ),
};
