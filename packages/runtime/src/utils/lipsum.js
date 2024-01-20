import { hFragment, h } from '../h';

export default function lipsum(num) {
    if (typeof num !== 'number' || num <= 0) return;

    const p = h('p', {}, [
        `Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
    sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut 
    enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi 
    ut aliquip ex ea commodo consequat.`,
    ]);
    const paragraphs = new Array(num).fill(p);

    return hFragment(paragraphs);
}
