import ReadComponent from "../../components/todo/readComponent.tsx";
import ModifyComponent from "../../components/todo/modifyComponent.tsx";

function ModifyPage() {
    return (
        <div className={'mt-3 p-3 bg-orange-50 w-full h-full'}>
            <div>Todo ModifyPage</div>
            <div>
                <ModifyComponent></ModifyComponent>
            </div>
        </div>
    );
}

export default ModifyPage;