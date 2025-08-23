export function Footer() {
  return (
    <footer className="border-t">
      <div className="container flex h-16 items-center justify-center">
        <p className="text-center text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} Lalit Kumar Sengar. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
