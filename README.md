# Doping: Stupid Server Status Static Site

**Doping** is a very bare-bones, lightweight status page - Think of it as an 
alternative to things like `instatus` and `statping-ng`. It won't make 
your site faster, but it'll make it a whole lot easier to know when it fails.

### Configuring

Everything you're looking for is in `config.ts`. Further explainations can be
found in there.

### Usage

Start the project:

```
deno task start
```

This will watch the project directory and restart as necessary.

Logs/information of the servers' current statuses are kept in `dump.json` -
So don't delete it!

In case you want to restart your `dump`:

```sh
echo '[]' > dump.json
```

### Hacking

`main.ts` is the whole enchilada in terms of site functionality - As it contains
the main fetching/status functionality that writes to `dump.json`, IE the 'Ping'
in 'Doping'.

`routes/index.tsx` is where the _entire_ frontend resides - Don't mess with it
unless you are either:

- A) Confident enough to mess with the at-times unpredictable nightmare that is TSX and
  `twind`, or
- B) Stupid enough to think you fit in category A.

### License

0BSD. Read `LICENSE` for more information
