// import UpgradeRequired from "@/components/common/upgrade-required";
import { currentUser, User } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await currentUser();

  if (!user) {
    redirect("/sign-in");
  }

  return <>{children}</>;
}
