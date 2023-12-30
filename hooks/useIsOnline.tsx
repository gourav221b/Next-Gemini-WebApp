import { useEffect, useState } from 'react'

export default function UseIsOnline() {
    const [isOnline, setIsOnline] = useState(true)
    useEffect(() => {
        window.addEventListener("online", () => {
            setIsOnline(prev => true)
        })
        window.addEventListener("offline", () => {
            setIsOnline(prev => false)
        })


    }, [])

    return isOnline
}

