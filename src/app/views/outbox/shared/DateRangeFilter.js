import React, { useState } from 'react';
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRangePicker } from "react-date-range";
import { addDays, subDays } from "date-fns";
import { useSelector } from 'react-redux';

const DateRangeFilter = ({ onDateChange, date }) => {

    const [state, setState] = useState(date);
    const { theme } = useSelector(state => state)

    const handleOnChange = (ranges) => {
        const { selection } = ranges;
        console.log("date ranges", ranges);
        onDateChange(selection);
        setState([selection]);
    };

    // useEffect(() => {
    //     debugger
    //     onDateChange(state);
    // }, [])


    return (
        <DateRangePicker
            onChange={handleOnChange}
            showSelectionPreview={true}
            moveRangeOnFirstSelection={false}
            months={2}
            ranges={state}
            direction="horizontal"
            className={theme ? 'myComtomClass' : ''}
        />
    )
}

export default DateRangeFilter;
