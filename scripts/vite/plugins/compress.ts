import viteCompression from 'vite-plugin-compression'

export function configCompressPlugin(
  algorithm: 'gzip' | 'brotliCompress' | 'deflate' | 'deflateRaw',
  deleteOriginFile = false
) {
  if (algorithm === 'gzip') {
    return viteCompression({
      deleteOriginFile,
    })
  }
  if (algorithm === 'brotliCompress') {
    return viteCompression({
      ext: '.br',
      algorithm,
      deleteOriginFile,
    })
  }
}
