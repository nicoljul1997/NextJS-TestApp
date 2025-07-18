import client from "@/lib/appwrite";
import { Databases } from "appwrite";
import { NextResponse } from "next/server";

const database = new Databases(client);

//fetch specific employee

async function fetchEmployee(id: string) {
    try {
        const employee = await database.getDocument(
            process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string,
            "6875d5ce00146c5808e7",
            id
        );
        return(employee);
    } catch (error) {
        console.error("error fetching employee", error);
        throw new Error("failed to fetch employee");
        
    }
    
}

//delete employee

async function deleteEmployee(id: string) {
    try {
        const response = await database.deleteDocument(
            process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string,
            "6875d5ce00146c5808e7",
            id
        );
        return response;
    } catch (error) {
        console.error("Error Deleting employee", error);
        throw new Error("Failed to delete Employee")
    }
    
}

//update employee

async function updateEmployee(id: string, data: {employeeName: string, employeeDetails: string}) {
    try {
        const response = await database.updateDocument(
            process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string,
            "6875d5ce00146c5808e7",
            id,
            data
        );
        return response;
    } catch (error) {
        console.error("Error Deleting employee", error);
        throw new Error("Failed to delete Employee")
    }
    
}

//get call
export async function GET(req: Request, props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    try {
        const id = params.id;
        const employee = await fetchEmployee(id);
        return NextResponse.json({ employee });
    } catch (err) {
        return NextResponse.json(
            {error: "Failed to fetch employee", err},
            {status: 500}
        );
    }
}

//delete call
export async function DELETE(req: Request, props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    try {
        const id = params.id;
        await deleteEmployee(id);
        return NextResponse.json({ message: "Employee deleted" });
    } catch (err) {
        return NextResponse.json(
            {error: "Failed to delete employee", err},
            {status: 500}
        );
    }
}

//update call
export async function PUT(req: Request, props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    try {
        const id = params.id;
        const employee = await req.json();
        await updateEmployee(id, employee)
        return NextResponse.json({ message: "Employee updated" });
    } catch (err) {
        return NextResponse.json(
            {error: "Failed to update employee", err},
            {status: 500}
        );
    }
}