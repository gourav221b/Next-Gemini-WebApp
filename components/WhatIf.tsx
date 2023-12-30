"use client";
import { useEffect, useLayoutEffect, useRef, useState } from "react";


import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import useIsOnline from "@/hooks/useIsOnline";
import useLocalStorage from "@/hooks/useLocalStorage";
import useJSON from "@/hooks/useJson";
import RequestBlock from "./blocks/RequestBlock";
import ResponseBlock from "./blocks/ResponseBlock";
interface data {
    message: string;
    type: string;
    date?: Date
}
const Write = () => {
    return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-pencil"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" /><path d="m15 5 4 4" /></svg>
}
const Loader = ({ className }: { className: string }) => {
    return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-loader-2"><path d="M21 12a9 9 0 1 1-6.219-8.56" className={className} /></svg>
}
export default function WhatIf() {
    const [data, setData] = useState<data[]>(() => {

        return []
    })
    const [loading, setLoading] = useState(false)
    const [context, setContext] = useState("")
    const isOnline = useIsOnline()
    const { convertJSON } = useJSON()
    const containerRef = useRef<HTMLDivElement>(null);
    const { setLocalData, getLocalData } = useLocalStorage()
    const defaultOptions = {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
    }

    useLayoutEffect(() => {
        if (containerRef && containerRef.current)
            containerRef.current?.scrollTo(0, containerRef.current.scrollHeight);
    }, [data]);
    useLayoutEffect(() => {
        setLoading(true)
        if (getLocalData('whatif-data'))
            setData(prev => JSON.parse(getLocalData('whatif-data')))
        setLoading(false)

    }, [])





    async function run(context = "google makersuite") {

        const res = await fetch('/api/whatif', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                input: context
            })
        })
        if (!res.ok) {
            toast.error("Couldn't fetch data")
            setLoading(false)
            setContext("")
            throw new Error("Oops! Something went wrong")
        }
        let poem = await res.text()
        return poem
    }


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(_ => true)
        setData(prev => [...prev, { message: context, type: "req" }])
        let res = await run(context)

        setData(prev => [...prev, { message: JSON.parse(res) ?? res, type: "res" }])
        let temp = structuredClone(data);
        temp.push({ message: context, type: "req", date: new Date() })
        temp.push({ message: JSON.parse(res) ?? res, type: "res", date: new Date() })
        localStorage.setItem("whatif-data", JSON.stringify(temp))
        setContext(_ => "")
        setLoading(_ => false)
    }

    // useEffect(() => {
    //     if (data)
    //         document?.getElementById(data.length.toString())?.scrollIntoView()
    // }, [data])

    useEffect(() => {
        if (!isOnline)
            toast.error("No connection available!")
    }, [isOnline])

    return (
        <section className="flex flex-col h-[85dvh] w-full max-w-5xl mx-auto ">
            <ToastContainer position="top-center"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark" />


            {/* content-section */}

            <div className="container h-[75dvh] overflow-y-scroll w-full flex flex-col gap-y-8 px-2 md:px-4 my-4" ref={containerRef}>
                {/* default message */}
                <div className="flex border-l-4 border-green-500 px-2">Generate alternate realities for anything in real life. Enjoy!</div>

                {/* all content */}
                {data?.map((block, idx) => <div className={"flex px-2 text-md lg:text-md " + (block.type == "res" ? "border-l-4 border-green-500 text-left" : "items-end justify-end border-r-4 border-yellow-500 text-right")} key={idx} id={idx.toString()}>
                    {block?.type == "req" ?
                        <RequestBlock message={block.message} date={block.date} /> :
                        <ResponseBlock message={block.message} date={block.date} />}
                </div>)}
            </div>

            {/* forms-section */}
            <form onSubmit={handleSubmit} className="w-full h-[10dvh] flex bg-[#292929]">
                <input className="bg-transparent resize-none w-11/12 p-4 placeholder:text-sm " placeholder="Bruce Wayne's parent's death made him Batman " onChange={e => setContext(e.target.value)} value={context} />
                <button className="inline-flex flex-1 items-center justify-center text-blue-400 border-0 py-2 px-6 focus:outline-none disabled:text-red-500 hover:bg-blue-600  duration-200 rounded disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:bg-transparent hover:text-white disabled:hover:animate-pulse" disabled={!isOnline || context == ""} >
                    {loading ? <Loader className="animate-spin origin-center" /> : <Write />}
                </button>
            </form>
        </section>
    )
}

