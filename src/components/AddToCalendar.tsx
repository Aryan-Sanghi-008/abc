"use client";

import { useState } from "react";

export function AddToCalendar() {
  const [downloaded, setDownloaded] = useState(false);

  // Google Calendar URL construction
  const googleCalendarUrl = () => {
    const base = "https://calendar.google.com/calendar/render?action=TEMPLATE";
    const text = encodeURIComponent("Wedding Celebration: Noopur & Ishan");
    const dates = "20261120T050000Z/20261121T180000Z";
    const details = encodeURIComponent(
      "Join us to celebrate the wedding celebrations of Noopur & Ishan!\n\n" +
        "Venue: The Celestial Garden, Pratap Nagar, Udaipur\n\n" +
        "Program:\n" +
        "• Nov 20, 10:30 AM - Haldi Ceremony (Turmeric Tales)\n" +
        "• Nov 20, 04:00 PM - Sagai\n" +
        "• Nov 20, 07:00 PM - Sangeet\n" +
        "• Nov 21, 09:30 AM - Baarat Procession\n" +
        "• Nov 21, 11:00 AM - Varmala & Pheras\n" +
        "• Nov 21, 07:00 PM - Reception Dinner"
    );
    const location = encodeURIComponent(
      "The Celestial Garden, Pratap Nagar, Udaipur, Rajasthan"
    );

    return `${base}&text=${text}&dates=${dates}&details=${details}&location=${location}`;
  };

  // Apple / Outlook iCal (.ics) Generator
  const downloadIcs = () => {
    const icsContent = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//Noopur & Ishan Wedding//EN",
      "CALSCALE:GREGORIAN",
      "METHOD:PUBLISH",
      "BEGIN:VEVENT",
      "UID:noopur-ishan-wedding-2026@celebration",
      "DTSTAMP:20261120T000000Z",
      "DTSTART:20261120T050000Z",
      "DTEND:20261121T180000Z",
      "SUMMARY:Wedding of Noopur & Ishan",
      "DESCRIPTION:Wedding celebrations of Noopur and Ishan at Udaipur.",
      "LOCATION:The Celestial Garden\\, Pratap Nagar\\, Udaipur\\, Rajasthan",
      "STATUS:CONFIRMED",
      "END:VEVENT",
      "END:VCALENDAR",
    ].join("\r\n");

    const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "Noopur-Ishan-Wedding.ics");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 3000);
  };

  return (
    <div className="mx-auto mt-4 w-full max-w-85 rounded-xl border border-[#e8ced4] bg-white/60 p-3.5 backdrop-blur-xs">
      <div className="flex items-center justify-center gap-2 mb-2 text-[#8d3d4e]">
        <CalendarIcon />
        <span className="font-serif text-[15px] font-semibold tracking-wide">
          Save the Dates
        </span>
      </div>
      <div className="grid grid-cols-2 gap-2 text-xs">
        <a
          href={googleCalendarUrl()}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-1.5 rounded-lg border border-[#c48d98] bg-white px-2.5 py-2 font-medium text-[#7c2433] shadow-xs transition-colors hover:bg-[#faeef2] no-underline"
        >
          <GoogleCalendarIcon />
          <span>Google Cal</span>
        </a>
        <button
          type="button"
          onClick={downloadIcs}
          className="flex items-center justify-center gap-1.5 rounded-lg border border-[#c48d98] bg-white px-2.5 py-2 font-medium text-[#7c2433] shadow-xs transition-colors hover:bg-[#faeef2] cursor-pointer"
        >
          <AppleIcon />
          <span>{downloaded ? "Saved! ✓" : "Apple / iCal"}</span>
        </button>
      </div>
    </div>
  );
}

function CalendarIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4 stroke-[#8d3d4e]"
      fill="none"
      strokeWidth="2"
      aria-hidden="true"
    >
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
}

function GoogleCalendarIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4 shrink-0"
      aria-hidden="true"
    >
      {/* Base white surface with subtle border */}
      <rect x="2" y="3" width="20" height="18" rx="3.5" fill="#ffffff" stroke="#dadce0" strokeWidth="0.5" />
      {/* Top blue bar */}
      <path
        d="M2 6.5C2 4.57 3.57 3 5.5 3h13C20.43 3 22 4.57 22 6.5V8H2V6.5z"
        fill="#4285F4"
      />
      {/* Red left bar */}
      <rect x="2" y="8" width="2.2" height="10" fill="#EA4335" />
      {/* Yellow right bar */}
      <rect x="19.8" y="8" width="2.2" height="10" fill="#FBBC05" />
      {/* Green bottom bar */}
      <path
        d="M2 18v1.5C2 21.43 3.57 23 5.5 23h13c1.93 0 3.5-1.57 3.5-3.5V18H2z"
        fill="#34A853"
      />
      {/* Date 31 */}
      <text
        x="12"
        y="15.8"
        textAnchor="middle"
        fontSize="7.5"
        fontWeight="700"
        fill="#4285F4"
        fontFamily="Arial, system-ui, sans-serif"
      >
        31
      </text>
    </svg>
  );
}

function AppleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-[#333333]" aria-hidden="true">
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.85c.65-.8 1.1-1.92.98-3.05-1 .04-2.18.67-2.88 1.48-.61.7-.1.15-1.15 1.84.97 3.07 1.12.06 2.26-.6 3.05-1.5z" />
    </svg>
  );
}
