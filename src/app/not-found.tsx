import Link from "next/link";
import { memo } from "react";

function NotFound() {
  return (
    <div className="blankslate">
      <h3 className="blankslate-heading">404 Page Not Found</h3>
      <p>
        Maybe this link is broken.
        {" "}
        <Link href="/" className="Link--primary">
          Back to homepage
        </Link>
        {" "}
        if it doesn&apos;t matter. Otherwise feel free to contact owner.
      </p>
    </div>
  );
}

export default memo(NotFound);
