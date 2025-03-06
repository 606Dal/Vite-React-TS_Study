import {useEffect, useState} from "react";
import {getTodoList} from "../../api/todoApi.tsx";
import LoadingComponent from "../common/loadingComponent.tsx";
import {formatKoreanDate} from "../../types/date.ts";
import useCustomMove2 from "../../hooks/useCustomMove2.tsx";
import PageComponent from "../common/pageComponent.tsx";

/* 검색 버튼 안 됨. 경로에 나오게 해야 할 것 같음. */
const initState:PageResponse<Todo> = {
    dtoList: [],
    total:0,
    size: 0,
    end : 0,
    next: false,
    prev: false,
    page: 0,
    start: 0
}

function ListComponent2() {

    const {page, size, loading, setLoading, type, keyword, moveListPage} = useCustomMove2()

    const [serverData, setServerData] = useState(initState)
    const [searchKeyword, setSearchKeyword] = useState("")
    const [selectedType, setSelectedType] = useState("T")

    useEffect(() => {
        console.log(" API 요청:", page, size, ", type: ", type, ", keyword", keyword);

        setLoading(true)

        setTimeout(() => {
            getTodoList(page, size).then(data => {
                setServerData(data)
                setLoading(false)
            })
        }, 1000)

    }, [page, size, type, keyword])

    const filteredTodos = serverData.dtoList.filter(todo =>
        selectedType === "T"
            ? todo.title.toLowerCase().includes(searchKeyword.toLowerCase())
            : todo.writer.toLowerCase().includes(searchKeyword.toLowerCase())
    )

    const handleSearch = () => {
        moveListPage(page)
    }

    return (
        <div className=" mt-10 mr-2 ml-2 pb-3">
            <LoadingComponent isLoading={loading}/>

            <div className="w-full max-w-2xl mx-auto mb-4 flex items-center gap-2">
                <input
                    type="text"
                    placeholder="검색어를 입력하세요..."
                    value={searchKeyword}
                    onChange={(e) => setSearchKeyword(e.target.value)}
                    className="w-full p-3 border rounded-lg shadow-sm focus:ring focus:ring-blue-300 focus:outline-none"
                />
                <button
                    onClick={handleSearch}
                    className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-lg shadow-sm hover:bg-blue-600"
                >검색</button>
                <div className="relative">
                    <select
                        value={selectedType}
                        onChange={(e) => setSelectedType(e.target.value)}
                        className="px-4 py-2 text-sm font-medium border rounded-lg shadow-sm bg-white focus:ring focus:ring-blue-300 focus:outline-none"
                    >
                        <option value="T">제목</option>
                        <option value="W">작성자</option>
                    </select>
                </div>
            </div>


            <div>
                <ul className="w-full max-w-2xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
                    {filteredTodos.map(todo =>
                        <li
                            key={todo.tno}
                            className="grid grid-cols-8 items-center p-4 border-b last:border-none hover:bg-gray-100"
                        >
                            <span className="font-medium text-gray-900">{todo.tno}</span>
                            <span className="font-medium text-gray-900 col-span-4">{todo.title}</span>
                            <span className="text-gray-600">{todo.writer}</span>
                            <span className="text-gray-500 text-sm col-span-2">{formatKoreanDate(todo.regDate)}</span>
                        </li>
                    )}
                </ul>
            </div>
            <PageComponent serverData={serverData} moveListPage={moveListPage} />

        </div>
    );
}

export default ListComponent2;