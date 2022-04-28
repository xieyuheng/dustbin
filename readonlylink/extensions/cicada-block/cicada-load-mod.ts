import { Mod, ModLoader } from "@cicada-lang/cicada/lib/lang/mod"
import { LinkFactory } from "../../models/link"
import { FileStoreFactory } from "../../models/file-store"

const loader = new ModLoader()

let cachedMod: Mod | undefined = undefined

export async function cicadaLoadMod(): Promise<Mod> {
  if (cachedMod !== undefined) return cachedMod

  const factory = new LinkFactory()
  const { link, src } = await factory.createFromPathname(
    new URL(window.location.href).pathname
  )

  let files = new FileStoreFactory().createFromLink(link.root())
  if (src) files = files.cd(src)

  loader.fetcher.register("file-store", (url) =>
    files.getOrFail(url.pathname.slice(1))
  )

  const mod = await loader.load(new URL(`file-store:/${link.path}`))
  cachedMod = mod
  return mod
}
