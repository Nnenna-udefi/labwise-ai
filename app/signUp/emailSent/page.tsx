"use client";

import EmailSent from "@/src/component/emailSent";
import { Suspense } from "react";

export default function EmailSentPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <EmailSent />
    </Suspense>
  );
}
