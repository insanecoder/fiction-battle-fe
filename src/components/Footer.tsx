export function Footer() {
  return (
    <footer className="fixed bottom-0 left-0 right-0 z-50 border-t border-slate-200 dark:border-dark-border bg-white dark:bg-dark-bg py-3 text-center text-xs text-slate-400 dark:text-dark-muted">
      <p>
        Demo avatars courtesy of{" "}
        <a href="https://randomuser.me" target="_blank" rel="noopener noreferrer" className="underline hover:text-slate-600 dark:hover:text-dark-ink">randomuser.me</a>
        {" "}· All names are fictitious · Crafted by <a href="mailto:abhinavsharma2308@gmail.com"><span className="underline">Abhinav Sharma</span></a> · {new Date().getFullYear()}
      </p>
    </footer>
  );
}
  