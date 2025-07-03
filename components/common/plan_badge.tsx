// import { getPriceId } from "@/lib/user";
import { pricingPlans } from "@/utils/constants";
import { currentUser } from "@clerk/nextjs/server";
import { Badge } from "../ui/badge";
import { cn } from "@/lib/utils";
import { Crown } from "lucide-react";
import { getPriceIdForActiveUser } from "@/lib/user";

export default async function PlanBadge() {
    const user = await currentUser();

    // If there's no user or user ID, return nothing
    if (!user?.id) return null;

    // Get the user's primary email address
    const email = user.emailAddresses?.[0]?.emailAddress;
    if (!email) return null;

    // Fetch the user's priceId from your DB or logic
    //check this logic if nothing works
    const priceId = await getPriceIdForActiveUser(email)

    // Find the matching plan by priceId
    const plan = pricingPlans.find((plan) => plan.priceId === priceId);

    // Set the plan name or a default if not found
    const planName = plan?.name || "Buy a plan";

    return (
       <Badge
       variant='outline'
       className={cn('ml-2 bg-linear-to-r border-amber-399 lg:flex flex-row items-center',
        !priceId && 'from-red-100 to-red-200 border-red-300'
       )}
       >
        <Crown 
        className={cn(
            'w-3 h-3 mr-1 text-amber-600 ',!priceId && 'text-rose-600'
        )}
        />
        {planName}

       </Badge>
    );
}
// import { pricingPlans } from "@/utils/constants";
// import { currentUser } from "@clerk/nextjs/server";
// import { Badge } from "../ui/badge";
// import { cn } from "@/lib/utils";
// import { Crown } from "lucide-react";
// import { getPriceIdForActiveUser } from "@/lib/user";

// interface PlanBadgeProps {
//   className?: string;
// }

// export default async function PlanBadge({ className }: PlanBadgeProps = {}) {
//   const user = await currentUser();

//   if (!user?.id) return null;

//   const email = user.emailAddresses?.[0]?.emailAddress;
//   if (!email) return null;

//   const priceId = await getPriceIdForActiveUser(email);
//   const plan = pricingPlans.find((plan) => plan.priceId === priceId);
//   const planName = plan?.name || "Buy a plan";
//   const isPro = plan?.id === 'pro';

//   return (
//     <Badge 
//       className={cn(
//         "flex items-center gap-1 px-3 py-1",
//         isPro ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white" : "bg-gray-100 text-gray-700",
//         className
//       )}
//     >
//       {isPro && <Crown className="w-3 h-3" />}
//       {planName}
//     </Badge>
//   );
// }
