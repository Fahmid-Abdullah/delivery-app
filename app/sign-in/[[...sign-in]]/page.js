import { SignIn } from "@clerk/nextjs";

export default function Page() {
    return <div className="bg-black min-h-screen flex items-center justify-center"><SignIn path="/sign-in" /></div>;

}