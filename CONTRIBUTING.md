# Contributing to Prefab

Prefab is an actively maintained, opinionated framework. We welcome contributions, but the most impactful way to contribute might not be what you expect.

## The best contribution is a great issue

Prefab's maintainers use AI-assisted tooling that is deeply tuned to the framework's design philosophy, API patterns, and codebase conventions. A well-written issue with a clear problem description is often more valuable than a pull request, because it lets maintainers produce a solution that is consistent with how the framework wants to evolve.

**A great issue looks like this:**

1. A short description of the problem or gap
2. A minimal reproducible example (for bugs) or a concrete use case (for enhancements)
3. Expected vs. actual behavior

That's it. No need to diagnose root causes, propose API designs, or suggest implementations.

## Using AI to contribute

We encourage using LLMs to help identify bugs, write MREs, and prepare contributions. But your LLM must take into account the conventions and contributing guidelines of this repo. Generic LLM output that ignores these guidelines tells us the contribution wasn't made thoughtfully, and we will close it.

## When to open a pull request

An open issue is not an invitation to submit a PR. Issues track problems; whether and how to solve them is a separate decision. If you want to work on something, propose your approach in the issue first.

**Bug fixes** — PRs are welcome for simple, well-scoped bug fixes where the problem and solution are both straightforward.

**Documentation** — Typo fixes, clarifications, and improvements to examples are always welcome.

**Enhancements and features** — Need a design proposal in the issue before code is written. The proposal doesn't need to be long, just enough to show you've thought about how the change fits into the framework.

## PR guidelines

- **Reference an issue.** If there isn't one, open one first.
- **Keep it focused.** One logical change per PR.
- **Match existing patterns.** Run `prek` before submitting.
- **Write tests.** Bug fixes should include a test that fails without the fix.
- **Fix the cause, not the symptom.**

## The `app.html` merge driver

The bundled renderer (`src/prefab_ui/renderer/app.html`) is a minified, chunked Vite build. Its line contents aren't stable between builds, so trying to merge two branches' versions of it produces nonsense conflicts. We mark it in `.gitattributes` with `merge=ours` so git resolves conflicts by keeping the upstream side, and the `check_generated` CI workflow regenerates it from source afterwards if the final tree actually warrants a different bundle.

The `ours` driver needs one piece of local git config (`merge.ours.driver = true`). That gets installed automatically by a prek hook on your first commit, so there is nothing to run by hand.

## What we'll close without review

- PRs that don't reference an issue or address a clearly self-evident bug
- Sweeping changes without prior discussion
- PRs that are difficult to review due to size, scope, or generated content
