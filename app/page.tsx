import Link from "next/link";

export default function Home() {

  const links = [
    {
      id: 0,
      name: "Kobikhoj",
      type: "Literature",
      description: "Try out KobiKhoj, a poetry application that gives you poems based on your context!",
      link: "/kobikhoj",
      image: "/kobikhoj.svg",
      color: "text-blue-500"
    },
    {
      id: 1,
      name: "Envision",
      type: "Utility",
      description: "Generate alternate realities that rewrites the script of existence at every turn.",
      link: "/envision",
      image: "/envision.svg",
      color: "text-yellow-500"
    }
  ]
  return (
    <main className="flex min-h-[80dvh] flex-col items-center justify-start lg:px-24 flex-1">
      <img src="/logo.svg" alt="Arcades by Gg" className="w-40 h-auto " />
      <div className="flex flex-wrap items-start justify-center content-start">
        {links.map(link => <Link href={link.link} className="p-4 w-full md:w-[32%] group" key={link.id as React.Key}>
          <div className="h-full border-2 group-hover:bg-black cursor-pointer duration-200 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">

            <div className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="tracking-widest text-xs title-font font-medium text-gray-50 mb-1">{link.type}</h2>
                  <h2 className={"title-font text-lg font-bold mb-3 " + (link.color ?? "text-yellow-500")}>{link.name}</h2>
                </div>
                <img src={link.image} alt={link.name + " logo"} className="h-8 w-8" />
              </div>
              <p className="leading-relaxed mb-3">{link.description}</p>
              <div className="flex items-center flex-wrap group-hover:gap-x-4 duration-200">
                <span className="text-blue-100 inline-flex items-center md:mb-2 lg:mb-0" >Try it out
                  <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14"></path>
                    <path d="M12 5l7 7-7 7"></path>
                  </svg>
                </span>

              </div>
            </div>
          </div>
        </Link>)}
      </div>

    </main>
  )
}
