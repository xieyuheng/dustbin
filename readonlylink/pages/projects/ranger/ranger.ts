import axios from "axios"
import { ProjectData } from "../../../datatypes/project"
import { UserData } from "../../../datatypes/user"
import { comparePath } from "../../../ut/compare-path"
import { MainFileStore } from "../../../models/file-stores"
import { Link } from "../../../models/link"
import { Directory, Entry, EntryOption, File } from "../ranger"

export class Ranger {
  user: UserData
  project: ProjectData

  allFiles: Array<File>
  allDirectories: Array<Directory>

  private firstSubEntries: Map<string, Entry>

  currentDirectory: Directory

  constructor(opts: { user: UserData; project: ProjectData }) {
    this.user = opts.user
    this.project = opts.project

    this.allFiles = sortEntries(
      this.project.allFileEntries.map((opts) => new File(opts))
    )

    this.allDirectories = sortEntries(
      // NOTE We need to include the root directory.
      createDirectories(this.allFiles, [...this.project.allDirectories, ""])
    )

    this.firstSubEntries = new Map(
      this.allDirectories.map((directory) => [
        directory.path,
        this.directSubEntries(directory)[0],
      ])
    )

    const rootDirectory = this.allDirectories.find((directory) =>
      directory.isRoot()
    )

    if (rootDirectory === undefined) {
      throw new Error("Can not find root directory")
    }

    this.currentDirectory = rootDirectory
  }

  get allEntries(): Array<Entry> {
    return [...this.allDirectories, ...this.allFiles]
  }

  subDirectories(target: Directory): Array<Directory> {
    return this.allDirectories.filter((directory) =>
      directory.isChildOf(target)
    )
  }

  directSubDirectories(target: Directory): Array<Directory> {
    return this.subDirectories(target).filter(
      (directory) => directory.depth === target.depth + 1
    )
  }

  subFiles(target: Directory): Array<File> {
    return this.allFiles.filter((file) => file.isChildOf(target))
  }

  directSubFiles(target: Directory): Array<File> {
    return this.subFiles(target).filter(
      (file) => file.depth === target.depth + 1
    )
  }

  getDirectoryOrFail(path: string): Directory {
    const directory = this.allDirectories.find(
      (directory) => directory.path === path
    )

    if (directory === undefined) {
      throw new Error(`Fail to find directory: ${path}`)
    }

    return directory
  }

  cd(directory: Directory): this {
    this.currentDirectory = directory
    return this
  }

  directSubEntries(directory: Directory): Array<Entry> {
    return [
      ...this.directSubDirectories(directory),
      ...this.directSubFiles(directory),
    ]
  }

  private focusedEntries: Record<string, Entry> = {}

  // NOTE To be fast enough as a reactive function,
  //   `focusedEntry` need preloaded `firstSubEntries`.
  focusedEntry(directory: Directory): Entry | undefined {
    return (
      this.focusedEntries[directory.path] ||
      this.firstSubEntries.get(directory.path)
    )
  }

  get currentEntry(): Entry | undefined {
    return this.focusedEntry(this.currentDirectory)
  }

  focus(directory: Directory, entry: Entry): void {
    this.focusedEntries[directory.path] = entry
  }

  private getCurrentEntryIndexOrFail(entries: Array<Entry>): number {
    const index = entries.findIndex(
      (entry) => this.currentEntry && entry.is(this.currentEntry)
    )

    if (index === -1) {
      throw new Error("Can not find currentEntry index")
    }

    return index
  }

  down(): void {
    if (!this.currentEntry) return

    const entries = this.directSubEntries(this.currentDirectory)
    const index = this.getCurrentEntryIndexOrFail(entries)

    const nextEntry = entries[index + 1]
    if (nextEntry) {
      this.focus(this.currentDirectory, nextEntry)
    }
  }

