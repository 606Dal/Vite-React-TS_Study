import useCustomMove from "../../hooks/useCustomMove.tsx";
import {useEffect, useState} from "react";
import {deleteTodo, getTodo, updateTodo} from "../../api/todoApi.tsx";
import ResultComponent from "../common/resultComponent.tsx";
import LoadingComponent from "../common/loadingComponent.tsx";

const initState:Todo = {
    tno:0,
    title:'',
    writer:'',
    regDate:'',
    modDate:'',
}

function ModifyComponent() {

    // const {tno, moveToList, loading, setLoading, result, setResult, moveRead} = useCustomMove()
    const {tno, moveToList, loading, setLoading, moveRead, oper, setOper} = useCustomMove()

    const [todo, setTodo] = useState<Todo>(initState)

    useEffect(() => {
        setLoading(true)

        getTodo(tno).then(data => {
            setTodo(data)
            setLoading(false)
        })

    }, [tno])

    // const [oper, setOper] = useState('M') // 삭제냐 수정이냐

    const handleClickDelete = () => {

        setLoading(true)

        deleteTodo(tno).then(() => {
            setLoading(false)
            setOper('D')
        })

        // setTimeout(() => {
        //     deleteTodo(tno).then(() => {
        //         setLoading(false)
        //         setOper('D')
        //         setResult(true)
        //     })
        // }, 2000)

    }

    const handleClickModify = () => {

        setLoading(true)

        updateTodo(tno, todo.title).then(() => {
            setLoading(false)
            setOper('M')
        })

        // setTimeout(() => {
        //     updateTodo(tno, todo.title).then(() => {
        //         setLoading(false)
        //         setOper('M')
        //         setResult(true)
        //     })
        // }, 2000)

    }

    // const msgStr = oper === 'M'? 'Modifed...' : 'Deleted...'

    const closeFn = () => {
        // setResult(false)
        if (oper === 'M') {
            moveRead(tno)
        }else {
            moveToList() // 삭제 후 리스트로
        }
    }

    return (
        <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg">
            {/*<ResultComponent show={result} msg={oper} closeFn={closeFn}></ResultComponent>*/}
            {oper && <ResultComponent msg={oper} closeFn={closeFn}></ResultComponent>}

            <LoadingComponent isLoading={loading}/>

            <h2 className="text-xl font-semibold text-gray-800 mb-4">📌 Todo Modify Component</h2>

            <div className="space-y-3">
                <div>
                    <label className="block text-gray-600 text-sm font-medium">번호</label>
                    <input type="text" value={todo.tno} readOnly
                           className="w-full p-2 border rounded bg-gray-100 text-gray-700" />
                </div>

                <div>
                    <label className="block text-gray-600 text-sm font-medium">제목</label>
                    <input type="text" value={todo.title}
                           onChange={(e) => {
                               todo.title = e.target.value
                               setTodo({...todo})
                           }}
                           className="w-full p-2 border rounded bg-gray-100 text-gray-700" />
                </div>

                <div>
                    <label className="block text-gray-600 text-sm font-medium">작성자</label>
                    <input type="text" value={todo.writer} readOnly
                           className="w-full p-2 border rounded bg-gray-100 text-gray-700" />
                </div>

                <div>
                    <label className="block text-gray-600 text-sm font-medium">등록일</label>
                    <input type="text" value={todo.regDate} readOnly
                           className="w-full p-2 border rounded bg-gray-100 text-gray-700" />
                </div>

                <div>
                    <label className="block text-gray-600 text-sm font-medium">수정일</label>
                    <input type="text" value={todo.modDate} readOnly className="w-full p-2 border rounded bg-gray-100 text-gray-700" />
                </div>
                <div className="flex justify-end space-x-4">
                    <button
                        className="px-4 py-2 bg-blue-500 text-white rounded"
                        onClick={moveToList}
                    >List
                    </button>
                    <button
                        className="px-4 py-2 bg-green-500 text-white rounded"
                        onClick={handleClickModify}
                    >Modify
                    </button>
                    <button
                        className="px-4 py-2 bg-red-500 text-white rounded"
                        onClick={handleClickDelete}
                    >Delete
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ModifyComponent;