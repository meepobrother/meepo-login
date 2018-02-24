
export interface Img {
    top: number;
    bottom: number;
    canRender: boolean;
    canRequest: boolean;
    reset(): void;
    update(): void;
}

export interface ContentDimensions {
    contentHeight: number;
    contentTop: number;
    contentBottom: number;
    contentWidth: number;
    contentLeft: number;
    scrollHeight: number;
    scrollTop: number;
    scrollWidth: number;
    scrollLeft: number;
}
