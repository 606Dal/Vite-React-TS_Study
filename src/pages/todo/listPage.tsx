import ListComponent from "../../components/todo/listComponent.tsx";

function ListPage() {
    return (
        <div className={'mt-3 p-3 bg-orange-50 w-full h-full'}>
            <div>Todo List</div>
            <div>
                {/* 키를 줘서 컴포넌트를 렌더링하는 방법도 있는데 중요한 건 상태. */}
                <ListComponent></ListComponent>
            </div>
        </div>
    );
}

export default ListPage;