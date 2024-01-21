export class Dispatcher {
    #subs = new Map();
    #afterHandlers = [];

    subscribe(comandName, handler) {
        // create array of subscriptions if it doesn't exist for a given command name
        if (!this.#subs.has(comandName)) {
            this.#subs.set(comandName, []);
        }

        // check if handler is already registered
        const handlers = this.#subs.get(comandName);
        if (handlers.includes(handler)) {
            return () => {};
        }

        // register the handler
        handlers.push(handler);

        // return a function to un-register the handler
        return () => {
            const idx = handlers.indexOf(handler);
            handlers.splice(idx, 1);
        };
    }

    afterEveryComand(handler) {
        // register handler
        this.#afterHandlers.push(handler);

        // return a function to un-register the handler
        return () => {
            const idx = this.#afterHandlers.indexOf[handler];
            this.#afterHandlers.splice(idx, 1);
        };
    }

    dispatch(comandName, payload) {
        // Check if there are handlers registered and call them
        if (this.#subs.has(comandName)) {
            this.#subs.get(comandName).forEach((handler) => handler(payload));
        } else {
            console.warn(`No handlers for comand: ${comandName}`);
        }
        // run the after-command handlers 
        this.#afterHandlers.forEach((handler) => handler());
    }
}
