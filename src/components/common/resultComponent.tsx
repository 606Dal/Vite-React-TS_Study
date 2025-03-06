import {useState} from "react";

interface ResultComponentProps {
    // show:boolean,
    msg:string,
    closeFn: () => void
}

// export default function ResultComponent({ show, msg, closeFn } :ResultComponentProps ) {
export default function ResultComponent({ msg, closeFn } :ResultComponentProps ) {

    const [showFlag, setShowFlag] = useState(msg && true)

    function getMsg() {
        if(msg === 'D'){
            return '삭제되었습니다.'
        }else if(msg === 'M'){
            return '수정되었습니다.'
        }else {
            return msg
        }
    }

    // if (!show) return null;
    if (!showFlag) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
             style={{ backgroundColor: 'rgba(169, 169, 169, 0.7)' }}
             onClick={() => {
                 setShowFlag(false)
                 closeFn()
             }}
        >
            <div className="bg-green-200 p-6 rounded-lg shadow-lg">
                <p className="text-lg font-semibold text-gray-700">{getMsg()}</p>
            </div>
        </div>
    );
}