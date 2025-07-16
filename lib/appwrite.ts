// lib/appwrite.js
import { Client } from 'appwrite';

const client = new Client();

client
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT as string) // Your Appwrite Endpoint
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID as string); // Your Appwrite Project ID
    

export default client;