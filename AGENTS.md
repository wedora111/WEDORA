<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Showcase designs live in a static `src/data/designs.ts` config (never fetched from the database) — keeps the public site separate from the invitation system.
- The only backend write is an anonymous insert into `invitation_requests` (insert-only RLS, no read grants) — customer submissions must never be readable publicly.
