import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="relative flex flex-col items-center justify-between min-h-screen bg-gray-100">
      <Image
        src="https://images.unsplash.com/photo-1715645943531-a57960d41818?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        layout="fill"
        objectFit="fit"
        alt="Background image"
        className="absolute inset-0 z-0"
      />
      <div className="relative z-10 w-full flex justify-center mt-20">
        <h1 className="text-8xl font-bold text-black">Delivery+</h1>
      </div>
      <div className="relative z-10 w-full flex justify-center mb-40">
        <Link href={'/sign-up'}>
        <button className="px-5 py-4 text-xl text-white bg-blue-600 rounded-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
          Get Started
        </button>
        </Link>
      </div>
    </div>
  );
}
