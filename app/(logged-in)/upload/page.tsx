"use client";

import BgGradient from "@/components/common/bg-gradient";
import { MotionDiv } from "@/components/common/motion-wrapper";
import { UploadHeader } from "@/components/upload/upload-header";
import { containerVariants } from "@/utils/constants";
import dynamic from "next/dynamic";

const UploadForm = dynamic(() => import("@/components/upload/upload-form"), {
  ssr: false,
});

export default function Page() {
  return (
    <section className="min-h-screen">
      <BgGradient />
      <MotionDiv
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="mx-auto max-w-7xl px-6 py-24
            sm:py-32 lg:px-8"
      >
        <div className="flex flex-col items-center justify-center gap-6 text-center">
          <UploadHeader />
          <UploadForm />
        </div>
      </MotionDiv>
    </section>
  );
}