  up(): void {
    if (!this.currentEntry) return

    const entries = this.directSubEntries(this.currentDirectory)
    const index = this.getCurrentEntryIndexOrFail(entries)

    const prevEntry = entries[index - 1]
    if (prevEntry) {
      this.focus(this.currentDirectory, prevEntry)
    }
  }

  left(): void {
    if (this.parentDirectory) {
      this.currentDirectory = this.parentDirectory
    }
  }

  right(): void {
    if (!this.currentEntry) return

    if (this.currentEntry.isDirectory()) {
      this.currentDirectory = this.currentEntry
    }
  }

  editing = false

  updateURL(url: URL): void {
    const nav = Object.entries(this.focusedEntries)
      .map(([path, entry]) => ["nav." + path, entry.path])
      .sort(([left], [right]) => (left > right ? 1 : -1))

    for (const [key, value] of nav) {
      url.searchParams.set(key, value)
    }

    if (this.editing) {
      url.searchParams.set("editing", "true")
    } else {
      url.searchParams.delete("editing")
    }

    url.searchParams.set("cwd", this.currentDirectory.path)
  }

  updateByURLSearchParams(searchParams: URLSearchParams): void {
    this.focusedEntries = this.parseFocusedEntries(searchParams)

    this.editing = Boolean(searchParams.get("editing"))

    const cwd = searchParams.get("cwd")
    const found = this.allDirectories.find(
      (directory) => directory.path === cwd
    )
    if (found) {
      this.currentDirectory = found
    }
  }

  private parseFocusedEntries(
    searchParams: URLSearchParams
  ): Record<string, Entry> {
    const results: Record<string, Entry> = {}
    for (const [key, value] of searchParams.entries()) {
      if (key.startsWith("nav.")) {
        const entry = this.allEntries.find((entry) => entry.path === value)
        if (entry) {
          results[key.slice("nav.".length)] = entry
        }
      }
    }

    return results
  }

  get currentDirectories(): Array<Directory> {
    return this.directSubDirectories(this.currentDirectory)
  }

  get currentFiles(): Array<File> {
    return this.directSubFiles(this.currentDirectory)
  }

  parentDirectoryOf(target: Directory): Directory | undefined {
    return this.allDirectories.find(
      (directory) =>
        target.isChildOf(directory) && target.depth === directory.depth + 1
    )
  }

  get parentDirectory(): Directory | undefined {
    return this.parentDirectoryOf(this.currentDirectory)
  }

  get previousDirectories(): Array<Directory> {
    return this.parentDirectory
      ? this.directSubDirectories(this.parentDirectory)
      : []
  }

  get previousFiles(): Array<File> {
    return this.parentDirectory ? this.directSubFiles(this.parentDirectory) : []
  }

  private loadedTexts: Record<string, string> = {}

  get currentText(): string | undefined {
    return this.currentEntry
      ? this.loadedTexts[this.currentEntry.path]
      : undefined
  }

  async fetchFileIfNeeded(path: string): Promise<string> {
    if (this.loadedTexts[path] !== undefined) {
      return this.loadedTexts[path]
    }

    const link = new Link({
      username: this.user.username,
      project: this.project.name,
    })

    const files = new MainFileStore(link)
    const text = await files.getOrFail(path)

    this.loadedTexts[path] = text

    return text
  }

  async saveFile(
    path: string,
    text: string,
    opts: {
      onStart: () => void
      onFinish: () => void
      onError: (error: unknown) => void
    }
  ): Promise<void> {
    const url = `/files/${this.user.username}/${this.project.name}/-/${path}`

    opts.onStart()

    try {
      await axios.put(url, text, {
        headers: {
          "Content-Type": "text/plain",
        },
      })

      this.loadedTexts[path] = text
    } catch (error) {
      opts.onError(error)
    }

    opts.onFinish()
  }

