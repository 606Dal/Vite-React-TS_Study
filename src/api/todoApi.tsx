// import axios, {AxiosResponse} from "axios";
import axios from "axios";

// 리턴 타입 안 적는다고 문제가 생기는 건 아님.
// export async function getTodo( tno:number ): Promise<AxiosResponse<Todo>> {

const HOST:string = import.meta.env.VITE_API_SERVER
console.log(HOST)

export async function getTodo(tno:number ): Promise<Todo> {

    // 이 부분이 응답.
    // any 는 뭐든 되는 자바의 object 같은 것.
    try {
        const res = await axios.get(`${HOST}/${tno}`)
        // res 안에 data라는 게 있음.
        return res.data
    }catch (err) {
        console.log(err)
        // throw new Error("Data Not Found")
        throw Promise.reject("Data Not Found")
    }
}

export async function getTodoList ( page:number = 1 , size: number = 10 ): Promise<PageResponse<Todo>> {

    // 값 줄 때 조심. ?page={page} 써도 되는데 깔끔하지 않아서 param 사용.
    const param = {page:page, size:size}

    const res =
        await axios.get(`${HOST}/list`, {params:param})

    return res.data
}

// 지금 todo는 title만 수정 가능
export async function updateTodo ( tno: number, title: string ):Promise<Todo> {

    // tno를 받아서 title을 변경
    // axios.patch(`http://IP/api/v1/todos/list/${tno}`, {title})
    const res = await axios.put(
        `${HOST}/${tno}`, {title:title, tno:tno})

    return res.data
}

export async function deleteTodo (tno: number):Promise<void> {

    await axios.delete(`${HOST}/${tno}`)

}

export async function postTodo (todo:Todo): Promise<number> {

    const res =
        await axios.post(`${HOST}`, todo)

    return res.data
}