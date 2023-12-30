import { formatRelative, subDays } from 'date-fns'
import React from 'react'

export default function RequestBlock({ message, date }: { message: string, date?: Date }) {
    return (
        <div className='flex flex-col gap-2'>
            <p className="font-sans w-full overflow-x-scroll no-scroll ">{message}</p>
            <span className='text-xs text-gray-300'>{date && formatRelative(date, new Date())}</span>
        </div>
    )
}