  async createFile(
    path: string,
    opts: {
      onStart: () => void
      onFinish: () => void
      onError: (error: unknown) => void
    }
  ): Promise<void> {
    const found = this.allFiles.find((file) => file.path === path)
    if (found) {
      return opts.onError(new Error(`File already exists: ${path}`))
    }

    const url = `/files/${this.user.username}/${this.project.name}/-/${path}`

    opts.onStart()

    const text = ""

    try {
      await axios.put(url, text, {
        headers: {
          "Content-Type": "text/plain",
        },
      })

      this.loadedTexts[path] = text

      this.allFiles.push(
        new File({
          path,
          size: 0,
          lastModified: Math.floor(Date.now() / 1000),
        })
      )

      sortEntries(this.allFiles)
    } catch (error) {
      opts.onError(error)
    }

    opts.onFinish()
  }

  async deleteFile(
    path: string,
    opts: {
      onStart: () => void
      onFinish: () => void
      onError: (error: unknown) => void
    }
  ): Promise<void> {
    const found = this.allFiles.find((file) => file.path === path)
    if (found === undefined) {
      return opts.onError(new Error(`File does not exist: ${path}`))
    }

    const url = `/files/${this.user.username}/${this.project.name}/-/${path}`

    opts.onStart()

    try {
      await axios.delete(url, {
        headers: {
          "Content-Type": "text/plain",
        },
      })

      delete this.loadedTexts[path]

      for (const [key, entry] of Object.entries(this.focusedEntries)) {
        if (entry.path === path) {
          delete this.focusedEntries[key]
        }
      }

      const index = this.allFiles.findIndex((file) => file.path === path)
      if (index > -1) {
        this.allFiles.splice(index, 1)
        sortEntries(this.allFiles)
      }
    } catch (error) {
      opts.onError(error)
    }

    opts.onFinish()
  }

  async createDirectory(
    path: string,
    opts: {
      onStart: () => void
      onFinish: () => void
      onError: (error: unknown) => void
    }
  ): Promise<void> {
    const found = this.allDirectories.find(
      (directory) => directory.path === path
    )
    if (found) {
      return opts.onError(new Error(`Directory already exists: ${path}`))
    }

    const url = `/directories/${this.user.username}/${this.project.name}/-/${path}`

    opts.onStart()

    try {
      await axios.patch(url)

      this.allDirectories.push(
        new Directory({
          path,
          size: 0,
          lastModified: Math.floor(Date.now() / 1000),
          length: 0,
        })
      )

      sortEntries(this.allDirectories)
    } catch (error) {
      opts.onError(error)
    }

    opts.onFinish()
  }

  async deleteDirectory(
    path: string,
    opts: {
      onStart: () => void
      onFinish: () => void
      onError: (error: unknown) => void
    }
  ): Promise<void> {
    const found = this.allDirectories.find(
      (directory) => directory.path === path
    )
    if (found === undefined) {
      return opts.onError(new Error(`Directory does not exist: ${path}`))
    }

    const url = `/directories/${this.user.username}/${this.project.name}/-/${path}`

    opts.onStart()

    try {
      await axios.delete(url, {
        headers: {
          "Content-Type": "text/plain",
        },
      })

      const index = this.allDirectories.findIndex(
        (directory) => directory.path === path
      )
      if (index > -1) {
        this.allDirectories.splice(index, 1)
        sortEntries(this.allDirectories)
      }
    } catch (error) {
      opts.onError(error)
    }

    opts.onFinish()
  }
}

function createDirectories(
  files: Array<File>,
  directoryPaths: Array<string>
): Array<Directory> {
  return directoryPaths.map((path) => {
    // NOTE Be careful about the ending "/".
    const subFiles = files.filter((file) => file.path.startsWith(path + "/"))

    const size = subFiles.map(({ size }) => size).reduce((sum, x) => sum + x, 0)
    const lastModified = Math.max(
      ...subFiles.map(({ lastModified }) => lastModified)
    )

    const length = subFiles.length

    return new Directory({ path, size, lastModified, length })
  })
}

function sortEntries<T extends Entry>(entries: Array<T>): Array<T> {
  return entries.sort((left, right) => comparePath(left.path, right.path))
}
