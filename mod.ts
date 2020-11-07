import { encodeToString as toHex } from 'https://deno.land/std@0.76.0/encoding/hex.ts'

const magicBytesSequences = [
    '50 4B 03 04', // ZIP
    '50 4B 05 06', // ZIP empty
    '50 4B 07 08', // ZIP spanned
    '4C 5A 49 50', // LZIP
    '1F 9D', // TAR (LZW)
    '1F A0', // TAR (LZH)
    '75 73 74 61 72 00 30 30', // TAR
    '75 73 74 61 72 20 20 00', // TAR
    '1F 8B', // GZIP
    'FD 37 7A 58 5A 00', // XZ
    '04 22 4D 18', // LZ4
    '42 5A 68', // BZIP2
    '52 4E 43 01', // RNC
    '52 4E 43 02', // RNC
    '52 61 72 21 1A 07 00', // RAR
    '52 61 72 21 1A 07 01 00', // RAR
    '78 61 72 21',// XAR
    '4F 41 52', // OAR
    '37 7A BC AF 27 1C', // 7ZIP
    '4D 53 43 46', // CAB
    '53 5A 44 44 88 F0 27 33', // QUANTUM
    '21 3C 61 72 63 68 3E', // DEB
    '78 01', // ZLIB
    '78 5E', // ZLIB
    '78 9C', // ZLIB
    '78 DA', // ZLIB
    '78 20', // ZLIB
    '78 7D', // ZLIB
    '78 BB', // ZLIB
    '78 F9', // ZLIB
    '62 76 78 32', // LZFSE
    '28 B5 2F FD', // ZSTANDARD
    '52 53 56 4B 44 41 54 41' // QUICKZIP
]

export async function isArchive(path: string) {
    const buf = new Uint8Array(8)
    let file = null

    try {
        file = await Deno.open(path)
        await Deno.read(file.rid, buf)
        Deno.close(file.rid)
    } catch (e) {
        console.log(e)
        Deno.exit(1)
    }

    const bytes = toHex(buf).toUpperCase()

    for (let i = 0; i < magicBytesSequences.length; ++i) {
        if (bytes.startsWith(magicBytesSequences[i].replaceAll(' ', ''))) {
            return true
        }
    }

    return false
}

if (import.meta.main) {
    if (!Deno.args.length) {
        Deno.exit(1)
    }

    const path = Deno.args[0]
    const archive = await isArchive(path)

    console.log(archive ? `✅ - ${path} is an archive!` : `❌ - ${path} is not an archive!`)
}
