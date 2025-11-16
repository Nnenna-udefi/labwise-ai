"use client";
import * as Dialog from "@radix-ui/react-dialog";
import React from "react";
import { cn } from "../lib/utils";
import { X } from "lucide-react";

// wrapper
export const Sheet = Dialog.Root;

// trigger
export const SheetTrigger = Dialog.Trigger;

// Overlay
export const SheetOverlay = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof Dialog.Overlay>
>(({ className, ...props }, ref) => (
  <Dialog.Overlay
    ref={ref}
    className={cn(
      "fixed inset-0 bg-black/80 z-40 data-[state=open]:animate-fade-in data-[state=closed]:animate-fade-out",
      className
    )}
    {...props}
  />
));
SheetOverlay.displayName = "SheetOverlay";

// Content
export const SheetContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof Dialog.Content> & {
    side?: "left" | "right" | "top" | "bottom";
  }
>(({ side = "right", className, children, ...props }, ref) => {
  const sideClasses = {
    top: "inset-x-0 top-0 border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top",
    bottom:
      "inset-x-0 bottom-0 border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
    left: "inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm",
    right:
      "inset-y-0 right-0 h-full w-3/4  border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm",
  };

  return (
    <Dialog.Portal>
      <SheetOverlay />
      <Dialog.Content
        ref={ref}
        className={cn(
          "fixed z-50 bg-foreColor shadow-xl p-6",
          sideClasses[side],
          className
        )}
        {...props}
      >
        <Dialog.Title className="hidden">Sheet Panel</Dialog.Title>

        {children}
        <Dialog.Close className="absolute right-4 top-4 opacity-80 hover:opacity-100 rounded-sm ">
          <X className="h-5 w-5" />
          <span className="sr-only">Close</span>
        </Dialog.Close>
      </Dialog.Content>
    </Dialog.Portal>
  );
});
SheetContent.displayName = "SheetContent";
