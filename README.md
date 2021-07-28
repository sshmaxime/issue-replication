# Issue replication

Error: `Error in plugin solidity-coverage: TypeError: typechain_1.glob is not a function`

## How to reproduce the error

-   `yarn clean`
-   `yarn build`
-   `yarn coverage`

## How to avoid the error (but why does that work ???)

-   `yarn clean`
-   `yarn coverage`
-   `yarn coverage`

# Fix

The problem seems to be **tsconfig-paths/register**.

To fix:

-   By removing `tsconfig-paths/register` from `hardhat.config.ts`.
-   By removing any path mappings set before and go back to ugly path `../../../typechain`

## What's next ?

There is a problem with `tsconfig-paths/register` it doesn't work optimaly with `solidity-coverage` and potentially other plugins.
