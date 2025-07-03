"use client";

import { forwardRef } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

interface UploadFormInputProps {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  isLoading: boolean;
}

export const UploadFormInput = forwardRef<
  HTMLFormElement,
  UploadFormInputProps
>(({ onSubmit, isLoading }, ref) => {
  return (
    <form
      ref={ref}
      onSubmit={onSubmit}
      className="flex flex-col items-center gap-6 w-full"
    >
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Input
          id="file"
          name="file"
          type="file"
          accept="application/pdf"
          className={cn(
            "cursor-pointer",
            isLoading && "cursor-not-allowed opacity-50"
          )}
          disabled={isLoading}
        />
      </div>
      <Button type="submit" disabled={isLoading}>
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Processing...
          </>
        ) : (
          "Upload your PDF"
        )}
      </Button>
    </form>
  );
});

UploadFormInput.displayName = "UploadFormInput";

export default UploadFormInput;
