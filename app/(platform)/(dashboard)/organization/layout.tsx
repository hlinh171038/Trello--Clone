import Sidebar from "../_components/sidebar";

const OragnizationLayout = ({
    children
}: {
    children:React.ReactNode
}) =>{
    return (
        <main className="pt-20 md:pt-24 px-4 max-w-24 2xl:max-w-screen-xl mx-auto">
            <div className="flex gap-x-7">
                <div className="w-64 hidden shrink-0 md:block">
                    {/* Sidebar */}
                    <Sidebar/>
                </div>
                {children}
            </div>  
        </main>
    )
}

export default OragnizationLayout;