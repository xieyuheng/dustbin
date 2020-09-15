  def mergeListFuture[A]
    (f1: Future[List[A]], f2: Future[List[A]])
    (implicit ec: ExecutionContextExecutor)
      : Future[List[A]] = {
    for { l1 <- f1; l2 <- f2 } yield l1 ++ l2
  }

  def parallelCombine[A]
    (futureList: List[Future[A]])
    (implicit ec: ExecutionContextExecutor)
      : Future[List[A]] = {
    futureList.map(future => future.map(x => List(x)))
      .foldLeft(Future(List[A]()))(mergeListFuture)
  }
