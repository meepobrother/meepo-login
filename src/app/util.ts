import { Img } from './interface';
export function getUnitValue(val: any): string {
    if (isPresent(val)) {
        if (typeof val === 'string') {
            if (val.indexOf('%') > -1 || val.indexOf('px') > -1) {
                return val;
            }
            if (val.length) {
                return val + 'px';
            }

        } else if (typeof val === 'number') {
            return val + 'px';
        }
    }
    return '';
}

export function isPresent(val: any): val is any { return val !== undefined && val !== null; }

export function isTrueProperty(val: any): boolean {
    if (typeof val === 'string') {
        val = val.toLowerCase().trim();
        return (val === 'true' || val === 'on' || val === '');
    }
    return !!val;
}


export function updateImgs(imgs: Img[], viewableTop: number, contentHeight: number, scrollDirectionY: string, requestableBuffer: number, renderableBuffer: number) {
    const viewableBottom = (viewableTop + contentHeight);
    const priority1: Img[] = [];
    const priority2: Img[] = [];
    let img: Img;
    for (let i = 0, ilen = imgs.length; i < ilen; i++) {
        img = imgs[i];
        if (scrollDirectionY === 'up') {
            if (img.top < viewableBottom && img.bottom > viewableTop - renderableBuffer) {
                img.canRequest = img.canRender = true;
                priority1.push(img);
                continue;
            }
            if (img.bottom <= viewableTop && img.bottom > viewableTop - requestableBuffer) {
                img.canRequest = true;
                img.canRender = false;
                priority2.push(img);
                continue;
            }
            if (img.top >= viewableBottom && img.top < viewableBottom + renderableBuffer) {
                img.canRequest = img.canRender = false;
                continue;
            }
        } else {
            if (img.bottom > viewableTop && img.top < viewableBottom + renderableBuffer) {
                img.canRequest = img.canRender = true;
                priority1.push(img);
                continue;
            }
            if (img.top >= viewableBottom && img.top < viewableBottom + requestableBuffer) {
                img.canRequest = true;
                img.canRender = false;
                priority2.push(img);
                continue;
            }
            if (img.bottom <= viewableTop && img.bottom > viewableTop - renderableBuffer) {
                img.canRequest = img.canRender = false;
                continue;
            }
        }
        img.canRequest = img.canRender = false;
        img.reset();
    }
    priority1.sort(sortTopToBottom).forEach(i => i.update());
    if (scrollDirectionY === 'up') {
        priority2.sort(sortTopToBottom).reverse().forEach(i => i.update());
    } else {
        priority2.sort(sortTopToBottom).forEach(i => i.update());
    }
}


export function sortTopToBottom(a: Img, b: Img) {
    if (a.top < b.top) {
        return -1;
    }
    if (a.top > b.top) {
        return 1;
    }
    return 0;
}

export function parsePxUnit(val: string): number {
    return (val.indexOf('px') > 0) ? parseInt(val, 10) : 0;
}

export function cssFormat(val: number): string {
    return (val > 0 ? val + 'px' : '');
}
