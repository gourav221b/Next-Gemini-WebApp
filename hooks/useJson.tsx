
export default function UseJSON() {

    const convertJSON = (source: string) => {
        console.log(source)
        try {
            if (JSON.parse(source)) {
                console.log("done parsing", JSON.parse(source))
                return JSON.parse(source)
            }
        } catch (error) {
            console.log("notdone parsing")
            return source
        }
    }

    return { convertJSON }
}

