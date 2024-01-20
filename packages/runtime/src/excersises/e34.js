import { h } from '../h';

export function MessageComponent({ level, message }) {
    return h('div', { class: `message message--${level}` }, [
        h('p', {}, [message]),
    ]);
}
