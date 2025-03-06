import {useEffect, useState} from "react";
import {getTodo} from "../../api/todoApi.tsx";
import useCustomMove from "../../hooks/useCustomMove.tsx";
import LoadingComponent from "../common/loadingComponent.tsx";

/* 코딩할때마다 null 체크 귀찮을 때 사용함. */
const initState:Todo = {
    tno:0,
    title:'',
    writer:'',
    regDate:'',
    modDate:'',
}

function ReadComponent() {

    /* 타입스크립트가 null 허용 안 함. 초깃값. 다른 걸로 설정. */
    const [todo, setTodo] = useState<Todo>(initState)
    // const location = useLocation()
    // const navigate = useNavigate()
    // const [loading, setLoading] = useState(false)

    const {tno, loading, setLoading, moveToModify, moveToList} = useCustomMove()

    // const moveToList = () => {
    //     navigate(`/todo/list${location.search}`)
    // }
    // const moveToModify = () => {
    //     // /todo/modify/827?page=4&size=10
    //     navigate(`/todo/modify/${todo.tno}${location.search}`)
    // }
    //
    // const params = useParams() // 문자열
    // const tnoStr = params.tno

    // 화면 처리가 끝나고 가져오면 다시 렌더링 해야 함. useEffect
    // params 안에 tno가 있어서 이렇게 꺼내짐.
    //const {tno} = useParams()

    useEffect(() => {

        // const tno = Number(tnoStr);

        setLoading(true)

        setTimeout(() => {

            getTodo(tno)
                .then(data => {
                    setTodo(data)
                    setLoading(false)
                })
                .catch(error => console.error("Error fetching todo:", error));
        }, 1000)

    }, [tno]);

    return (
        <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg">
            <LoadingComponent isLoading={loading}/>

            <h2 className="text-xl font-semibold text-gray-800 mb-4">📌 Todo Read Component</h2>

            <div className="space-y-3">
                <div>
                    <label className="block text-gray-600 text-sm font-medium">번호</label>
                    <input type="text" value={todo.tno} readOnly className="w-full p-2 border rounded bg-gray-100 text-gray-700" />
                </div>

                <div>
                    <label className="block text-gray-600 text-sm font-medium">제목</label>
                    <input type="text" value={todo.title} readOnly className="w-full p-2 border rounded bg-gray-100 text-gray-700" />
                </div>

                <div>
                    <label className="block text-gray-600 text-sm font-medium">작성자</label>
                    <input type="text" value={todo.writer} readOnly className="w-full p-2 border rounded bg-gray-100 text-gray-700" />
                </div>

                <div>
                    <label className="block text-gray-600 text-sm font-medium">등록일</label>
                    <input type="text" value={todo.regDate} readOnly className="w-full p-2 border rounded bg-gray-100 text-gray-700" />
                </div>

                <div>
                    <label className="block text-gray-600 text-sm font-medium">수정일</label>
                    <input type="text" value={todo.modDate} readOnly className="w-full p-2 border rounded bg-gray-100 text-gray-700" />
                </div>
                <div className="flex justify-end space-x-4">
                    <button
                        className="px-4 py-2 bg-blue-500 text-white rounded"
                        onClick={moveToList}
                    >List</button>
                    <button
                        className="px-4 py-2 bg-green-500 text-white rounded"
                        onClick={() => moveToModify(todo.tno)}
                    >Modify</button>
                </div>
            </div>
        </div>
    );
}

export default ReadComponent;