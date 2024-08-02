
import SummaryApi from "../common"
import {toast} from 'react-toastify'


const addToCart = async (e, id) => {
    e?.stopPropagation()
    e?.preventDefault()

    const resp = await fetch(SummaryApi.addToCartProduct.url,{
        method: SummaryApi.addToCartProduct.method,
        credentials: 'include',
        headers: {
            'content-type':'application/json'
        },
        body: JSON.stringify({
            productId : id
        })
    })

    const respData = await resp.json()
    if(respData.success) {
        toast.success(respData.message)
    }
    if(respData.error) {
        toast.error(respData.message)
    }
    return respData
    
}


export default addToCart