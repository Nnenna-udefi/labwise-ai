import EmailSent from "@/src/component/emailSent";
import React, { Suspense } from "react";

const EmailSentPage = () => {
  return (
    <div>
      <Suspense>
        <EmailSent />
      </Suspense>
    </div>
  );
};

export default EmailSentPage;
