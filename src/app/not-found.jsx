import Link from "next/link";
import { memo } from "react";

function NotFound() {
  return (
    <div className="m-auto">
      <h1 className="text-center text-2xl">404 Page Not Found</h1>
      <p className="mx-auto mt-8 max-w-main text-center">
        Maybe this link is broken.{" "}
        <Link className="text-blue-600 hover:underline" href="/">
          Back to homepage
        </Link>{" "}
        if it doesn&apos;t matter. Otherwise feel free to contact `hi@chralpha.com`.
      </p>
    </div>
  );
}

export default memo(NotFound);
