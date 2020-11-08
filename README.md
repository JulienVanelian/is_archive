# is_archive

> A tiny Deno module to check whether if a file is an archive or not. 

## Usage

```ts
import { isArchive } from 'https://deno.land/x/is_archive@v0.1.0/mod.ts'

console.log(await isArchive('path/to/archive.tar'))
```

Important: you must run your program with --allow-read as this module needs to read the file.

## Global install

You can install this module globally with:
```bash
deno install --allow-read -n is-archive mod.ts
```

Then use it from your CLI: 

```bash
$ is-archive path/to/archive.tar
$ ✅ - path/to/archive.tar is an archive!
```

## How it works

This module compares the first bytes of the input file to known archive formats magic bytes.

## Supported archive formats
- ZIP
- LZIP
- TAR
- GZIP
- XZ
- LZ4
- BZIP2
- RNC
- RAR
- XAR
- OAR
- 7ZIP
- CAB
- QUANTUM
- DEB
- ZLIB
- LZFSE
- ZSTANDARD
- QUICKZIP

If you feel an archive format is missing, don't hesitate to contribute!

## License

MIT License
