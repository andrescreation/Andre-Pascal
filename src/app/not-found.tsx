import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="container-editorial flex min-h-[75vh] flex-col items-start justify-center pt-28 pb-20">
      <h1 className="display-xl">404</h1>
      <p className="mt-6 max-w-[48ch] text-base leading-relaxed text-[var(--ink-muted)] md:text-lg">
        This page doesn&apos;t exist, or it moved. Let&apos;s get you back.
      </p>
      <div className="mt-8">
        <Button href="/" variant="primary">
          Back to home
        </Button>
      </div>
    </div>
  );
}
