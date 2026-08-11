import { NextResponse } from "next/server";
import { google } from "googleapis";

export async function POST(request: Request) {
  const { fileURL, fileName } = await request.json();

  const credentials = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_KEY!);

  const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: ["https://www.googleapis.com/auth/drive"],
  });

  const drive = google.drive({ version: "v3", auth });

  const fileResponse = await fetch(fileURL);
  const fileBuffer = Buffer.from(await fileResponse.arrayBuffer());

  const uploaded = await drive.files.create({
    requestBody: {
      name: fileName,
      mimeType: "application/vnd.google-apps.document",
    },
    media: {
      mimeType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      body: require("stream").Readable.from(fileBuffer),
    },
    fields: "id",
  });

  const fileId = uploaded.data.id!;

  const exported = await drive.files.export(
    { fileId, mimeType: "application/pdf" },
    { responseType: "arraybuffer" }
  );

  await drive.files.delete({ fileId });

  return new NextResponse(Buffer.from(exported.data as ArrayBuffer), {
    headers: { "Content-Type": "application/pdf" },
  });
}