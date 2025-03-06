import {useEffect, useState} from "react";
import {getTodoList} from "../../api/todoApi.tsx";
import LoadingComponent from "../common/loadingComponent.tsx";
import PageComponent from "../common/pageComponent.tsx";
import useCustomMove from "../../hooks/useCustomMove.tsx";
//import {debounce} from ""

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

function ListComponent() {

    // const [searchParams] = useSearchParams()
    //
    // /* 쿼리 스트링으로 들어가는 애들.  ?page= */
    // const pageStr:string|null = searchParams.get("page")
    // const page:number = !pageStr ? 1 : Number(pageStr) // 숫자가 아닌 게 들어오면 NaN
    //
    // const sizeStr:string|null = searchParams.get("size")
    // const size:number = !sizeStr ? 10 : Number(sizeStr)
    //
    const [serverData, setServerData] = useState(initState)
    // const [loading, setLoading] = useState(false)
    // const [refresh, setRefresh] = useState(false)
    //
    // const navigate = useNavigate()
    //
    // /* 변수 명 변경 page -> pageParam  */
    // const moveListPage = (pageParam:number) => {
    //
    //     console.log(page, pageParam) // 주소창 값이랑 pageParam 값
    //     // 동일한 페이지를 호출한다면
    //     if(page === pageParam) {
    //         setRefresh(!refresh) // false가 아니라면 true로 바뀜?
    //     }
    //
    //     navigate(`/todo/list?page=${pageParam}&size=${size}`)
    //
    // }
    //
    // const moveRead = (tno:number|string) => {
    //
    //     navigate(`/todo/read/${tno}?page=${page}&size=${size}`)
    //
    // }

    const {loading, setLoading, refresh, page, size, moveListPage, moveRead} = useCustomMove()

    /* 페이지랑 사이즈가 바뀔 때 새로 호출 useEffect */
    useEffect(()=> {

        setLoading(true)

        setTimeout(() => {
            getTodoList(page,size).then(data => {
                setServerData(data)
                setLoading(false)
            })
        }, 1000)

    },[page, size, refresh])

    return (
        <div className="border-2 border-blue-100 mt-10 mr-2 ml-2 pb-3">

            <LoadingComponent isLoading={loading}/>

            <div className="flex flex-wrap mx-auto justify-center p-6">
                List Component
            </div>
            <div>
                <ul className="w-full max-w-2xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
                    {serverData.dtoList.map(todo =>
                        <li
                            key={todo.tno}
                            className="flex justify-between items-center p-4 border-b last:border-none hover:bg-gray-100"
                            onClick={() => moveRead(todo.tno || 0)} // 언디파인드 대신 사용 0.
                        >
                            <span className="font-medium text-gray-900">{todo.tno}</span>
                            <span className="font-medium text-gray-900">{todo.title}</span>
                            <span className="text-gray-600">{todo.writer}</span>
                            <span className="text-gray-500 text-sm">{todo.regDate}</span>
                        </li>
                    )}
                </ul>

            </div>
            <PageComponent serverData={serverData} moveListPage={moveListPage} />
        </div>
    );
}

export default ListComponent;