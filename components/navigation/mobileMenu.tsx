'use client';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { SideBarNavItems } from '@/components/navigation/sideBarNavItems';
import { Icons } from '@/components/icons';
import { useState } from 'react';

export function MobileMenu() {
  const [open, setOpen] = useState(false);

  return (
    <div className="lg:hidden">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon">
            <Icons.menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent
          side={'left'}
          className="bg-background-secondary h-screen flex flex-col gap-0 border-none pt-20 rounded-r-lg px-2"
        >
          <SideBarNavItems onOpenChange={setOpen} />
        </SheetContent>
      </Sheet>
    </div>
  );
}
