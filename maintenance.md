# Maintenance playbook
1. [Check out a pull request](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/reviewing-changes-in-pull-requests/checking-out-pull-requests-locally): `git fetch origin pull/[id]/head:NEW_BRANCH_NAME` then `git checkout NEW_BRANCH_NAME`
2. Host locally, check everything works: (Assuming you have python) `python -m http.server`
3. Merge the PR!