import {useSearchParams} from "react-router";
import {useEffect, useState} from "react";
import {getTodoList} from "../../api/todoApi.tsx";
import LoadingComponent from "../common/loadingComponent.tsx";
import {formatKoreanDate} from "../../types/date.ts";

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

    const [searchParams] = useSearchParams()

    const pageStr:string|null = searchParams.get("page")
    const page:number = !pageStr ? 1 : Number(pageStr)

    const sizeStr:string|null = searchParams.get("size")
    const size:number = !sizeStr ? 10 : Number(sizeStr)

    const [serverData, setServerData] = useState(initState)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        console.log(" API 요청:", page, size);

        setLoading(true)

        setTimeout(() => {
            getTodoList(page, size).then(data => {
                setServerData(data)
                setLoading(false)
            })
        }, 1000)

    },[page, size])

    return (
        <div className=" mt-10 mr-2 ml-2 pb-3">
            <LoadingComponent isLoading={loading}/>

            <div>
                <ul className="w-full max-w-2xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
                    {serverData.dtoList.map(todo =>
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

        </div>
    );
}

export default ListComponent2;