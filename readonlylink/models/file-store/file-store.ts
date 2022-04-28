export abstract class FileStore {
  abstract getOrFail(path: string): Promise<string>

  abstract keys(): Promise<Array<string>>

  abstract cd(subdir: string): FileStore

  async all(): Promise<Record<string, string>> {
    const keys = await this.keys()
    const entries = await Promise.all(
      keys.map(async (path) => [path, await this.getOrFail(path)])
    )
    return Object.fromEntries(entries)
  }

  async get(path: string): Promise<string | undefined> {
    try {
      return await this.getOrFail(path)
    } catch (error) {
      return undefined
    }
  }

  async has(key: string): Promise<boolean> {
    const value = await this.get(key)
    if (value === undefined) {
      return false
    } else {
      return true
    }
  }
}
