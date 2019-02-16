package endpoints

import environment.EnvironmentLoader
import model.Course
import model.CourseMetadata
import model.Lesson
import neo4j.Neo4jDatabaseAdaptor
import neo4j.Neo4jDriver

private val environment = EnvironmentLoader(System::getenv).getEnvironment()

open class IntegrationEndpointTestCase : EndpointTestCase(
        environment,
        object : TestDatabaseAdaptor {
            val neo4jDriver = Neo4jDriver(environment.neo4jUser, environment.neo4jPassword, environment.neo4jPort)
            val neo4jDatabaseAdaptor = Neo4jDatabaseAdaptor(
                    neo4jDriver,
                    environment.imagesPath,
                    environment.extractsPath
            )

            override fun allCourses(): List<Course> {
                return neo4jDatabaseAdaptor.allCourses()
            }

            override fun courseMetadata(courseName: String): CourseMetadata {
                return neo4jDatabaseAdaptor.courseMetadata(courseName)
            }

            override fun lesson(courseName: String, lessonName: String): Lesson {
                return neo4jDatabaseAdaptor.lesson(courseName, lessonName)
            }

            override fun clearDatabase() {
                neo4jDatabaseAdaptor.clearDatabase()
            }

            override fun runQuery(query: String) {
                neo4jDriver.session().let { session ->
                    session.run(query)
                    session.close()
                }
            }
        },
        HttpTestRequester(environment)
)