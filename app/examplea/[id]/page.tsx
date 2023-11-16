const IdPage = ({
    params
}:{params:{id:string}}) =>{
    return (
        <div>
            id: {params.id}
        </div>
    )
}

export default IdPage