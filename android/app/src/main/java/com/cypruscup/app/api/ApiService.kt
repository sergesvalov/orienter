package com.cypruscup.app.api

import com.cypruscup.app.data.EventEntity
import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory
import retrofit2.http.GET
import retrofit2.http.POST
import retrofit2.http.Body

// 1. Модели данных для API (Data classes)
data class RegistrationRequest(
    val eventId: String,
    val userId: String,
    val category: String
)

data class RegistrationResponse(
    val id: String,
    val status: String
)

// 2. Интерфейс Retrofit (Описание наших эндпоинтов Node.js)
interface OrienterApi {
    // GET http://192.168.0.230:3000/api/events
    @GET("events")
    suspend fun getEvents(): List<EventEntity>

    // POST http://192.168.0.230:3000/api/registrations
    @POST("registrations")
    suspend fun register(@Body request: RegistrationRequest): RegistrationResponse
}

// 3. Синглтон-клиент для легкого доступа из ViewModel
object ApiClient {
    // Указываем IP нашего развернутого бэкенда.
    // В реальном приложении это выносится в BuildConfig.BASE_URL
    private const val BASE_URL = "http://192.168.0.230:3000/api/"

    val instance: OrienterApi by lazy {
        val retrofit = Retrofit.Builder()
            .baseUrl(BASE_URL)
            .addConverterFactory(GsonConverterFactory.create())
            .build()

        retrofit.create(OrienterApi::class.java)
    }
}
