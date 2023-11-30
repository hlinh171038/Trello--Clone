
interface FormInputProps {
    errors?:{
        title?: string[]
    }
}

export const FormInput = ({errors}: FormInputProps) =>{
    return (
        <div>
            <input
                id="title"
                name="title"
                required
                placeholder="Enter a board title"
                className="border-black border p-1" 
            />
            {errors?.title ? (
                        <div>
                            {errors.title.map((err)=>{
                                return <p key={err} className="text-rose-500">{err}</p>
                            })}
                        </div>
                    ):null}
        </div>
    )
}