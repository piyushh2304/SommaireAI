
import BgGradient from "@/components/common/bg-gradient";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import SummaryCard from "@/components/summaries/summary-card";
import { getSummaries } from "@/lib/summaries";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import EmptySummaryState from "@/components/summaries/empty-summary-state";
import { Motion1 } from "@/components/common/motion-wrapper";
import { itemVariants } from "@/utils/constants";
import { MotionP, MotionDiv } from "@/components/common/motion-wrapper";

export default async function DashboardPage() {
    const user = await currentUser();
    const userId = user?.id;
    if(!userId) { 
        return redirect('/sign-in');
    }

    // const uploadLimit = 50;
    const summary = await getSummaries(userId);
    return (
    <main className="min-h-screen">
        <BgGradient className="from-emerald-200 via-teal-200 to-cyan-200" />
            <div className="container mx-auto flex flex-col gap-4">
                <div className="px-2 py-12 sm:py-24">
                    <div className="flex gap-4 mb-8 justify-between">
                    <div className="flex flex-col gap-2">
                        <Motion1
                        variants={itemVariants}
                        initial='hidden'
                        whileInView='visible'
                        className="text-4xl font-bold tracking-tight bg-linear-to-r
                        from-gray-800 to-gray-900 bg-clip-text text-transparent">Your Summaries
                        </Motion1>

                        <MotionP 
                        variants={itemVariants}
                        initial='hidden'
                        animate='visible' 
                        className="text-gray-600">Transform your PDFs into concise, actionable insights
                        </MotionP>
                    </div>
                    <MotionDiv
                      variants={itemVariants}
                      initial='hidden'
                      animate='visible'
                      whileHover={{ scale: 1.05 }}
                      className="self-start"
                      >
                    <Button variant={'link'} 
                    className="bg-linear-to-r from-rose-500 to-rose-700 hover:from-rose-600
                    hover:to-rose-800 hover:scale-105 transition-all duration-300 group hover:no-underline">
                        <Link href='/upload' className="flex text-white items-center">
                            <Plus className="w-5 h-5 mr-2" />
                            New Summary
                        </Link>
                    </Button>
                    </MotionDiv>
                    </div>
                  

                    {summary.length === 0 ? (<EmptySummaryState />) : (
                        <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3 sm:px-0">
                        {summary.map((summary, index) => (
                            <SummaryCard key={index} summary={summary} />
                        ))}
                    </div>
                    )}
                </div>
            </div>
    </main>
    );
}