import React from 'react'
import {parseISO, formatDistanceToNow} from 'date-fns'

export default function TimeAgo({timestamp}) {
    let timeAgo = ''
    if (timestamp){
        const date = parseISO(timestamp)
        const timePeriod = formatDistanceToNow(date)
        timeAgo = `${timePeriod} ago`
    }
  return (
        <span style={{display: 'block', color: 'blueviolet'}} title={timestamp}>
            <i>{timeAgo}</i>
        </span>
  )
}
