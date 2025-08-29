
export function generateProducts(count: number): testProducts {
    const testProduct: testProducts = { data: [] };

    for (let i = 0; i < count; i++) {
        testProduct.data.push(
            {
                brand: {},
                category: {},
                description: `Test description ${i}`,
                id: i,
                name: `Test name ${i}`,
                price: 20.20 + i,
                product_image: {}
            }
        )
    }
    return testProduct;
}

interface testProducts {
    data: {
        brand: object,
        category: object,
        description: string,
        id: number,
        name: string,
        price: number,
        product_image: object
    }[]
}

