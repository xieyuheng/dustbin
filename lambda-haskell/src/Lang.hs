module Lang where

data Env = EmptyEnv | ConsEnv String Env deriving (Show)

data Exp = Var String | Fn String Exp | Ap Exp Exp deriving (Show)

data Value = FnValue String Exp Env deriving (Show)
