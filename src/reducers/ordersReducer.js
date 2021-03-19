const ordersInitialState = [
    {
        customerId: '6545guugvc121', deliveryLocation: 'Mandya', items: [
            { id: '54uhjj', itemName: 'Pencil', price: 5 },
            { id: '5a4s8', itemName: 'Pen', price: 10 }
        ], orderId: 'jhh56as4as4aa', totalPrice: 15, vehicleId: 'ka02jh8762'
    }
];

const ordersReducer = (state = ordersInitialState, action) => {
    switch (action.type) {
        case 'ADD_ORDER': {
            return [...state, action.payload];
        }
        default: {
            return [...state];
        }
    }
}

export default ordersReducer