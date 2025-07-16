export default function CreatePage() {
return (
    <div>
        <h2 className="text-2xl font-bold my-8">Add New Employee</h2>

        <form className="flex gap-3 flex-col">
            <input
                type="text"
                name="fullname"
                placeholder="Full Name"
                className="py-1 px-4 border rounded-md"
            />

            <textarea 
            name="details" 
            rows={4}
            placeholder="Employment Details"
            className="py-1 px-4 border rounded-md resize-none"
            ></textarea>

            <button className="bg-black text-white mt-5 px-4 py-1 rounded-md cursor-pointer">Add Employee</button>
        </form>
    </div>
);
}