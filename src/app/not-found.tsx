import Link from "next/link";

const NotFound = () => {
  return (
    <div className="fz-surface-glow fz-surface-glow--top-right card mx-auto max-w-xl shadow">
      <div className="card-body items-center text-center">
        <h2 className="text-lg font-semibold sm:text-xl md:text-2xl">
          Not Found
        </h2>
        <p className="mt-2 mb-6">
          The page you are looking for does not exist or may have moved.
        </p>
        <div className="card-actions">
          <Link href="/" className="btn btn-primary">
            Go to Timer
          </Link>
          <Link href="/settings" className="btn">
            Go to Settings
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
