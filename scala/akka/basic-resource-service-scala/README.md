# Basic Resource

## Contains

- [resource/hotel/int/thirdparty/dida](src/main/scala/com/tehang/resource/hotel/int/thirdparty/dida)

## Run

- Install dependencies:
``` sh
./dev deps
```

- Build executables, run `sbt stage`, to get:
``` sh
target/universal/stage/bin/
├── dida-sync
         |usage:
         |  --databaseConfigName
├── int-hotel-service
         |usage:
         |  --databaseConfigName
         |  --swaggerBasePath
```

## Contributing

- Notes about issue:
  - 开 issue 请礼貌, 把问题和需求描述清楚 不要浪费维护者的精力和时间
    - 关于 issue 和 pull request 可以参考: https://rfc.zeromq.org/spec:42/C4/
  - 一个 issue 一个话题, 不要在一个 issue 里讨论多个话题
  - 想开新的 issue, 先有没有已有的相关 issue
  - open issue 的人应该 close issue, 如果讨论已经结束 但是长时间不 close, 维护者可以 close

- [Style Guide](https://github.com/cntehang/public-dev-docs/blob/master/backend/code/scala/style-guide.md) -- observe the style of existing code and respect it

## Maintainers

- [xieyuheng](https://github.com/cntehang/work-diary-xieyuheng)
