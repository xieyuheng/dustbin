organization := "com.tehang"
maintainer := "xieyuheng"
name := "basic-resource"
version := "0.0.1"
scalaVersion := "2.12.9"

lazy val akkaVersion = "2.5.23"
lazy val akkaHttpVersion = "10.1.9"
lazy val slickVersion = "3.3.1"

scalacOptions ++= Seq(
  "-opt:l:method",
  "-opt:l:inline",
  "-opt-inline-from:**",
  "-deprecation",
  "-encoding", "UTF-8",
  "-unchecked",
  "-feature",
  "-language:implicitConversions",
  "-Ywarn-dead-code",
)

libraryDependencies ++= Seq(
  "com.typesafe.akka" %% "akka-actor" % akkaVersion,
  "com.typesafe.akka" %% "akka-testkit" % akkaVersion,
  "com.typesafe.akka" %% "akka-stream" % akkaVersion,
  "com.typesafe.akka" %% "akka-slf4j" % akkaVersion,
  "com.typesafe.akka" %% "akka-http" % akkaHttpVersion,
  "com.typesafe.akka" %% "akka-http-spray-json" % akkaHttpVersion,
  "com.typesafe.slick" %% "slick" % slickVersion,
  "com.typesafe.slick" %% "slick-hikaricp" % slickVersion,
  "com.typesafe" % "config" % "1.3.4",
  "com.github.swagger-akka-http" %% "swagger-akka-http" % "1.1.0",
  "javax.xml.bind" % "jaxb-api" % "2.3.0", // https://github.com/swagger-akka-http/swagger-akka-http/issues/62
  "mysql" % "mysql-connector-java" % "8.0.11",
  "org.postgresql" % "postgresql" % "9.3-1100-jdbc41",
  "ch.qos.logback" % "logback-classic" % "1.2.3",
  "io.spray" %% "spray-json" % "1.3.5",
  "com.github.tototoshi" %% "scala-csv" % "1.3.6-SNAPSHOT",
  "com.lihaoyi" %% "os-lib" % "0.3.0",
  "org.scalatest" %% "scalatest" % "3.0.5" % "test"
)

enablePlugins(JavaAppPackaging)
