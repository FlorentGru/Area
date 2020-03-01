package com.example.area.api

import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory

class apiClient() {
    companion object Client {
        fun setRetrofit(base_url: String):Retrofit {
            val retrofit: Retrofit = Retrofit.Builder()
                .baseUrl(base_url)
                .addConverterFactory(GsonConverterFactory.create())
                .build()
            return retrofit
        }
    }
}