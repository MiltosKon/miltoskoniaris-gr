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

## Project rules
- Site content lives as typed data in `src/content/*.ts`; the /admin hub only exports JSON/Markdown (no database) — keeps the site static and simple.
- /admin is gated by a shared password checked in a server function with an encrypted session cookie (ADMIN_PASSWORD, SESSION_SECRET) — never compare on the client.
