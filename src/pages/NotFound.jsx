import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Button from "../components/ui/Button";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <>
      <Helmet>
        <title>Page Not Found — Momentum Auto Spares</title>
      </Helmet>
      <div className="min-h-[70vh] flex flex-col items-center justify-center bg-[#0a0a0a] text-center px-4">
        <p className="text-8xl font-extrabold text-red-600 leading-none">404</p>
        <h1 className="text-2xl font-bold text-white mt-4 mb-2">Page Not Found</h1>
        <p className="text-gray-400 text-sm max-w-sm mb-8">
          Looks like this page shifted gears and drove off. Let's get you back on track.
        </p>
        <Button
          size="lg"
          icon={<ArrowLeft size={16} />}
          onClick={() => (window.location.href = "/")}
        >
          Back to Home
        </Button>
      </div>
    </>
  );
}
