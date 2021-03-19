const customersInitialState = [
    { id: '5466aaaaa', customerName: 'Harish', city: 'Mysore' },
    { id: '5899aass', customerName: 'Naga', city: 'Mandya' }
];

export const customersReducer = ((state = customersInitialState, action) => {
    switch (action.type) {
        case 'ADD_CUSTOMER': {
            return [...state, action.payload];
        }


        default: {
            return [...state];
        }
    }
})
