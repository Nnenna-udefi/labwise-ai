import EmailSent from "@/src/component/emailSent";
import { Suspense } from "react";

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
