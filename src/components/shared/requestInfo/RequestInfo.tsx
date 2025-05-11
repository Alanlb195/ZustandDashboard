import { useEffect, useState } from 'react'
import { tesloApi } from '../../../api/testlo.api'

export const RequestInfo = () => {

    const [info, setInfo] = useState<unknown>()

    useEffect(() => {

        tesloApi.get('/auth/private')
            .then(resp => setInfo(resp.data))
            .catch(() => setInfo('Error'))


    }, [])
    

    return (
        <>
            <h2>Information</h2>
            <pre>
                {
                    JSON.stringify(info, null,2)
                }
            </pre>
        </>
    )
}
