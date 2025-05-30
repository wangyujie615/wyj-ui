// BEM规范 block element modifier state
// 
export function createNameSpace(prefix: string) {
    const prefixName = `w-${prefix}`
    return createBEM(prefixName)
}
function _bem(prefix: string, block: string, element: string, modifier: string) {
    if (block) {
        prefix += `-${block}`
    }
    if (element) {
        prefix += `__${element}`
    }
    if (modifier) {
        prefix += `--${modifier}`
    }
    return prefix
}
function createBEM(prefix: string) {
    const b = (block: string = '') => _bem(prefix, block, "", "")
    const e = (element: string = '') => element ? _bem(prefix, "", element, "") : ''
    const m = (modifier: string = '') => modifier ? _bem(prefix, "", "", modifier) : ''
    const be = (block: string = '', element: string = '') => (block && element) ? _bem(prefix, block, element, "") : ''
    const bm = (block: string = '', modifier: string = '') => (block && modifier) ? _bem(prefix, block, "", modifier) : ''
    const em = (element: string = '', modifier: string = '') => (element && modifier) ? _bem(prefix, "", element, modifier) : ''
    const bem = (block: string = '', element: string = '', modifier: string = '') => (block && element && modifier) ? _bem(prefix, block, element, modifier) : ''
    const is = (name: string, state: string | boolean) => state ? `is-${name}` : ''
    return {
        b,
        e,
        m,
        be,
        bm,
        em,
        bem,
        is
    }
}
