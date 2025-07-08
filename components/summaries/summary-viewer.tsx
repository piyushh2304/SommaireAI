"use client";
import { useState, useMemo } from "react";
import { Card } from "@/components/ui/card";
import { NavigationControls } from "./navigation-controls";
import ProgressBar from "./progress-bar";
import { parseSection } from "@/utils/summary-helpers";
import ContentSection from "./content-section";

const SectionTitle = ({ title }: { title: string }) => {
  return (
    <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
      {title}
    </h2>
  );
};

export function SummaryViewer({
  summary = "",
  onSlideChange,
}: {
  summary?: string;
  onSlideChange?: {
    onNext: () => void;
    onPrevious: () => void;
    currentSlide: number;
    totalSlides: number;
  };
}) {
  const [currentSection, setCurrentSection] = useState(0);

  const sections = useMemo(() => {
    if (!summary || typeof summary !== "string") {
      return [];
    }

    try {
      return summary
        .split("\n# ")
        .map((section) => section.trim())
        .filter(Boolean)
        .map(parseSection);
    } catch (error) {
      console.error("Error parsing summary:", error);
      return [];
    }
  }, [summary]);

  const handleNext = () => {
    if (currentSection < sections.length - 1) {
      setCurrentSection((prev) => prev + 1);
    } else if (
      onSlideChange &&
      onSlideChange.currentSlide < onSlideChange.totalSlides - 1
    ) {
      onSlideChange.onNext();
      setCurrentSection(0);
    }
  };

  const handlePrevious = () => {
    if (currentSection > 0) {
      setCurrentSection((prev) => prev - 1);
    } else if (onSlideChange && onSlideChange.currentSlide > 0) {
      onSlideChange.onPrevious();
      setCurrentSection(0);
    }
  };

  if (sections.length === 0) {
    return (
      <Card className="relative px-2 h-[500px] sm:h-[600px] lg:h-[700px] w-full xl:w-[600px] flex items-center justify-center">
        <p className="text-muted-foreground">No summary content available</p>
      </Card>
    );
  }

  return (
    <Card
      className="relative px-2 h-[500px] sm:h-[600px] lg:h-[700px]
    w-full xl:w-[600px] overflow-hidden bg-gradient-to-br from-background
    via-background/95 to-rose-500/5 backdrop-blur-lg
    shadow-2xl rounded-3xl border border-rose-500/10"
    >
      <ProgressBar sections={sections} currentSection={currentSection} />
      <div
        className="h-full overflow-y-auto scrollbar-hide
      pt-12 sm:pt-16 pb-20 sm:pb-24"
      >
        <div className="px-4 sm:px-6">
          <SectionTitle title={sections[currentSection]?.title || ""} />
          <ContentSection
            title={sections[currentSection]?.title || ""}
            points={sections[currentSection]?.points || []}
          />
        </div>
      </div>
      <NavigationControls
        currentSection={currentSection}
        totalSections={sections.length}
        onPrevious={handlePrevious}
        onNext={handleNext}
        onSectionSelect={setCurrentSection}
      />
    </Card>
  );
}
