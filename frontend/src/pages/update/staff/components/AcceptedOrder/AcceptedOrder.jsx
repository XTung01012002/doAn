import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { GetAllInfoShipOrder } from '../../../../../store/shipinfo/GetAllOrderShipInfo';

const AcceptedOrder = () => {

    const dispatch = useDispatch();
    const dataSource = useSelector(state => state.getAllShipInfo.data)
    useEffect(() => {
        dispatch(GetAllInfoShipOrder())
    }, [dispatch])

    console.log('dataSource', dataSource);

    const column = [
        {
            key: '_id',
            dataIndex: '_id',
            title: 'ID'
        }
    ]

    return (
        <div>

        </div>
    )
}

export default AcceptedOrder
