import { formatRelative, subDays } from 'date-fns'
import React from 'react'

export default function ResponseBlock({ message, date }: { message: string, date?: Date }) {
    return (
        <div className='flex flex-col gap-2'>
            <pre className="font-sans w-full whitespace-pre-line no-scroll ">{message}</pre>
            <span className='text-xs text-gray-300'>{date && formatRelative(date, new Date())}</span>

        </div>
    )
}
