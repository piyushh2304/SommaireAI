// import BgGradient from "@/components/common/bg-gradient"
// import { SignIn } from "@clerk/nextjs"

// export default function SignInPage() {
//   return (
//     <div className="min-h-screen flex items-center justify-center">
//       <BgGradient />
//       <SignIn
//         forceRedirectUrl="/dashboard"
//         signUpUrl="/sign-up"
//         appearance={{
//           elements: {
//             formButtonPrimary: "bg-rose-600 hover:bg-rose-700",
//             card: "shadow-lg",
//           },
//         }}
//       />
//     </div>
//   )
// }
import BgGradient from "@/components/common/bg-gradient"
import { SignIn } from "@clerk/nextjs"

export default function Page(){
  return(
    <section className="flex justifyy-center items-center lg:min-h-[40vh]">
      <div className="py-12 lg:py-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 lg:pt-12">
        <BgGradient className="from-rose-400 via-rose-300 to-orange-200" />
        <SignIn
        
        />
      </div>
    </section>
  )
}