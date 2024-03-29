import { makeAutoObservable } from "mobx"
import { removeFirst } from "../../utils/remove-first"
import { next } from "../../lib/next"
import { emptySoundLoop } from "../../lib/howler"
import { Mode, ModeKind } from "./models/Mode"
import { Task } from "./models/Task"
import { Settings, defaultSettings, testingSettings } from "./models/Settings"
import { Timer, TimerJson } from "./models/Timer"
import { lang } from "../../stores/lang"
import { theme } from "../../stores/theme"

export type PomodoroStateJson = {
  version?: number
  mode: Mode
  timer: TimerJson
  playing: boolean
  editing: boolean
  currentTask: Task | null
  tasks: Array<Task>
  inputTaskTitle: string | null
  settings: Settings
}

export class PomodoroState {
  mode: Mode
  timer: Timer
  playing = false
  editing = false
  currentTask: Task | null = null
  tasks: Array<Task> = []
  inputTaskTitle: string | null = null
  settings: Settings = next.dev ? testingSettings : defaultSettings

  lang = lang
  theme = theme

  classes = {
    transition: "transition delay-0 duration-500 ease-out",
  }

  constructor() {
    this.mode = this.settings.modes.Focus
    this.timer = new Timer(this.mode.interval)

    makeAutoObservable(this)
  }

  private refreshIds(): void {
    const ids: Set<number> = new Set()

    const tasks = this.currentTask
      ? [this.currentTask, ...this.tasks]
      : this.tasks

    for (const task of tasks) {
      if (ids.has(task.id)) {
        const newId = Math.max(...Array.from(ids)) + 1
        task.id = newId
      }

      ids.add(task.id)
    }
  }

  json(): PomodoroStateJson {
    return {
      version: 1,
      mode: this.mode,
      timer: this.timer.json(),
      playing: this.playing,
      editing: this.editing,
      currentTask: this.currentTask,
      tasks: this.tasks,
      inputTaskTitle: this.inputTaskTitle,
      settings: this.settings,
    }
  }

  static create(json: PomodoroStateJson): PomodoroState {
    const state = new PomodoroState()
    state.mode = json.mode
    state.timer = Timer.create(json.timer)
    state.playing = json.playing
    state.editing = json.editing
    state.currentTask = json.currentTask
    state.tasks = json.tasks
    state.inputTaskTitle = json.inputTaskTitle
    state.settings = json.settings
    state.refreshIds()
    return state
  }

  private createTaskFromTitle(title: string = ""): Task {
    const tasks = this.currentTask
      ? [this.currentTask, ...this.tasks]
      : this.tasks

    const ids = tasks.map((task) => task.id)
    const newId = ids.length === 0 ? 0 : Math.max(...ids) + 1
    return { id: newId, title, count: 0 }
  }

  createTask() {
    if (!this.inputTaskTitle) return

    const newTask = this.createTaskFromTitle(this.inputTaskTitle)

    if (this.currentTask === null) {
      this.currentTask = newTask
      this.inputTaskTitle = null
    } else {
      this.tasks.push(newTask)
      this.inputTaskTitle = null
    }
  }

  deleteTask(id: number) {
    if (this.currentTask?.id === id) {
      this.currentTask = null
      if (this.tasks[0]) {
        this.selectTask(this.tasks[0].id)
      }
    } else {
      removeFirst(this.tasks, (task) => task.id === id)
    }
  }

  get time(): number {
    return this.timer.time
  }

  async setupNotification(): Promise<void> {
    switch (Notification.permission) {
      case "default": {
        await Notification.requestPermission()
        return
      }
      case "granted": {
        return
      }
      case "denied": {
        return
      }
    }
  }

  get appName(): string {
    return this.lang.zh ? "番茄钟" : "Pomodoro"
  }

  async notify(): Promise<void> {
    if (Notification.permission === "granted") {
      const registration = await navigator.serviceWorker.ready
      const kind = this.translateKind(this.mode.kind)
      registration.showNotification(this.appName, {
        body: this.lang.zh ? `${kind} 结束。` : `${kind} finished.`,
      })
    }
  }

  get kind(): ModeKind {
    return this.mode.kind
  }

  translateKind(kind: ModeKind): string {
    switch (kind) {
      case "Focus":
        return this.lang.zh ? "专注" : "Focus"
      case "Break":
        return this.lang.zh ? "短休" : "Break"
      case "Recess":
        return this.lang.zh ? "长息" : "Recess"
    }
  }

  changeMode(kind: ModeKind): void {
    this.mode = this.settings.modes[kind]
    this.theme.name = this.themeName
    this.timer.reset(this.mode.interval)
  }

  get themeName(): string {
    switch (this.kind) {
      case "Focus":
        return "red"
      case "Break":
        return "sky"
      case "Recess":
        return "violet"
    }
  }

  start(): void {
    if (!this.playing) {
      emptySoundLoop().play()
    }

    this.timer.start({
      onFinished: () => {
        this.notify()
        if (this.currentTask && this.mode.kind === "Focus") {
          this.currentTask.count++
        }
      },
    })
  }

  selectTask(id: number): void {
    const task = this.tasks.find((task) => task.id === id)
    if (task === undefined) return

    removeFirst(this.tasks, (task) => task.id === id)

    if (this.currentTask) {
      this.tasks.unshift(this.currentTask)
    }

    this.currentTask = task
  }

  formatTitle(): string {
    const parts = []

    if (this.timer.isStarted) {
      parts.push(`${this.timer.formatTime()}`)
    }

    if (this.currentTask) {
      parts.push(`${this.currentTask.title}`)
    } else {
      parts.push(`${this.appName}`)
    }

    return parts.join(" | ")
  }
}
