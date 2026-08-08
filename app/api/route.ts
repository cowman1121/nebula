import { NextResponse } from "next/server";

export async function GET(){
const credentials = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_KEY!);
return NextResponse.json({email: credentials.client_email});
}