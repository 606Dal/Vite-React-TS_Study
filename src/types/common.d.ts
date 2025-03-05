
// 타입은 나중에 주기. 제네릭 사용. todo 에도 쓰고 다른 거에도 쓰고
interface PageResponse<T> {
    dtoList: T[],
    end: number,
    next: boolean,
    prev: boolean,
    page: number,
    size: number,
    start: number,
    total: number
}