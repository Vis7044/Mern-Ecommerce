const { default: SummaryApi } = require("../common")

const fetchCategoryWiseProduct = async (category) => {
    const resp = await fetch(SummaryApi.categoryWiseProduct.url,{
        method: SummaryApi.categoryWiseProduct.method,
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({
            category: category
        })
    });

    const data = await resp.json();
    return data;
}

export default fetchCategoryWiseProduct;