import AddComponent from "../../components/todo/addComponent.tsx";

function AddPage() {
    return (
        <div>
            <div className={'text-4xl'}>
                Todo Add Page
            </div>
            <div>
                <AddComponent></AddComponent>
            </div>
        </div>
    );
}

export default AddPage;