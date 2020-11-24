export const todoReducer = (state = [], action) => {
    switch (action.type) {
        case 'ADD_ITEM':
            return [
                ...state,
                {
                    id: action.id,
                    text: action.text,
                    completed: false
                }
            ]
        case 'TOGGLE_ITEM':
            return state.map(item =>
                item.id === action.id ? {...item, completed: !item.completed } : item
            )

        case 'REMOVE_ITEM':
            return state.filter(item => item.id !== action.id);

        case 'CLEAR_ALL':
            return [];

        case 'EDIT_ITEM':
            return state.map(item =>
                item.id === action.id ? {...item, text: action.newText } : item
            )

        default:
            return state
    }
}