/* Props를 따로 뺀 이유가 버튼 이벤트를 걸기 위해서. 페이지 컴포넌트는 공통으로 빼놨으니까
*  다른 곳에서도 써야 해서 속성으로 넘겨줘야 함. */

interface PageComponentProps<T> {
    serverData: PageResponse<T>
    moveListPage: (page:number) => void
}

function PageComponent({serverData, moveListPage}: PageComponentProps<unknown>) {

    /* 구조 분해 할당으로 필요한 것만 추림 */
    const {page, prev, next, start, end} = serverData

    /* 배열을 만드는 방법이1, 2. forloof 써도 되고 */
    const pageNumArr = Array.from({ length: end - start + 1 }, (_, i) => start + i);

    return (
        <div className="flex items-center justify-center space-x-2 mt-4 mb-4">

            {prev &&
                <div
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 disabled:opacity-50"
                    onClick={() => moveListPage(start - 1)}
                >
                    이전
                </div>
            }

            {pageNumArr.map((num, idx) =>
                <div key={idx}
                     className={`px-4 py-2 rounded-lg transition ${page === num ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                     onClick={() => moveListPage(num)}
                >
                    {num}
                </div>)}

            {next &&
                <div  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 disabled:opacity-50"
                      onClick={() => moveListPage(end + 1)}
                >
                    다음
                </div>}
        </div>
    );
}

export default PageComponent;