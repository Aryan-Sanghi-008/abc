
import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, phone, arrivalDateTime, arrivalFormatted, notes } = body;

    if (!name || !phone) {
      return NextResponse.json(
        { error: "Name and phone number are required" },
        { status: 400 }
      );
    }

    const submission = {
      timestamp: new Date().toISOString(),
      name: String(name).trim(),
      phone: String(phone).trim(),
      arrivalDateTime: String(arrivalDateTime || ""),
      arrivalFormatted: String(arrivalFormatted || ""),
      notes: String(notes || "").trim(),
    };

    // 1. Forward to Google Sheets
    const webhookUrl =
      process.env.GOOGLE_SHEETS_URL ||
      process.env.NEXT_PUBLIC_GOOGLE_SHEETS_URL;

    let googleSheetsForwarded = false;
    let googleSheetsResponse: any = null;
    let googleSheetsStatus: number | null = null;

    if (webhookUrl && webhookUrl.startsWith("http")) {
      try {
        const response = await fetch(webhookUrl, {
          method: "POST",
          headers: {
            "Content-Type": "text/plain;charset=utf-8",
          },
          body: JSON.stringify(submission),
          cache: "no-store",
        });

        googleSheetsStatus = response.status;

        const responseText = await response.text();

        try {
          googleSheetsResponse = JSON.parse(responseText);
        } catch {
          googleSheetsResponse = responseText;
        }

        googleSheetsForwarded =
          response.ok &&
          typeof googleSheetsResponse === "object" &&
          googleSheetsResponse !== null &&
          googleSheetsResponse.result === "success";

        console.log("Google Sheets HTTP Status:", googleSheetsStatus);
        console.log("Google Sheets Response:", googleSheetsResponse);

      } catch (forwardErr) {
        console.error(
          "Error forwarding RSVP to Google Sheets:",
          forwardErr
        );
      }
    }

    // 2. Persist locally as backup
    try {
      const dataDir = path.join(process.cwd(), "data");
      const filePath = path.join(dataDir, "rsvp-submissions.json");

      if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true });
      }

      let existing: unknown[] = [];

      if (fs.existsSync(filePath)) {
        const content = fs.readFileSync(filePath, "utf-8");

        try {
          existing = JSON.parse(content);
        } catch {
          existing = [];
        }
      }

      existing.push(submission);

      fs.writeFileSync(
        filePath,
        JSON.stringify(existing, null, 2),
        "utf-8"
      );
    } catch (saveErr) {
      console.warn("Could not save local backup:", saveErr);
    }

    return NextResponse.json({
      success: true,
      googleSheetsForwarded,
      googleSheetsStatus,
      googleSheetsResponse,
      data: submission,
    });

  } catch (error) {
    console.error("RSVP error:", error);

    return NextResponse.json(
      { error: "Unable to process RSVP submission" },
      { status: 500 }
    );
  }
}
