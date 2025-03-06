import AddComponent2 from "../../components/todo2/addComponent2.tsx";

function AddPage2() {
    return (
        <div className={'my-3 p-3 bg-lime-50 w-full h-full'}>
            <div className={'my-3 text-center text-4xl text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-500 bg-clip-text text-transparent'}>
                Todo Add
            </div>
            <div>
                <AddComponent2></AddComponent2>
            </div>
        </div>
    );
}

export default AddPage2;