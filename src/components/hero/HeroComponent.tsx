import ComposeButton from "../../common/components/ComposeButton";
import { useAuthStore } from "../../store/AuthStore";

export function HeroComponent() {
  const user = useAuthStore((s) => s.user);
    return <section className="grid grid-cols-[3fr_2fr] p-10">
        {/* Description of Product  */}
        <div className="p-4">
            <h1 className="text-5xl">
                Battle of Fiction — <span className="text-tertiary-base dark:text-amber-400">Write. Tag. Debate.</span>
            </h1>
            <p className="py-5">
                An AI-tagged discussion board comparing worlds like Harry Potter & Game of Thrones
            </p>
            <div className="p-2">
                <ComposeButton extraClasses={`mr-5 ${user?"py-2":""}`} />
                <button className="btn btn-inline">⚔️ View Battle Analytics</button>
            </div>
        </div>

       <div className="rounded-3xl border border-[var(--color-surface-border-subtle)] bg-[var(--color-surface-base)] p-6 shadow-md dark:border-[var(--color-dark-border-subtle)] dark:bg-[var(--color-dark-surface)]">
  <p className="mb-2 text-xs font-medium uppercase tracking-[0.18em] text-[var(--color-grey-base)] dark:text-[var(--color-dark-muted)]">
    Fandom Comparison
  </p>

  <h3 className="mb-2 text-xl font-semibold text-[var(--color-grey-shade)] dark:text-[var(--color-dark-ink)]">
    Compare the Worlds
  </h3>

  <p className="mb-5 text-sm leading-6 text-[var(--color-grey-base)] dark:text-[var(--color-dark-muted)]">
    Filter discussions and uncover trends across Harry Potter and Game of Thrones.
  </p>

  <div className="mb-5 grid grid-cols-2 gap-3">
    <div className="rounded-xl bg-[var(--color-tertiary-tint)] px-4 py-3 text-center font-medium text-[var(--color-tertiary-shade)] dark:bg-[rgba(247,103,7,0.14)] dark:text-[#fdba74]">
      GOT
    </div>
    <div className="rounded-xl bg-[var(--color-primary-tint)] px-4 py-3 text-center font-medium text-[var(--color-primary-shade)] dark:bg-[rgba(51,154,240,0.16)] dark:text-[#93c5fd]">
      HP
    </div>
  </div>

  <div className="space-y-3 text-sm text-[var(--color-grey-base)] dark:text-[var(--color-dark-muted)]">
    <div className="flex items-center gap-3">
      <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[var(--color-grey-tint)] dark:bg-[var(--color-dark-inline-btn)]">
        🏷
      </span>
      <span>Filter posts by universe and tags</span>
    </div>

    <div className="flex items-center gap-3">
      <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[var(--color-grey-tint)] dark:bg-[var(--color-dark-inline-btn)]">
        📊
      </span>
      <span>Compare characters, places, and events</span>
    </div>

    <div className="flex items-center gap-3">
      <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[var(--color-grey-tint)] dark:bg-[var(--color-dark-inline-btn)]">
        ✨
      </span>
      <span>Explore fandom trends through analytics</span>
    </div>
  </div>
</div>
    </section>
}
