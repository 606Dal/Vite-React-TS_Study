import {useState} from "react";
import {postTodo} from "../../api/todoApi.tsx";
import ResultComponent from "../common/resultComponent.tsx";
import LoadingComponent from "../common/loadingComponent.tsx";
import useCustomMove2 from "../../hooks/useCustomMove2.tsx";

function AddComponent2() {

    const [todo, setTodo] = useState<Todo>({title:'', writer:''})

    const {moveListPage, loading, setLoading, oper, setOper} = useCustomMove2()

    const handleClick = () => {
        setLoading(true)

        setTimeout(() => {
            postTodo(todo).then(todoNum => {
                setLoading(false)
                setOper(`New Todo No.${todoNum} Added`)
            })
        }, 1000)
    }

    const closeFn = () => {
        moveListPage(1)
    }

    return (
        <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg">

            {oper && <ResultComponent msg={oper} closeFn={closeFn}></ResultComponent>}

            <LoadingComponent isLoading={loading}/>

            <div className="space-y-3">
                {/* 제목 input */}
                <div>
                    <label className="block text-gray-600 text-sm font-medium">Title</label>
                    <input type="text" value={todo.title}
                           className="w-full p-2 border rounded bg-gray-100 text-gray-700"
                           onChange={e => {
                               todo.title = e.target.value
                               setTodo({...todo})
                           }}
                    />
                </div>

                {/* 작성자 input */}
                <div>
                    <label className="block text-gray-600 text-sm font-medium">Writer</label>
                    <input type="text" value={todo.writer}
                           className="w-full p-2 border rounded bg-gray-100 text-gray-700"
                           onChange={e => {
                               todo.writer = e.target.value
                               setTodo({...todo})
                           }}
                    />
                </div>

                <div className="flex justify-end space-x-4">
                    <button
                        className="px-4 py-2 bg-teal-400 text-white rounded"
                        onClick={handleClick}
                    >Add</button>
                </div>
            </div>

        </div>
    );
}

export default AddComponent2;