"use client";

import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Props {
  href: string | null;
  children: string | null | undefined;
}

const LinkButton = ({ children, href }: Props) => {
  return href !== null && href !== undefined ? (
    <Link
      href={href!}
      className={cn(buttonVariants({ variant: "default" }))}
      target="_blank"
    >
      {children}
    </Link>
  ) : (
    <Button disabled>{children}</Button>
  );
};

export { LinkButton };
