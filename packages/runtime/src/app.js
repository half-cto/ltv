import { destroyDOM } from './destroy-dom';
import { Dispatcher } from './dispatcher';
import { mountDOM } from './mount-dom';

export function createApp({ state, view, reducers = {} }) {
    let parentEl = null;
    let vdom = null;

    const dispatcher = new Dispatcher();
    // render app after every action
    const subscriptions = [dispatcher.afterEveryComand(renderApp)];

    function emit(eventName, payload) {
        dispatcher.dispatch(eventName, payload);
    }

    for (const actionName in reducers) {
        const reducer = reducers[actionName];

        // update state calling the reducer function
        const subs = dispatcher.subscribe(actionName, (payload) => {
            state = reducer(state, payload);
        });
        subscriptions.push(subs);
    }

    function renderApp() {
        // if there is a previous view, unmount it
        if (vdom) {
            destroyDOM(vdom);
        }

        // mount the new view
        vdom = view(state, emit);
        mountDOM(vdom, parentEl);
    }
    // return function to mount the application in the DOM
    return {
        mount(_parentEl) {
            parentEl = _parentEl;
            renderApp();
        },

        unmount() {
            destroyDOM(vdom);
            vdom = null;
            subscriptions.forEach((unsubscribe) => unsubscribe());
        },
    };
}
