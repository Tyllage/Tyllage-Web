# Contributing to Tyllage-Web

> **Tyllage-Web does not accept outside contributions.**
> This repository is proprietary and is maintained only by the Tyllage team. Pull requests, patches,
> issues and feature work from anyone outside the team will be closed without review. Forking or
> copying this repository does not give you any right to use, run, modify, deploy or redistribute its
> code or content. See [LICENSE](LICENSE).

If you are not a member of the Tyllage team:

- **Found a security problem?** Report it privately as described in [SECURITY.md](SECURITY.md). Do not
  open a public issue.
- **Interested in licensing, a partnership or permission to use Tyllage material?** Email
  [tyllage.co@gmail.com](mailto:tyllage.co@gmail.com) or contact the team through the
  [Tyllage GitHub organisation](https://github.com/Tyllage).

The rest of this guide is for **Tyllage team members** only.

## For Tyllage team members

- All work you do on this repository belongs to Tyllage LLP and is covered by the
  [Tyllage Proprietary License](LICENSE).
- Do not copy Tyllage code, content or brand assets into personal projects, other repositories or
  public places (gists, forums, AI chat tools that keep your data) without approval.

1. Branch from `main` and open a pull request; don't push directly to `main`.
2. Run `npm run lint` and `npm run build` before pushing. CI runs the same checks.
3. Never commit secrets, `.env` files, AWS credentials or customer data.
4. Keep GitHub Actions pinned to full commit SHAs, as described in the README.
