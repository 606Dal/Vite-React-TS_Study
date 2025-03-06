import {useLocation, useNavigate, useParams, useSearchParams} from "react-router";
import {useState} from "react";


export default function useCustomMove2 () {
    const [searchParams] = useSearchParams()

    const pageStr:string|null = searchParams.get("page")
    const page:number = !pageStr ? 1 : Number(pageStr) // 숫자가 아닌 게 들어오면 NaN

    const sizeStr:string|null = searchParams.get("size")
    const size:number = !sizeStr ? 10 : Number(sizeStr)

    // 타입 & 키 추가 (검색용)
    const typeStr:string|null = searchParams.get("type")
    const type:string = !typeStr ? 'T' : typeStr

    const keyword: string = searchParams.get("keyword") ?? ''; // null이면 빈 문자열로 대체

    const [loading, setLoading] = useState(false)
    const [refresh, setRefresh] = useState(false)
    const [oper, setOper] = useState('')

    const navigate = useNavigate()
    const location = useLocation()

    const params = useParams(); // useParams에서 가져옴

    const tnoStr = params.tno

    const tno =  Number(tnoStr)

    /* 변수 명 변경 page -> pageParam  */
    const moveListPage = (pageParam:number) => {

        // 동일한 페이지를 호출한다면
        if(page === pageParam) {
            setRefresh(!refresh) // false가 아니라면 true로 바뀜?
        }

        const params = new URLSearchParams({
            page: String(page),
            size: String(size),
            type: type || '', // type이 undefined일 경우 대비
        });

        if (keyword) {
            params.append('keyword', keyword);
        }

        navigate(`/todo2/list2?${params.toString()}`)

    }

    const moveRead = (tno:number|string) => {

        const params = new URLSearchParams({
            page: String(page),
            size: String(size),
            type: type || '',
        });

        if (keyword) {
            params.append('keyword', keyword);
        }

        navigate(`/todo2/read2/${tno}?${params.toString()}`);

    }

    const moveToList = () => {
        navigate(`/todo2/list2${location.search}`)
    }

    const moveToModify = (tno:number|unknown) => {

        // /todo/modify/33?page=3&size=10
        navigate(`/todo2/modify2/${tno}${location.search}`)
    }


    return {tno, loading,setLoading, oper, setOper, refresh, page,size, type, keyword, moveListPage, moveRead, moveToList,moveToModify}
}