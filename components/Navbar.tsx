"use client"
import useIsOnline from "@/hooks/useIsOnline";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
export default function Navbar() {
    const [online, setOnline] = useState(true)
    const isOnline = useIsOnline()
    const pathName = usePathname()
    useEffect(() => {
        setOnline(isOnline)
    }, [isOnline])


    return (
        <nav className="h-[10dvh] w-full max-w-5xl mx-auto py-4 px-4 md:px-0 flex items-center justify-between gap-x-4 text-lg font-bold shadow-sm ">
            <div className="flex items-center gap-x-2 text-sm font-normal gap-4">
                <Link href="/" className={"flex items-center gap-x-2 hover:text-yellow-500 cursor-pointer " + (pathName == "/" && "text-yellow-500")}>
                    <img src="/favicon.png" alt="logo" className="h-6 w-6" />
                    Home</Link>
                <Link href="/kobikhoj" className={"flex items-center gap-x-2 hover:text-blue-500 cursor-pointer " + (pathName == "/kobikhoj" && "text-yellow-500")}>

                    Kobikhoj</Link>
                <Link href="/envision" className={"flex items-center gap-x-2 hover:text-yellow-500 cursor-pointer " + (pathName == "/envision" && "text-yellow-500")}>

                    Envision</Link>

            </div>

            <div className={"h-2 w-2 rounded-full " + (online ? "bg-green-600" : "bg-red-600")}></div>
        </nav>
    )
}
