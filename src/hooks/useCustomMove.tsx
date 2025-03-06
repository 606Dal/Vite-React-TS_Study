import {useLocation, useNavigate, useParams, useSearchParams} from "react-router";
import {useState} from "react";

/* 커스텀 훅은 앞에 use 붙인다고 함 */
export default function useCustomMove () {
    const [searchParams] = useSearchParams()

    /* 쿼리 스트링으로 들어가는 애들.  ?page= */
    const pageStr:string|null = searchParams.get("page")
    const page:number = !pageStr ? 1 : Number(pageStr) // 숫자가 아닌 게 들어오면 NaN

    const sizeStr:string|null = searchParams.get("size")
    const size:number = !sizeStr ? 10 : Number(sizeStr)

    const [loading, setLoading] = useState(false)
    const [refresh, setRefresh] = useState(false)
    // const [result, setResult] = useState(false)
    const [oper, setOper] = useState('')

    const navigate = useNavigate()
    const location = useLocation()

    const params = useParams(); // useParams에서 가져옴

    const tnoStr = params.tno

    const tno =  Number(tnoStr)

    /* 변수 명 변경 page -> pageParam  */
    const moveListPage = (pageParam:number) => {

        console.log(page, pageParam) // 주소창 값이랑 pageParam 값
        // 동일한 페이지를 호출한다면
        if(page === pageParam) {
            setRefresh(!refresh) // false가 아니라면 true로 바뀜?
        }

        navigate(`/todo/list?page=${pageParam}&size=${size}`)

    }

    const moveRead = (tno:number|string) => {

        navigate(`/todo/read/${tno}?page=${page}&size=${size}`)

    }

    const moveToList = () => {
        navigate(`/todo/list${location.search}`)
    }

    const moveToModify = (tno:number|unknown) => {

        // /todo/modify/33?page=3&size=10
        navigate(`/todo/modify/${tno}${location.search}`)
    }


    return {tno, loading,setLoading, oper, setOper, refresh, page,size, moveListPage, moveRead, moveToList,moveToModify}
}