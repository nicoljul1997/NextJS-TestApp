import client from "@/lib/appwrite";
import { Databases, ID, Query } from "appwrite";
import { NextResponse } from "next/server";

const database = new Databases(client);

async function createEmployee(data: {employeeName: string, employeeDetails: string}) {
    try {
        const response = await database.createDocument(
            process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string,
            "6875d5ce00146c5808e7", ID.unique(), data
        );
        return response;
    } catch (error) {
        console.error("Error Creating Employee", error);
        throw new Error("Failed to create Employee");
    }
}

//fetch employee
async function fetchEmployee() {
    try {
        const response = await database.listDocuments(
            process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string,
            "6875d5ce00146c5808e7",
            [Query.orderDesc("$createdAt")]
        );
        return response.documents;
    } catch (error) {
        console.error("Error fetching Employee", error);
        throw new Error("Failed to fetch Employee");
    }
}

export async function POST(req: Request) {
    try {
        const {employeeName, employeeDetails} = await req.json();
        const response = await createEmployee({ employeeName, employeeDetails });
        console.log(response);
        return NextResponse.json({ message: "Employee Created", data: response});
        
    } catch (error) {

        // console.error("Error in POST /api/employees:", error);
        const message = error instanceof Error ? error.message : String(error);

        return NextResponse.json(
            {
                error: "Failed to create employee",
                message,
            },
            { status: 500 }
        );
    }
}

export async function GET() {
    try {
        const employee = await fetchEmployee();
        return NextResponse.json(employee);
    } catch (error) {
        return NextResponse.json(
            {
                error: "Failed to fetch employee",
                message: error,
            },
            { status: 500 }
        );
    }
}