"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

interface IEmployee {

  $id: string;
  employeeName: string;
  employeeDetails: string;
  $createdAt: string;
}

export default function Home() {
  const [employees, setEmployees] = useState<IEmployee[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
   const fetchEmployees = async () => {
    setIsLoading(true);
    try {
       const response = await fetch("/api/employees");
       if (!response.ok) {
        throw new Error("Failed to fetch Employees");
      }
      const data= await response.json();
      setEmployees(data);
    } catch (err) {
      console.log("error: ", err)
      setError(
        "Failed to load the employees. please try reloading it"
      );
    } finally {
      setIsLoading(false);
    }
   };

   fetchEmployees();
  }, []);

    const confirmDelete = async (id: string, employeeName: string) => {
      const userConfirmed = confirm(`Are you sure you want to delete ${employeeName}`);

      if (userConfirmed) {
            try {
              await fetch(`/api/employees/${id}`, { method: "DELETE" });
              setEmployees((prevEmployees) => 
                prevEmployees?.filter((i) => i.$id !== id)
              );
            } catch (error) {
              setError("Failed to delete Employee",);
              console.log(error);
            }
        console.log(employeeName, " successfuly deleted!");
      } else {
        console.log("User cancelled the action.");
      }
    }

   

    return (
    <div>
      {error && <p className="py-4 text-red-500">{error}</p>}
      {isLoading? (
        <p>Loading Employees</p>
      ) : employees?.length > 0 ? (
        employees?.map((employee) => (
          <div
            key={employee.$id}
            className="p-4 my-2 rounded-md border-b-1 leading-7"
          >
            <div className="font-bold">{employee.employeeName}</div>
            <div>{employee.employeeDetails}</div>
            
            <div className="flex gap-4 mt-4 justify-end">
              <Link
                className="bg-slate-200 px-4 py-2 rounded-md uppercase text-sm font-bold tracking-widest"
                href={`/edit/${employee.$id}`}
              >
                Edit
              </Link>

              <button 
                onClick={()=> confirmDelete(employee.$id, employee.employeeName)} 
                className="bg-red-500 text-white px-4 py-2 rounded-md uppercase text-sm font-bold tracking-widest cursor-pointer">
                Delete
              </button>
            </div>
          </div>
        ))
      ) : (<p className="py-2 text-blue-500 font-bold">No Employees Found</p>)}
    </div>
  );
}