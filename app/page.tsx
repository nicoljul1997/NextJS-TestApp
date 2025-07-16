import Link from "next/link";

export default function Home() {
  return (
    <div>

      <div className="p-4 my-2 rounded-md border-b-1 leading-7">
        <div className="font-bold">Nicoljul Ochavillo</div>
        <div>
          ID: 450
        </div>
        <div>
          Position: Programmer Taraw
        </div>
        <div>
          Department: MIS Office
        </div>

        <div className="flex gap-4 mt-4 justify-end">
          <Link className="bg-slate-200 px-4 py-2 rounded-md uppercase text-sm font-bold tracking-widest"href="/edit">
          edit
          </Link>
        

          <button className="bg-red-500 text-white px-4 py-2 rounded-md uppercase text-sm font-bold tracking-widest">
          Delete
          </button>
        </div>

      </div>

    </div>
  );
}
