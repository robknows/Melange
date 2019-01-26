package server

import com.fasterxml.jackson.databind.JsonNode
import neo4j.Course
import neo4j.DatabaseAdaptor
import org.http4k.core.Request
import org.http4k.core.Response
import org.http4k.core.Status.Companion.OK

class ServerApi(
    private val legacyServer: LegacyServer,
    private val databaseAdaptor: DatabaseAdaptor,
    private val frontendPort: Int
) {
    fun handleCourses(@Suppress("UNUSED_PARAMETER") request: Request): Response {
        val courses: List<Course> = databaseAdaptor.allCourses()
        val coursesJsonObjects: List<JsonNode> = courses.map { course -> course.jsonify() }
        val json = encodeJsonArray(coursesJsonObjects)

        return Response(OK)
            .header("Access-Control-Allow-Origin", "http://localhost:$frontendPort")
            .header("Access-Control-Allow-Headers", "Content-Type")
            .header("Content-Type", "application/json; charset=UTF-8")
            .body(json)
    }

    fun handleCoursemetadata(request: Request): Response {
        val courseName = request.query("course") ?: throw MissingQueryParameter("course")
        val courseMetadata = databaseAdaptor.courseMetadata(courseName)
        val json = courseMetadata.jsonify().toString()

        return Response(OK)
            .header("Access-Control-Allow-Origin", "http://localhost:$frontendPort")
            .header("Access-Control-Allow-Headers", "Content-Type")
            .header("Content-Type", "application/json; charset=UTF-8")
            .body(json)
    }

    fun handleLesson(request: Request): Response {
        return legacyServer.handleLesson(request)
    }

    private fun encodeJsonArray(courses: List<JsonNode>): String {
        val stringBuilder = StringBuilder().append("[")
        for (course in courses) {
            val stringCourse = course.toString()
            stringBuilder.append(stringCourse).append(",")
        }
        val json = stringBuilder.toString().dropLast(1) + "]"
        return json
    }
}

class MissingQueryParameter(missingParameterName: String) : Throwable("Missing query parameter: $missingParameterName")
