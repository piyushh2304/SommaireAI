// import BgGradient from "@/components/common/bg-gradient"
// import EmptySummaryState from "@/components/summaries/empty-summary-state"
// import SummaryCard from "@/components/summaries/summary-card"
// import { Button } from "@/components/ui/button"
// import { getSummaries } from "@/lib/summaries"
// import { hasReachedUploadLimit } from "@/lib/user"
// import { currentUser } from "@clerk/nextjs/server"
// import { ArrowRight, Plus } from "lucide-react"
// import Link from "next/link"
// import { redirect } from "next/navigation"

// export default async function DashboardPage() {
//   const user = await currentUser()

//   if (!user) {
//     redirect("/sign-in")
//   }

//   const userId = user.id

//   try {
//     const [limitResult, summaries] = await Promise.all([hasReachedUploadLimit(userId), getSummaries(userId)])

//     const { hasReachedLimit, uploadLimit } = limitResult

//     return (
//       <main className="min-h-screen">
//         <BgGradient
//           className="from-emerald-200 
//         via-teal-200 to-cyan-200"
//         />
//         <div className="container mx-auto flex flex-col gap-4">
//           <div className="px-2 py-12 sm:py-24">
//             <div className="flex gap-4 mb-8 justify-between">
//               <div className="flex flex-col gap-2">
//                 <h1
//                   className="text-4xl font-bold
//                 tracking-tight bg-gradient-to-r 
//                 from-gray-600 to-gray-950 bg-clip-text
//                 text-transparent"
//                 >
//                   Your Summaries
//                 </h1>
//                 <p className="text-gray-600">Transform your PDFs into concise, actionable insights</p>
//               </div>
//               {!hasReachedLimit && (
//                 <Button
//                   asChild
//                   className="bg-gradient-to-r from-rose-500
//                     to-rose-700 hover:from-rose-600 hover:to-rose-800
//                     hover:scale-105 transition-all duration-300 group 
//                     text-white"
//                 >
//                   <Link href="/upload" className="flex items-center">
//                     <Plus className="w-5 h-5 mr-2" />
//                     New Summary
//                   </Link>
//                 </Button>
//               )}
//             </div>

//             {hasReachedLimit && (
//               <div className="mb-6">
//                 <div
//                   className="bg-rose-50 border border-rose-200
//                 rounded-lg p-4 text-rose-800"
//                 >
//                   <p className="text-sm">
//                     {"You've reached the limit of"} {uploadLimit} uploads on the Basic plan.{" "}
//                     <Link
//                       href="/#pricing"
//                       className="text-rose-800 underline font-medium
//                             underline-offset-4 inline-flex items-center"
//                     >
//                       Click here to upgrade to Pro <ArrowRight className="w-4 h-4 inline-block" />
//                     </Link>{" "}
//                     for unlimited uploads.
//                   </p>
//                 </div>
//               </div>
//             )}

//             {summaries.length === 0 ? (
//               <EmptySummaryState />
//             ) : (
//               <div
//                 className="grid grid-cols-1 gap-4 sm:gap-6
//               md:grid-cols-2 lg:grid-cols-3 sm:px-0"
//               >
//                 {summaries.map((summary, idx) => (
//                   <SummaryCard key={summary.id || idx} summary={summary} />
//                 ))}
//               </div>
//             )}
//           </div>
//         </div>
//       </main>
//     )
//   } catch (error) {
//     console.error("Dashboard error:", error)
//     redirect("/sign-in")
//   }
// }

import BgGradient from "@/components/common/bg-gradient"
import EmptySummaryState from "@/components/summaries/empty-summary-state"
import SummaryCard from "@/components/summaries/summary-card"
import { Button } from "@/components/ui/button"
import { getSummaries } from "@/lib/summaries"
import { hasReachedUploadLimit } from "@/lib/user"
import { currentUser } from "@clerk/nextjs/server"
import { ArrowRight, Plus } from "lucide-react"
import Link from "next/link"
import { redirect } from "next/navigation"

export default async function DashboardPage() {
  const user = await currentUser()

  if (!user) {
    redirect("/sign-in")
  }

  const userId = user.id

  try {
    const [limitResult, summaries] = await Promise.all([hasReachedUploadLimit(userId), getSummaries(userId)])

    const { hasReachedLimit, uploadLimit } = limitResult

    return (
      <main className="min-h-screen">
        <BgGradient
          className="from-emerald-200 
        via-teal-200 to-cyan-200"
        />
        <div className="container mx-auto flex flex-col gap-4">
          <div className="px-2 py-12 sm:py-24">
            <div className="flex gap-4 mb-8 justify-between">
              <div className="flex flex-col gap-2">
                <h1
                  className="text-4xl font-bold
                tracking-tight bg-gradient-to-r 
                from-gray-600 to-gray-950 bg-clip-text
                text-transparent"
                >
                  Your Summaries
                </h1>
                <p className="text-gray-600">Transform your PDFs into concise, actionable insights</p>
              </div>
              {!hasReachedLimit && (
                <Button
                  asChild
                  className="bg-gradient-to-r from-rose-500
                    to-rose-700 hover:from-rose-600 hover:to-rose-800
                    hover:scale-105 transition-all duration-300 group 
                    text-white"
                >
                  <Link href="/upload" className="flex items-center">
                    <Plus className="w-5 h-5 mr-2" />
                    New Summary
                  </Link>
                </Button>
              )}
            </div>

            {hasReachedLimit && (
              <div className="mb-6">
                <div
                  className="bg-rose-50 border border-rose-200
                rounded-lg p-4 text-rose-800"
                >
                  <p className="text-sm">
                    {"You've reached the limit of"} {uploadLimit} uploads on the Basic plan.{" "}
                    <Link
                      href="/#pricing"
                      className="text-rose-800 underline font-medium
                            underline-offset-4 inline-flex items-center"
                    >
                      Click here to upgrade to Pro <ArrowRight className="w-4 h-4 inline-block" />
                    </Link>{" "}
                    for unlimited uploads.
                  </p>
                </div>
              </div>
            )}

            {summaries.length === 0 ? (
              <EmptySummaryState />
            ) : (
              <div
                className="grid grid-cols-1 gap-4 sm:gap-6
              md:grid-cols-2 lg:grid-cols-3 sm:px-0"
              >
                {summaries.map((summary, idx) => (
                  <SummaryCard key={summary.id || idx} summary={summary} />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    )
  } catch (error) {
    console.error("Dashboard error:", error)

    // Better error handling - don't redirect on every error
    if (error instanceof Error && error.message.includes("UNAUTHORIZED")) {
      redirect("/sign-in")
    }

    // Show error state instead of redirecting
    return (
      <main className="min-h-screen">
        <BgGradient className="from-emerald-200 via-teal-200 to-cyan-200" />
        <div className="container mx-auto flex flex-col gap-4">
          <div className="px-2 py-12 sm:py-24">
            <div className="text-center">
              <h1 className="text-2xl font-bold text-gray-900 mb-4">Something went wrong</h1>
              <p className="text-gray-600 mb-6">We encountered an error loading your summaries. Please try again.</p>
              <Button asChild>
                <Link href="/dashboard">Retry</Link>
              </Button>
            </div>
          </div>
        </div>
      </main>
    )
  }
}
