import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { GetStatistical } from '../../../../../store/admin/PageAdmin/getStatistical';
import { format } from 'date-fns';

const Statistical = () => {

    const dispatch = useDispatch();
    const data = useSelector(state => state.getStatistical.data)

    const date = new Date();
    const twoMonthsBeforeToday = new Date(date);
    twoMonthsBeforeToday.setMonth(date.getMonth() - 2);

    const [startDate, setStartDate] = useState(format(new Date(twoMonthsBeforeToday), 'yyyy-MM-dd'));
    const [endDate, setEndDate] = useState(format(new Date(), 'yyyy-MM-dd'));

    console.log('data', startDate, endDate);
    console.log('data1', data);
    
    

    useEffect(() => {
        const dateApi = {
            startDate: startDate,
            endDate: endDate
        }
        dispatch(GetStatistical())
    }, [dispatch, endDate, startDate])




    return (
        <div>

        </div>
    )
}

export default Statistical
