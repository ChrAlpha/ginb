import Link from "next/link";
import { memo } from "react";

function NotFound() {
  return (
    <div className="m-auto">
      <h1 className="text-2xl text-center">404 Page Not Found</h1>
      <p className="text-center max-w-main mx-auto mt-8">
        Maybe this link is broken.{" "}
        <Link className="text-blue-600 hover:underline" href="/">
          Back to homepage
        </Link>{" "}
        if it doesn&apos;t matter. Otherwise feel free to contact
        `hi@chralpha.com`.
      </p>
    </div>
  );
}

export default memo(NotFound);
