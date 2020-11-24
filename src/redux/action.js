export const addItem = (id, text) => ({
    type: "ADD_ITEM",
    id,
    text
})

export const toggleItem = id => ({
    type: 'TOGGLE_ITEM',
    id
})

export const clearAll = () => ({
    type: 'CLEAR_ALL',
})

export const editItem = (id, newText) => ({
    type: 'EDIT_ITEM',
    id,
    newText,
})

export const removeItem = (id) => ({
    type: 'REMOVE_ITEM',
    id,
})