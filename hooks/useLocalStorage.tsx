interface local {
    query: string, data: string
}
export default function UseLocalStorage() {
    const setLocalData = ({ query, data }: local) => {
        localStorage.setItem(query, data)
    }
    const getLocalData = (query: string): string => {
        if (localStorage.getItem(query))
            return localStorage.getItem(query) || "[]"
        return "[]"
    }
    return { setLocalData, getLocalData }
}
