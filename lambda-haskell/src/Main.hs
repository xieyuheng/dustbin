module Main where

import Lang

main :: IO ()
main = do
  print
    [ Var "x",
      Ap (Var "x") (Var "x"),
      Fn "x" (Var "x")
    ]

  print
    [ EmptyEnv
    ]
