import BgGradient from "@/components/common/bg-gradient";
import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <>
      {/* <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Welcome back</h2>
          <p className="mt-2 text-gray-600">Sign in to access your PDF summaries</p>
        </div> */}
      <section className="flex items-center justify-center lg:min-h-[40vh]">
        <BgGradient className="from-rose-400 via-rose-300 to-orange-200" />
        <SignIn
          appearance={{
            elements: {
              formButtonPrimary: "bg-rose-500 hover:bg-rose-600 text-white",
              card: "shadow-lg border-0",
              headerTitle: "text-rose-600",
              headerSubtitle: "text-gray-600",
              socialButtonsBlockButton: "border-gray-300 hover:bg-gray-50",
              formFieldInput:
                "border-gray-300 focus:border-rose-500 focus:ring-rose-500",
              footerActionLink: "text-rose-600 hover:text-rose-500",
            },
          }}
        />
      </section>
    </>
  );
}
