package com.example.area.api

import com.example.area.data.ApiResponse
import com.example.area.data.Service
import retrofit2.Call
import retrofit2.http.GET
import retrofit2.http.Header
import retrofit2.http.Path
import retrofit2.http.Query

interface Request {
    @GET("/oauth2/{service}")
    fun getWebView (
        @Path("service") section :String ="",
        @Header("Authorization") token :String="",
        @Query("callback") call : String="https://www.exemple.com")
        : Call<ApiResponse<ArrayList<Service>>>
}