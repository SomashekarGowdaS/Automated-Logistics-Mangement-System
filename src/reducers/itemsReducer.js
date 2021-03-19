const itemsInitialState = [
    { id: '210asssd', itemName: 'Pencil', price: 5 },
    { id: '452asjck6', itemName: 'Scale', price: 7 }
];

export const itemsReducer = (state = itemsInitialState, action) => {
    switch (action.type) {
        case 'ADD_ITEM': {
            return [...state, action.payload];
        }

        default: {
            return [...state];
        }
    }
}

