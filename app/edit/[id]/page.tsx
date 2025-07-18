"use client";

import React, { ChangeEvent, useEffect, useState, } from "react";
import { useParams, useRouter } from 'next/navigation';

export default function EditPage() {

  const params = useParams();
  const router =useRouter();

  const [formData, setFormData] = useState({ 
    employeeName: "", 
    employeeDetails: ""
  });

  const [isLoading,setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect( () => {

    const fetchData = async () => {
      try {
        const response = await fetch(`/api/employees/${params.id}`);
          if (!response.ok) {
            throw new Error("Failed to fetch data.");
          }

          const data = await response.json();
          setFormData({employeeName: data.employee.employeeName, employeeDetails: data.employee.employeeDetails});
      } catch (error) {
        setError("Failed to load employee");
        console.log(error)
      }  

    };

    fetchData();

  }, [params.id]);

    const handleInputChange = (e:ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
            setFormData((prevData) => ({
                ...prevData,
                [e.target.name]: e.target.value,
            }));
        };

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
     if (!formData.employeeName || !formData.employeeDetails) {
            setError("Please fill in all the fields");
            return
        }

        setError(null);
        setIsLoading(true);

        try {
            const response = await fetch(`/api/employees/${params.id}`, {
                method: "PUT",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                throw new Error("Failed to create employee");
            }

            router.push("/");

        } catch (err) {
            console.log("Something went wrong. Please try again.", err)
        } finally {
            setIsLoading(false);
        }

    };

  return (
    <div>
        <h2 className="text-2xl font-bold my-8">Edit Employee</h2>

        <form onSubmit={handleSubmit} className="flex gap-3 flex-col">
            <input
              type="text"
              name="employeeName"
              placeholder="Full Name"
              value={formData.employeeName}
              onChange={handleInputChange}
              className="py-1 px-4 border rounded-md"
            />

            <textarea 
              name="employeeDetails" 
              rows={4}
              placeholder="Employment Details"
              value={formData.employeeDetails}
              onChange={handleInputChange}
              className="py-1 px-4 border rounded-md resize-none"
            ></textarea>

            <button className="bg-black text-white mt-5 px-4 py-1 rounded-md cursor-pointer">{isLoading ? "Updating..." : "Update Employee"}</button>
        </form>
        {error && <p className="text-red-500 mt-4">Please input all the fields</p>}
    </div>
  )
};
