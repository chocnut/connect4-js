import Store from './lib/Store'
import { todosReducer } from './reducers/todos'

const reducers = {
    todos: todosReducer,
};

const store = new Store(reducers);

store.dispatch({
    type: 'ADD_TODO',
    payload: { label: 'Eat pizza', complete: false },
});

store.subscribe(state => {
    console.log(state.todos)
});
