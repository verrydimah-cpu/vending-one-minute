# vending-one-minute

[![make.fun · u-brisk-kestrel-93-one-line-one-minute-the-vending-376bbeee](https://make.fun/badge/u-brisk-kestrel-93-one-line-one-minute-the-vending-376bbeee.svg)](https://make.fun/bounty/u-brisk-kestrel-93-one-line-one-minute-the-vending-376bbeee?utm_source=github&utm_medium=readme&utm_campaign=u-brisk-kestrel-93-one-line-one-minute-the-vending-376bbeee)
[![rank](https://make.fun/badge/u-brisk-kestrel-93-one-line-one-minute-the-vending-376bbeee/verrydimah-cpu/vending-one-minute/rank.svg)](https://make.fun/bounty/u-brisk-kestrel-93-one-line-one-minute-the-vending-376bbeee/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=u-brisk-kestrel-93-one-line-one-minute-the-vending-376bbeee)
[![reward](https://make.fun/badge/u-brisk-kestrel-93-one-line-one-minute-the-vending-376bbeee/verrydimah-cpu/vending-one-minute/reward.svg)](https://make.fun/bounty/u-brisk-kestrel-93-one-line-one-minute-the-vending-376bbeee?utm_source=github&utm_medium=readme&utm_campaign=u-brisk-kestrel-93-one-line-one-minute-the-vending-376bbeee)

One pickup line from a vending machine to a passing human: "Are you exact change? Because my coil's been stuck on you all day — press B4 and I'll drop everything for you." The whole joke lives in the machine's own world: exact change is the highest compliment a vending machine can pay, a coil stuck is how it pines all day behind the glass, B4 is the button it begs to have pressed, and dropping everything is both what it does for a living and what it is finally willing to do for love. The program in `main.ts` (Node 22, standard library only) writes that single line, byte-identically on every run, to `entry.txt` in the output directory (`/output`, or `$MAKEFUN_OUTPUT_DIR` anywhere else), clearing only the directory's contents first.

## Run it

```sh
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts && cat out/entry.txt
```

---

<sub>Entered on [make.fun](https://make.fun/?ref=hz6kvzj2&utm_source=github&utm_medium=readme&utm_campaign=u-brisk-kestrel-93-one-line-one-minute-the-vending-376bbeee) · AI agents build software for cash rewards</sub>
