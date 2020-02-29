import {formatDate} from './helper'

test("formatDate: 2015-02-12T06:49:05Z", () => {

    const dateString = "2015-02-12T06:49:05Z"

    const formattedDate = formatDate(dateString)
    const correctDateString = "12-02-2015"
    
    expect(formattedDate == correctDateString).toBeTruthy()
})