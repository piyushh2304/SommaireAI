// import { pricingPlans } from "@/utils/constants";
// import { getDbConnection } from "./db";
// import { getUserUploadCount } from "./summaries";
// import { User } from "@clerk/nextjs/server";


// export async function getPriceIdForActiveUser(email: string) {
//     const sql = await getDbConnection();

//     const query = await sql`SELECT price_id FROM users where email = ${email} AND status = 'active'`

//     return query?.[0]?.price_id || null;
// }

// export async function hasActivePlan(email: string) {
//     const sql = await getDbConnection();

//     const query = await sql`SELECT price_id,status FROM users where email = ${email} AND status = 'active' AND price_id IS NOT NULL`

//     return query && query.length > 0;
// }



// export async function hasRechedUploadLimit(userId: string) {
//     const uploadCount = await getUserUploadCount(userId);

//     const priceId = await getPriceIdForActiveUser(userId);

//     const isPro = pricingPlans.find((plan) => plan.priceId === priceId)?.id === 'pro';

//     const uploadLimit = isPro ? 1000 : 5;

//     return { hasReachedLimit: uploadCount >= uploadLimit, uploadLimit }
// }

// export async function getSubscriptionStatus(user: User) {
//     const hasSubscription = await hasActivePlan(
//         user.emailAddresses[0].emailAddress
//     )

//     return hasSubscription;
// }
import { pricingPlans } from "@/utils/constants";
import { getDbConnection } from "./db";
import { getUserUploadCount } from "./summaries";
import { User } from "@clerk/nextjs/server";

interface UploadLimitResult {
    hasReachedLimit: boolean;
    uploadLimit: number;
}

export async function getPriceIdForActiveUser(email: string): Promise<string | null> {
    try {
        const sql = await getDbConnection();
        const query = await sql`
      SELECT price_id FROM users WHERE email = ${email} AND status = 'active'
    `;
        return query?.[0]?.price_id || null;
    } catch (error) {
        console.error("Error getting price ID for user:", error);
        return null;
    }
}

export async function hasActivePlan(email: string): Promise<boolean> {
    try {
        const sql = await getDbConnection();
        const query = await sql`
      SELECT price_id, status FROM users 
      WHERE email = ${email} AND status = 'active' AND price_id IS NOT NULL
    `;
        return query && query.length > 0;
    } catch (error) {
        console.error("Error checking active plan:", error);
        return false;
    }
}

// Fixed function name from hasRechedUploadLimit to hasReachedUploadLimit
// Fixed parameter from userId to email to match schema
export async function hasReachedUploadLimit(email: string): Promise<UploadLimitResult> {
    try {
        const sql = await getDbConnection();
        const userQuery = await sql`SELECT id FROM users WHERE email = ${email}`;

        if (userQuery.length === 0) {
            return { hasReachedLimit: true, uploadLimit: 5 };
        }

        const userId = userQuery[0].id;
        const uploadCount = await getUserUploadCount(userId);
        const priceId = await getPriceIdForActiveUser(email);

        const isPro = pricingPlans.find((plan) => plan.priceId === priceId)?.id === 'pro';
        const uploadLimit = isPro ? 1000 : 5;

        return { hasReachedLimit: uploadCount >= uploadLimit, uploadLimit };
    } catch (error) {
        console.error("Error checking upload limit:", error);
        return { hasReachedLimit: true, uploadLimit: 5 };
    }
}

export async function getSubscriptionStatus(user: User): Promise<boolean> {
    try {
        const email = user.emailAddresses[0]?.emailAddress;
        if (!email) return false;

        const hasSubscription = await hasActivePlan(email);
        return hasSubscription;
    } catch (error) {
        console.error("Error getting subscription status:", error);
        return false;
    }
}
