import ListComponent2 from "../../components/todo/listComponent2.tsx";

function ListPage2() {
    return (
        <div>
            <div className={'mt-3 p-3 bg-orange-50 w-full h-full'}>
                <div>Todo List2</div>
                <div>
                    <ListComponent2></ListComponent2>
                </div>
            </div>
        </div>
    );
}

export default ListPage2;